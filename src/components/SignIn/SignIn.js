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
import ErrorView from '../common/ErrorView';
import TextField from '../common/TextField';
import ShadowStyles from '../../helpers/ShadowStyles';
import TextStyles from '../../helpers/TextStyles';

import { login, actionTypes,logout } from '../../actions/UserActions';
import getUser from '../../selectors/UserSelectors';
import errorsSelector from '../../selectors/ErrorSelectors';
import { isLoadingSelector } from '../../selectors/StatusSelectors';

import styles from './styles';
import logo from './../../assets/logo.png';
import iconback from './../../assets/icon_back.png';

class SignIn extends Component {
    static navigationOptions = {
        header: null,
        
    };

    constructor(props) {
        super(props);
        this.state = {
            userNameValidate:true,
            userNameValidateText:'Username is required.',
            passwordValidate:true,
            passwordValidateText:'Password is required.',
            hasError:false,
            data:{
                Username:'',
                Password:'',
            }
        };
        this.navigateToHomeIfLogged();
    }
    

    componentDidUpdate() {
       
        
        this.navigateToHomeIfLogged();
        return null;
    }

    navigateToHomeIfLogged = () => {
        console.log('user:'+this.props.user);
        
        if (this.props.user !== null) {
           
            this.props.navigation.navigate('LatestRecipes');
        }
    }
    

    GoToPage = (page) =>{

        //console.log(page);
        this.props.navigation.navigate(page);
    }

    validate(text,type)
    {
        //var emailVal = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let values = {...this.state.data};
        
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
                values['Username'] = text;
                this.setState({ data: values });
                this.setState({ 
                    userNameValidate:true
                });
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

    // passwordChanged = value => this.setState({ Password: value });

    // userNameChanged = value => this.setState({ Username: value }, () => {
    //     console.log(this.state.Username)
    // });

    
    login = () => {

        if(this.state.data.Username=='')
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
            this.props.login(this.state.data);
            
        }
        
    };
    //login = () => this.props.login(this.state.Username, this.state.Password);
    

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
                                <Text style={TextStyles.blackHeadingTextHeading}>Sign In</Text>
                            </View>
                            
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={styles.container}>
                            <Image source={logo}></Image>
                            <Text style={TextStyles.createRecipes}>Create Recipes,</Text>
                            <Text style={TextStyles.improveText}>improve your cooking.</Text>
                            
                            <View style={[styles.formContainer, ShadowStyles.shadow]}>
                                <TextInput style = {[styles.profileInput,!this.state.userNameValidate? TextStyles.errorInput:null]} placeholder='User name' onChangeText={(text)=>this.validate(text,'Username')} value={this.state.Username} />
                                {
                                !this.state.userNameValidate && (
                                    <Text style = {styles.errorText}>{this.state.userNameValidateText}</Text>
                                )
                                }
                                <TextInput style = {[styles.profileInput,!this.state.passwordValidate? TextStyles.errorInput:null]} placeholder='Password' value={this.state.Password} onChangeText={(text)=>this.validate(text,'Password')} secureTextEntry/>
                                {
                                !this.state.passwordValidate && (
                                    <Text style = {styles.errorText}>{this.state.passwordValidateText}</Text>
                                )
                                }
                                <View style={{width: '100%', paddingTop:20,  justifyContent: 'center',alignItems: 'center' }}>
                                <ErrorView errors={errors} />
                                <TouchableOpacity style={styles.SaveButtonStyle} activeOpacity = { .5 } onPress={this.login}>
                                    <Text style={styles.whiteTextTitle}> Sign In </Text>
                                </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                </View>
                );
            }
        }

SignIn.propTypes = {
    login: PropTypes.func.isRequired,
    user: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    errors: PropTypes.array,
    navigation: PropTypes.object.isRequired,
};

SignIn.defaultProps = {
    user: null,
    errors: [],
};

const mapStateToProps = state => ({
    user: getUser(state),
    isLoading: isLoadingSelector([actionTypes.LOGIN], state),
    errors: errorsSelector([actionTypes.LOGIN], state),
});

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(login(data)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);