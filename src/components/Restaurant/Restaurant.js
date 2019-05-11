import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import OptionsMenu from "react-native-options-menu";
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import Footer from '../common/Footer';


import iconback from './../../assets/icon_back.png';
import bookmarkImage from './../../assets/bookmark.png';
import bookmark1Image from './../../assets/bookmark1.png';
import bookmark2Image from './../../assets/bookmark2.png';

import iconCamera from './../../assets/icon_camera.png';
import btnRestaurantAdd from './../../assets/btn_restaurant_add.png';
import { getUserDetails } from '../../actions/UserActions';
import { addRestaurant } from '../../actions/RecipeActions';

import ImagePicker from 'react-native-image-picker';

class Restaurant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            switchValue: false,
            token: '',
            detailsData: {},
            animating: true,
            avatarSource: null,
            data:{
                name :'',
                description:'',
                images:'',
               
            }
         }
         this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }

    selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true,
          },
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            //let source = { uri: response.uri };
    
            // You can also display the image using data:
            let source = { uri: 'data:image/jpeg;base64,' + response.data };
            
            let values = {...this.state.data}
            values['images'] = source
            this.setState({
                data: values,
            }, () => {
                console.log("avatarSource-->"+this.state.data.images)
            });
          }
        });
      }
    
      componentDidMount()
    {
        if(this.props.user!=null)
		{


            this.state.token = this.props.user.data;
            this.setState({
                token: this.props.user.data
            }, () => {

                this.getUserDetails(this.state.token).then(
                    res => {

                        if(res.data.success==true)
        				{

                            let values = {...this.state.data};
                            values['userDetails']['name'] = res.data.data.profile.name;
                           
                            
                            this.setState({
                                data: values
                                    // visible: !this.state.visible
                                }, () => {

                                })
                        }
						else{
							
						}
                    }
				)
				.catch(err => {
					
					console.log(err);
					console.log(err.error);
					
				  });
                
            })
        }
        
    }

    getUserDetails = () => this.props.getUserDetails(this.state.token);

    static navigationOptions = {
        header: null,
        tabBarVisible: false,
    };

    getMessage = () => {
        const { user } = this.props;
        return `${strings.homeMessage} ${user && user.name}`;
    }

    GoToPage = (page) =>{
        this.props.navigation.navigate(page);
    }


    _renderCancel = () =>{
        if (this.state.textBoxShow) {
            return (
                <Text style={TextStyles.blackHeadingTextHeading}>Bookmark</Text>
            );
            } else {
            return (
                <Text style={TextStyles.blackHeadingTextHeading}>Bookmark</Text>
            );
        }
    }

    toggleStatus = () =>{
    //this.state.textBoxShow = true;
    }


    changeAndSetText(text,type)
    {
        let values = {...this.state.data};
        if(type=='name')
        {
            values['name'] = text;
            this.setState({ data: values });    
        }
        if(type=='description')
        {
            values['description'] = text;
            this.setState({ data: values });    
        }
    }

    addRestaurant = () => {
        
        this.props.addRestaurant(this.state.token, this.state.data).then(
            res => {

                this.props.navigation.navigate('RestaurantRecipe');
            }
        )
       
    };

render() {
    const MoreIcon = require("./../../assets/btn_restaurant_add.png");
    return (
        <View style={{flex: 1}}>
            <View style={{ width: '100%' ,backgroundColor:'#f8f8f8', height:50}}>
                <View style={{ flex: 1 ,flexDirection: 'row',justifyContent: 'center'}} >
                    <View style={{width: '10%', justifyContent: 'center', paddingLeft:10,}} >
                        <TouchableOpacity onPress={()=>this.GoToPage('Profile')}>
                            <Image source={iconback} style={{width: 26, height: 15}} ></Image>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{width: '90%',  justifyContent: 'center',alignItems: 'flex-end',paddingRight:10, }}>
                        <TouchableOpacity style={styles.SaveButtonStyle} activeOpacity = { .5 } onPress={this.addRestaurant}>
                            <Text style={styles.whiteTextTitle}> Save </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View  style={{ margin: 10,}}>
                    <View style={{width: '100%', justifyContent: 'center'}} >
                       
                        <TextInput style = {styles.formInput}  placeholder = "Restaurant Name" onChangeText={(text)=>this.changeAndSetText(text,'name')} value={this.state.data.name}/>
                    </View>
                </View>
                <View  style={{ margin: 10,}}>
                    <View style={{width: '100%', justifyContent: 'center'}} >
                        
                        <TextInput style = {styles.formInput}  placeholder = "Description" onChangeText={(text)=>this.changeAndSetText(text,'description')} value={this.state.data.description}/>
                    </View>
                </View>
                <View style={[styles.cardContainer]} >
                    <View style={{ width: '100%'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '100%', padding:30, justifyContent: 'center',alignItems: 'center',}}>
                                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                        <View style={[
                                styles.avatar,
                                styles.avatarContainer,
                                
                                ]}>
                                    {this.state.data.images == '' ? (
                                    <Image source={iconCamera} style={{width: 51, height: 40}} ></Image>
                                    ) : (
                                    <Image style = {styles.avatar} source={this.state.data.images} />
                                    )}
                                </View>
                                </TouchableOpacity>
                                <View style={{paddingTop:20,}}>
                                    <Text style={TextStyles.blackTextTitle}>Upload Photo</Text>
                                </View>
                                <View style={{paddingTop:5}}>
                                    <Text style={TextStyles.grayText}>Please only use your own original photos.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View  style={{ margin: 10,}}>
                    <View style={{width: '100%', justifyContent: 'center',borderColor: '#dddddd', borderWidth: 1,borderRadius:25}} >
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '30%', justifyContent: 'center', paddingLeft:30,height:45}} >
                                <Text style={TextStyles.blackTextTitle}>Recipes</Text>
                            </View>
                            <View style={{width: '70%', justifyContent: 'center',alignItems: 'flex-end', paddingRight:30,}} >
                                <OptionsMenu button={MoreIcon} buttonStyle={{ width: 82, height: 30,marginLeft: 15, resizeMode: "contain" }} destructiveIndex={1} options={["Add (Search)","Add (new)"]} actions={[this.DetailsView,this.DetailsView]}/>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.cardContainer]} >
                    <View style={{ width: '100%'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '30%', justifyContent: 'center'}} >
                                <Image source={bookmarkImage} style={{width: '100%', height: 100,borderTopLeftRadius:10,borderBottomLeftRadius:10,}} ></Image>
                            </View>
                            <View style={{width: '70%', padding:20}}>
                                <Text style={TextStyles.redTextTitle}>Beef Steak</Text>
                                <Text style={TextStyles.grayText}>Classic Lightly mix 6 ounces ground beef....</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.cardContainer]} >
                    <View style={{ width: '100%'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '30%', justifyContent: 'center'}} >
                                <Image source={bookmark2Image} style={{width: '100%', height: 100,borderTopLeftRadius:10,borderBottomLeftRadius:10,}} ></Image>
                            </View>
                            <View style={{width: '70%', padding:20}}>
                                <Text style={TextStyles.redTextTitle}>Veg Burger</Text>
                                <Text style={TextStyles.grayText}>Cheese Make Classic Burger...</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.cardContainer]} >
                    <View style={{ width: '100%'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '30%', justifyContent: 'center'}} >
                                <Image source={bookmark1Image} style={{width: '100%', height: 100,borderTopLeftRadius:10,borderBottomLeftRadius:10,}} ></Image>
                            </View>
                            <View style={{width: '70%', padding:20}}>
                                <Text style={TextStyles.redTextTitle}>Lasguna mutton</Text>
                                <Text style={TextStyles.grayText}>Caramelized Onion Cook 2 sliced red....</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Footer ></Footer>
        </View>
        );
    }
}

Restaurant.propTypes = {
    getUserDetails: PropTypes.func.isRequired,
    addRestaurant: PropTypes.func.isRequired,
    user: PropTypes.object,
};

Restaurant.defaultProps = {
    user: null,
};

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
    getUserDetails: (Token) => dispatch(getUserDetails(Token)),
    addRestaurant:(Token,data) => dispatch(addRestaurant(Token,data)),
    
  });

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);