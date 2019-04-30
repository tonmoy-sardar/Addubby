import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator
} from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import strings from '../../localization';
import TextStyles from '../../helpers/TextStyles';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import { getUserDetails,updateUserDetails } from '../../actions/UserActions';

import Footer from '../common/Footer';
import iconback from './../../assets/icon_back.png';

import profileImage from './../../assets/profile_image.png';
import btnAddPhoto from './../../assets/btn_add_photo.png';


class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
        token: '',
        detailsData: {},
        animating: true,
        nameValidate:true,
        nameValidateText:'Name is required.',
        lastNameValidate:true,
        lastNameValidateText:'Last name is required.',
        data:{
            Name :'',
            LastName:'',
            Birthday:'0001-01-01T00:00:00',
            Country:'IN',
            City:'Kolkata',
            Languages:["it", "en"],
            Photo:'https://somephoto.jpg',
            Description:''
        }
    };
  }

  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

    componentDidMount()
    {
        if(this.props.user!=null)
		{
            console.log("aaa")
            console.log('bbbb1'+ JSON.stringify(this.props.user.data));

            this.state.token = this.props.user.data;
            this.setState({
                token: this.props.user.data
            }, () => {
                console.log('cccc:'+ this.state.token);
                this.getUserDetails(this.state.token).then(
                    res => {
                        console.log(res.data)
                        if(res.data.success==true)
        				{
                            console.log(res.data)
                            let values = {...this.state.data};
                            values['Name'] = res.data.data.profile.name;
                            values['LastName'] = res.data.data.profile.lastName;
                            values['City'] = res.data.data.profile.city;
                            values['Description'] = res.data.data.profile.description;
                            
                            console.log(values)
                            this.setState({
                                detailsData: res.data,
                                animating: false,
                                data: values
                                // visible: !this.state.visible
                            }, () => {
                                    console.log('ddddd3:'+ JSON.stringify(this.state.detailsData.data.username));
                                })
                        }
						else{
							this.setState({
								animating: false,
							})
						}
                    }
				)
				.catch(err => {
					this.setState({
						animating: false,
					})
					console.log(err);
					console.log(err.error);
					
				  });
                // this.getUserDetails(this.state.token).then(
                //     res => {
                //         console.log(res.data)
                //         let values = {...this.state.data};
                //         values['Name'] = res.data.data.profile.name;
                //         values['LastName'] = res.data.data.profile.lastName;
                //         values['City'] = res.data.data.profile.city;
                //         values['Description'] = res.data.data.profile.description;
                        
                //         console.log(values)
                //         this.setState({
                //             detailsData: res.data,
                //             animating: false,
                //             data: values
                //             // visible: !this.state.visible
                //         }, () => {
                //             console.log('ddddd3:'+ JSON.stringify(this.state.detailsData.data.username));
                //         })
                //         // this.state.detailsData = res.data
                        
                //     }
                // );
            })
        }
        
    }

    componentDidUpdate() {
        if(this.props.user!=null)
		{
            console.log('bbbb11'+ JSON.stringify(this.props.user.data));
        }
    }

    getUserDetails = () => this.props.getUserDetails(this.state.token);

    
    updateUserDetails = () => {
        if(this.state.data.Name=='')
        {
            this.setState({ 
                nameValidate:false
            });
            
        }
        else if(this.state.data.LastName=='')
        {
            this.setState({ 
                lastNameValidate:false
            });
            
        }
        else{
            this.props.updateUserDetails(this.state.token, this.state.data).then(
                res => {
                    console.log(res.data);
                }
            )
        }
        
    };
    GoToPage = (page) =>{
        this.props.navigation.navigate(page);
    }

    validate(text,type)
    {
        let values = {...this.state.data};
        if(type=='Name')
        {
            if(text=='')
            {
                console.log('invalid');
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
        if(type=='LastName')
        {
            if(text=='')
            {
                values['LastName'] = text;
                this.setState({ data: values });
                this.setState({ 
                    lastNameValidate:false
                });
                
            }
            else
            {
                values['LastName'] = text;
                this.setState({ data: values });
                this.setState({ 
                    lastNameValidate:true
                });
            }
        }
    }

    userNameChanged = value =>{
        let values = {...this.state.data};
        values['Name'] = value;
        this.setState({ data: values })
    }

    lastNameChanged = value =>{
        let values = {...this.state.data};
        values['LastName'] = value;
        this.setState({ data: values })
    }

   cityChanged = value =>{
        let values = {...this.state.data};
        values['City'] = value;
        this.setState({ data: values })
    }

    descriptionChanged = value =>{
        let values = {...this.state.data};
        values['Description'] = value;
        this.setState({ data: values })
    }



  render() {
      return (
            <View style={{flex: 1}}>
                <View style={{ width: '100%' ,backgroundColor:'#f8f8f8', height:50}}>
					<View style={{ flex: 1 ,flexDirection: 'row',justifyContent: 'center'}} >
						<View style={{width: '10%', justifyContent: 'center', paddingLeft:10,}} >
							<TouchableOpacity onPress={()=>this.GoToPage('Profile')}>
								<Image source={iconback} style={{width: 26, height: 15}} ></Image>
							</TouchableOpacity>
						</View>
						<View style={{width: '50%', justifyContent: 'center'}} >
							<Text style={TextStyles.blackHeadingTextHeading}>Edit Profile</Text>
						</View>
                        <View style={{width: '40%',  justifyContent: 'center',alignItems: 'center', }}>
                            <TouchableOpacity style={styles.SaveButtonStyle} activeOpacity = { .5 } onPress={this.updateUserDetails}>
                                <Text style={styles.whiteTextTitle}> Save </Text>
                            </TouchableOpacity>
                        </View>
					</View>
				</View>
                
				{
					this.state.animating== true && (
				<View style={[styles.container, TextStyles.horizontal]}>
					<ActivityIndicator size="large" color="#d11c21" animating={this.state.animating} />
				</View>
					)
				}
				
				{
					this.state.animating== false && (
						<View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.container}>
                    <Image source={profileImage}></Image>
                    <View style={{paddingTop:20}}>
                        <Image source={btnAddPhoto}></Image>
                    </View>
                    <View style={[styles.formContainer]}>
                        <View style={{alignSelf: 'stretch',marginVertical: 10,}}>
                            <TextInput style = {[styles.profileInput,!this.state.nameValidate? TextStyles.errorInput:null]}  placeholder = "Name" onChangeText={(text)=>this.validate(text,'Name')} value={this.state.data.Name}/>
                            
                            {
					        !this.state.nameValidate && (
                                <Text style = {styles.errorText}>{this.state.nameValidateText}</Text>
                            )
                            }
                        </View>
                        <View style={{alignSelf: 'stretch',marginVertical: 10,}}>
                            <TextInput style = {[styles.profileInput,!this.state.lastNameValidate? TextStyles.errorInput:null]}  placeholder = "Last Name" onChangeText={(text)=>this.validate(text,'LastName')} value={this.state.data.LastName}/>
                            {
					        !this.state.lastNameValidate && (
                                <Text style = {styles.errorText}>{this.state.lastNameValidateText}</Text>
                            )
                            }
                        </View>
                        <View style={{alignSelf: 'stretch',marginVertical: 10,}}>
                            <TextInput style = {styles.profileInput}  placeholder = "Where do you live?" onChangeText={this.cityChanged} value={this.state.data.City}/>
                        </View>
                        <View style={{alignSelf: 'stretch',marginVertical: 10,}}>
                            <TextInput style = {styles.profileInput}  placeholder = "About you and love your cooking" onChangeText={this.descriptionChanged} value={this.state.data.Description}/>
                        </View>
                        
                    </View>
                </View>
            </ScrollView>
            <Footer ></Footer>
            </View>
            	)
            }
        </View>
        );
    }
}


EditProfile.propTypes = {
    getUserDetails: PropTypes.func.isRequired,
    updateUserDetails: PropTypes.func.isRequired,
    user: PropTypes.object,
};

EditProfile.defaultProps = {
    user: null,
};

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
    getUserDetails: (Token) => dispatch(getUserDetails(Token)),
    updateUserDetails:(Token,data) => dispatch(updateUserDetails(Token,data)),
    
  });



export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);