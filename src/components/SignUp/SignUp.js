import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '../common/TextField';
import ShadowStyles from '../../helpers/ShadowStyles';
import TextStyles from '../../helpers/TextStyles';


import styles from './styles';
import logo from './../../assets/logo.png';
import iconback from './../../assets/icon_back.png';

import { signUp,actionTypes } from '../../actions/UserActions';
import getUser from '../../selectors/UserSelectors';
import errorsSelector from '../../selectors/ErrorSelectors';
import { isLoadingSelector } from '../../selectors/StatusSelectors';
import ErrorView from '../common/ErrorView';


class SignUp extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            userNameValidate:true,
            userNameValidateText:'Email is required.',
            nameValidate:true,
            nameValidateText:'Name is required.',
            passwordValidate:true,
            passwordValidateText:'Password is required.',
            hasError:false,
            data:{
                Username:'',
                Name :'',
                LastName:'Sardar',
                Password:'',
                RepeatPassword:'',
            }
        };
        this.navigateToHomeIfLogged();
    }


    validate(text,type)
    {
        var emailVal = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let values = {...this.state.data};
        if(type=='Name')
        {
            if(text=='')
            {
                values['Name'] = text;
                this.setState({ data: values });
                this.setState({ 
                    nameValidate:false
                });
                
            }
            else
            {
                values['Name'] = text;
                this.setState({ data: values });
                this.setState({ 
                    nameValidate:true
                });
            }
        }
        if(type=='Username')
        {
            if(text=='')
            {
                values['Username'] = text;
                this.setState({ data: values });
                this.setState({ 
                    userNameValidate:false
                });
                
            }
            else
            {    
                if(emailVal.test(text))
                {
                    values['Username'] = text;
                    this.setState({ data: values });
                    this.setState({ 
                        userNameValidate:true
                    });
                    
                }
                else{
                    
                    values['Username'] = text;
                    this.setState({ data: values });
                    this.setState({ 
                        userNameValidate:false,
                        userNameValidateText:'Please enter valid email.'
                    });
                }
                
            }
        }
        if(type=='Password')
        {
            if(text=='')
            {
                values['Password'] = text;
                values['RepeatPassword'] = text;
                this.setState({ data: values });
                this.setState({ 
                    passwordValidate:false
                });
                
            }
            else
            {
                values['Password'] = text;
                values['RepeatPassword'] = text;
                this.setState({ data: values });
                this.setState({ 
                    passwordValidate:true
                });
            }
        }
    }

    componentDidUpdate() {
       
        this.navigateToHomeIfLogged();
        return null;
    }

    navigateToHomeIfLogged = () => {
        
        if (this.props.user !== null) {
           
            this.props.navigation.navigate('LatestRecipes');
        }
    }

    GoToPage = (page) =>{
        this.props.navigation.navigate(page);
    }

    


    userNameChanged = value =>{
        let values = {...this.state.data};
        values['Username'] = value;
        this.setState({ data: values })
    }

    nameChanged = value =>{
        let values = {...this.state.data};
        values['Name'] = value;
        this.setState({ data: values })
    }

    passwordChanged = value =>{
        let values = {...this.state.data};
        values['Password'] = value;
        values['RepeatPassword'] = value;
        this.setState({ data: values })

    }


    signUp = () => {

        if(this.state.data.Name=='')
        {
            this.setState({ 
                nameValidate:false
            });
            
        }
        else if(this.state.data.Username=='')
        {
            this.setState({ 
                userNameValidate:false
            });
            
        }
       else if(this.state.data.Password=='')
        {
            this.setState({ 
                passwordValidate:false
            });
            
        }
        else
        {
            this.props.signUp(this.state.data);
        }
        
    };
    
   

    render() {
        const { isLoading, errors } = this.props;
        return (
                <View style={{flex: 1}}>
                    <View style={{ width: '100%' ,backgroundColor:'#f8f8f8', height:50}}>
                        <View style={{ flex: 1 ,flexDirection: 'row',justifyContent: 'center'}} >
                            <View style={{width: '10%', justifyContent: 'center', paddingLeft:10,}} >
                                <TouchableOpacity onPress={()=>this.GoToPage('Login')}>
                                    <Image source={iconback} style={{width: 26, height: 15}} ></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{width: '90%', justifyContent: 'center'}} >
                                <Text style={TextStyles.blackHeadingTextHeading}>Sign Up</Text>
                            </View>
                            
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={styles.container}>
                            <Image source={logo}></Image>
                            <Text style={TextStyles.createRecipes}>Create Recipes,</Text>
                            <Text style={TextStyles.improveText}>improve your cooking.</Text>
                           
                            <View style={[styles.formContainer, ShadowStyles.shadow]}>
                                <TextInput style = {[styles.profileInput,!this.state.nameValidate? TextStyles.errorInput:null]} placeholder='Name' onChangeText={(text)=>this.validate(text,'Name')} value={this.state.data.Name}/>
                                {
                                !this.state.nameValidate && (
                                    <Text style = {styles.errorText}>{this.state.nameValidateText}</Text>
                                )
                                }
                                <TextInput style = {[styles.profileInput,!this.state.userNameValidate? TextStyles.errorInput:null]} placeholder='Email' onChangeText={(text)=>this.validate(text,'Username')} value={this.state.data.Username}/>
                                {
                                !this.state.userNameValidate && (
                                    <Text style = {styles.errorText}>{this.state.userNameValidateText}</Text>
                                )
                                }
                                <TextInput style = {styles.profileInput} placeholder='Phone No' />
                                <TextInput style = {[styles.profileInput,!this.state.passwordValidate? TextStyles.errorInput:null]} placeholder='password'  onChangeText={(text)=>this.validate(text,'Password')} value={this.state.data.Password} secureTextEntry/>
                                {
                                !this.state.passwordValidate && (
                                    <Text style = {styles.errorText}>{this.state.passwordValidateText}</Text>
                                )
                                }
                                <View style={{width: '100%', paddingTop:20,  justifyContent: 'center',alignItems: 'center' }}>
                                <ErrorView errors={errors} />
                                <TouchableOpacity style={styles.SaveButtonStyle} activeOpacity = { .5 }  onPress={this.signUp}>
                                    <Text style={styles.whiteTextTitle}> Sign Up </Text>
                                </TouchableOpacity>
                                </View>
                                <View style={styles.formFooter}>
                                    <TouchableOpacity onPress={()=>this.GoToPage('SignIn')}>
                                        <Text style={styles.AlreadyRegister}>Already registered with email? Login</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.TextStyle}>By signing up, you agree to</Text>
                                    <Text style={styles.TextStyle}>our Terms of Service and Privacy Policy.</Text>
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                </View>
                );
            }
        }




SignUp.propTypes = {
    signUp: PropTypes.func.isRequired,
    user: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    errors: PropTypes.array,
    navigation: PropTypes.object.isRequired,
};

SignUp.defaultProps = {
    user: null,
    errors: [],
};

const mapStateToProps = state => ({
    user: getUser(state),
    isLoading: isLoadingSelector([actionTypes.LOGIN], state),
    errors: errorsSelector([actionTypes.LOGIN], state),
});

const mapDispatchToProps = dispatch => ({
    signUp:(data) => dispatch(signUp(data)),
  });
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);