import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Switch,
    ProgressBarAndroid,
    ActivityIndicator
} from 'react-native';

import { Avatar } from 'react-native-elements';
//import PhotoUpload from 'react-native-photo-upload'

//import { ProgressBar, Colors } from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import Footer from '../common/Footer';

import iconback from './../../assets/icon_back.png';
import iconCamera from './../../assets/icon_camera.png';
import btnAdd from './../../assets/btn_add.png';
import { getUserDetails } from '../../actions/UserActions';
import ImagePicker from 'react-native-image-picker';

class AddRecipe extends Component {

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
                images:[],
                ingredients:[],
                steps:[],
                isAllowComment:true,
                userDetails:{
                    name:'',
                    imageUrl:''
                }
            }
         }
         this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }

    static navigationOptions = {
        header: null,
        tabBarVisible: false,
    };

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
            let source = { uri: response.uri };
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              avatarSource: source,
            }, () => {
                console.log("avatarSource-->"+this.state.avatarSource)
            });
          }
        });
      }

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
                            values['userDetails']['name'] = res.data.data.profile.name;
                           
                            
                            this.setState({
                                data: values
                                    // visible: !this.state.visible
                                }, () => {
                                    console.log('111:'+ JSON.stringify(this.state.data));
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

    componentDidUpdate() {
        if(this.props.user!=null)
		{
            console.log('12'+ JSON.stringify(this.state.data));
        }
    }

    getMessage = () => {
        const { user } = this.props;
        return `${strings.homeMessage} ${user && user.name}`;
    }

    GoToPage = (page) =>{
        this.props.navigation.navigate(page);
    }

    toggleStatus = () =>{
    //this.state.textBoxShow = true;
    }

    toggleSwitch = (value) => {
		this.setState({switchValue: value})
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
                    
                    <View style={{width: '90%',  justifyContent: 'center',alignItems: 'flex-end',paddingRight:10, }}>
                        <TouchableOpacity style={styles.SaveButtonStyle} activeOpacity = { .5 }>
                            <Text style={styles.whiteTextTitle}> Save </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>                
                <View  style={{ margin: 10,}}>
                    <View style={{width: '100%', justifyContent: 'center'}} >
                        <TextInput style = {styles.formInput}  placeholder = "Recipe Title" onChangeText={(text)=>this.changeAndSetText(text,'name')} value={this.state.data.name}/>
                    </View>
                </View>
                <View  style={{ margin: 10,}}>
                    <View style={{width: '100%', justifyContent: 'center'}} >
                        <TextInput style = {styles.formInput}  placeholder = "Add a short description...." onChangeText={(text)=>this.changeAndSetText(text,'description')} value={this.state.data.description}/>
                    </View>
                </View>
                <View  style={{width: '100%', margin: 10,}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '100%', justifyContent: 'center'}} >
                            <Text style={TextStyles.blackTextTitle}>Ingredients</Text>
                        </View>
                    </View>
                </View>
                <View  style={{margin: 10,marginTop: 0,}}>
                <ProgressBarAndroid  style={{color:'red',size:10,}} styleAttr="Horizontal" indeterminate={false}  progress={0.5}/>
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
                                    {this.state.avatarSource === null ? (
                                    <Image source={iconCamera} style={{width: 51, height: 40}} ></Image>
                                    ) : (
                                    <Image style = {styles.avatar} source={this.state.avatarSource} />
                                    )}
                                </View>
                                </TouchableOpacity>
                                {/* <PhotoUpload
                                    onPhotoSelect={avatar1 => {
                                        if (avatar1) {
                                        console.log('Image base64 string: ', avatar1)
                                        }
                                    }}
                                    >
                                    <Image
                                        style={{width: 51, height: 40}}
                                        resizeMode='cover'
                                        source={iconCamera}
                                    />
                                    </PhotoUpload> */}
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
                <View  style={{width: '100%', margin: 10,}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '30%', justifyContent: 'center'}} >
                            <Text style={TextStyles.blackTextTitle}>Ingredients</Text>
                        </View>
                        <View style={{width: '70%', justifyContent: 'center',alignItems: 'flex-end', paddingRight:20,}} >
                        <Text style={TextStyles.grayText}>How many servings?</Text>
                        </View>
                    </View>
                </View>
                <View  style={{ margin: 10,}}>
                    <View style={{width: '100%', justifyContent: 'center'}} >
                        <TextInput style = {styles.formInput}  placeholder = "Main ingredient.." />
                    </View>
                </View>
                <View style={[styles.ingredientsContainer]} >
                    <View style={{ width: '100%', padding: 20,}}>
                        <View style={{width: '100%', justifyContent: 'center',borderBottomWidth:1, borderColor:'#cccccc',paddingBottom:2,}} >
                            <Text style={TextStyles.grayText}>100g spinach</Text>
                        </View>
                        <View style={{width: '100%', justifyContent: 'center',borderBottomWidth:1, borderColor:'#cccccc',paddingBottom:2,paddingTop:10}} >
                            <Text style={TextStyles.grayText}>100g spinach</Text>
                        </View>
                        <View style={{width: '100%', justifyContent: 'center',borderBottomWidth:1, borderColor:'#cccccc',paddingBottom:2,paddingTop:10}} >
                            <Text style={TextStyles.grayText}>100g spinach</Text>
                        </View>
                    </View>
                </View>
                <View  style={{ margin: 10,marginTop:0,}}>
                    <View style={{width: '100%',flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '50%', justifyContent: 'center',paddingRight:10,}} >
                            <TouchableOpacity style={styles.AddButtonStyle} activeOpacity = { .5 }>
                                <Text style={TextStyles.blackText}>Add Section</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '50%', justifyContent: 'center',alignItems: 'flex-end',addingLeft:10,}} >
                        <TouchableOpacity style={styles.AddButtonStyle} activeOpacity = { .5 }>
                            <Text style={TextStyles.blackText}>Add Ingredient</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{width: '100%',  justifyContent: 'center',alignItems: 'center',paddingLeft:10,paddingRight:10,marginTop:10,marginBottom:20,}}>
                    <TouchableOpacity style={styles.ContinueButtonStyle} activeOpacity = { .5 }>
                        <Text style={TextStyles.whiteText}>Edit More Data</Text>
                    </TouchableOpacity>
                </View>

                <View  style={{width: '100%', margin: 10,}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '20%', justifyContent: 'center'}} >
                            <Text style={TextStyles.blackTextTitle}>Steps</Text>
                        </View>
                        <View style={{width: '55%', justifyContent: 'center',alignItems: 'flex-end', paddingRight:20,}} >
                        <Text style={TextStyles.grayText}>How long to cook?</Text>
                        </View>
                        <View style={{width: '25%', justifyContent: 'center'}} >
                            <View>
                                <TextInput style = {styles.profileInput}  placeholder = "0 min" />
                            </View>
                        </View>
                        
                    </View>
                </View>

                <View style={[styles.cardContainer]} >
                    <View style={{ width: '100%',padding:20,}}>
                        <View style={{flex: 1, flexDirection: 'row', paddingBottom:30,}}>
                            <View style={{width: '12%',}}>
                                <View  style={{width: '75%', padding:5,  justifyContent: 'center',backgroundColor:'#969696',borderRadius:13,  alignItems: 'center', }}>
                                    <Text style={TextStyles.whiteTextSmall}>1</Text>
                                </View>
                            </View>
                            <View style={{width: '88%', justifyContent: 'center',}}>
                                <View style={{borderBottomWidth:1, borderColor:'#cccccc',paddingBottom:2,}}>
                                <Text style={styles.grayText}>Write instructions</Text>
                                </View>
                                <View style={{width: '100%',flex: 1, flexDirection: 'row'}}>
                                    <View style={{width: '25%', justifyContent: 'center',}} >
                                        <TouchableOpacity style={styles.AddInstructionsButtonStyle} activeOpacity = { .5 }>
                                        <Image source={iconCamera} style={{width: 26, height: 20}} ></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '25%', justifyContent: 'center',}} >
                                        <TouchableOpacity style={styles.AddInstructionsButtonStyle} activeOpacity = { .5 }>
                                        <Image source={iconCamera} style={{width: 26, height: 20}} ></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '25%', justifyContent: 'center',}} >
                                        <TouchableOpacity style={styles.AddInstructionsButtonStyle} activeOpacity = { .5 }>
                                        <Image source={iconCamera} style={{width: 26, height: 20}} ></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '25%', justifyContent: 'center',}} >
                                        <TouchableOpacity style={styles.AddInstructionsBorderButtonStyle} activeOpacity = { .5 }>
                                        <Text style={TextStyles.blackTextBig}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{width: '100%',justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={btnAdd} style={{width: 40, height: 40,position:'absolute'}} ></Image>
                    </View>
                </View>
                <View style={[styles.cardContainer]} >
                    <View style={{ width: '100%',padding:20,}}>
                        <View style={{flex: 1, flexDirection: 'row', paddingBottom:30,}}>
                            <View style={{width: '12%',}}>
                                <View  style={{width: '75%', padding:5,  justifyContent: 'center',backgroundColor:'#969696',borderRadius:13,  alignItems: 'center', }}>
                                    <Text style={TextStyles.whiteTextSmall}>2</Text>
                                </View>
                            </View>
                            <View style={{width: '88%', justifyContent: 'center',}}>
                                <View style={{borderBottomWidth:1, borderColor:'#cccccc',paddingBottom:2,}}>
                                    <Text style={styles.grayText}>Write instructions</Text>
                                </View>
                                <View style={{width: '100%',flex: 1, flexDirection: 'row'}}>
                                    <View style={{width: '25%', justifyContent: 'center',}} >
                                        <TouchableOpacity style={styles.AddInstructionsButtonStyle} activeOpacity = { .5 }>
                                        <Image source={iconCamera} style={{width: 26, height: 20}} ></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '25%', justifyContent: 'center',}} >
                                        <TouchableOpacity style={styles.AddInstructionsButtonStyle} activeOpacity = { .5 }>
                                        <Image source={iconCamera} style={{width: 26, height: 20}} ></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '25%', justifyContent: 'center',}} >
                                        <TouchableOpacity style={styles.AddInstructionsButtonStyle} activeOpacity = { .5 }>
                                        <Image source={iconCamera} style={{width: 26, height: 20}} ></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '25%', justifyContent: 'center',}} >
                                        <TouchableOpacity style={styles.AddInstructionsBorderButtonStyle} activeOpacity = { .5 }>
                                        <Text style={TextStyles.blackTextBig}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{width: '100%',justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={btnAdd} style={{width: 40, height: 40,position:'absolute'}} ></Image>
                    </View>
                </View>
                <View style={[styles.cardContainer]} >
                    <View style={{ width: '100%',padding:20,}}>
                        <View style={{flex: 1, flexDirection: 'row', paddingBottom:30,}}>
                            <View style={{width: '12%',}}>
                                <View  style={{width: '75%', padding:5,  justifyContent: 'center',backgroundColor:'#969696',borderRadius:13,  alignItems: 'center', }}>
                                    <Text style={TextStyles.whiteTextSmall}>3</Text>
                                </View>
                            </View>
                            <View style={{width: '88%', justifyContent: 'center',}}>
                                <View style={{borderBottomWidth:1, borderColor:'#cccccc',paddingBottom:2,}}>
                                <Text style={styles.grayText}>Write instructions</Text>
                                </View>
                                <View style={{width: '100%',flex: 1, flexDirection: 'row'}}>
                                    <View style={{width: '25%', justifyContent: 'center',}} >
                                        <TouchableOpacity style={styles.AddInstructionsButtonStyle} activeOpacity = { .5 }>
                                        <Image source={iconCamera} style={{width: 26, height: 20}} ></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '25%', justifyContent: 'center',}} >
                                        <TouchableOpacity style={styles.AddInstructionsButtonStyle} activeOpacity = { .5 }>
                                        <Image source={iconCamera} style={{width: 26, height: 20}} ></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '25%', justifyContent: 'center',}} >
                                        <TouchableOpacity style={styles.AddInstructionsButtonStyle} activeOpacity = { .5 }>
                                        <Image source={iconCamera} style={{width: 26, height: 20}} ></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '25%', justifyContent: 'center',}} >
                                        <TouchableOpacity style={styles.AddInstructionsBorderButtonStyle} activeOpacity = { .5 }>
                                        <Text style={TextStyles.blackTextBig}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{width: '100%',justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={btnAdd} style={{width: 40, height: 40,position:'absolute'}} ></Image>
                    </View>
                </View>
                <View  style={{ margin: 10,marginTop:0,}}>
                    <View style={{width: '100%',flex: 1, flexDirection: 'row'}}>
                        
                        <View style={{width: '100%',justifyContent: 'center',alignItems: 'center'}} >
                        <TouchableOpacity style={styles.AddStepButtonStyle} activeOpacity = { .5 }>
                            <Text style={TextStyles.blackText}>Add Steps</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View  style={{width: '100%', margin: 10,paddingLeft:20,paddingRight:20,paddingBottom:40,}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '80%', justifyContent: 'center'}} >
                            <Text style={TextStyles.blackTextTitle}>Allow Comments</Text>
                            <Text style={styles.grayText}>All users van comment on your recipeand any comments 
will be publicly visible.</Text>
                        </View>
                        <View style={{width: '20%',paddingLeft:20, justifyContent: 'center',alignItems: 'flex-end',}} >
                            <Switch thumbColor="#d11c21" trackColor="#f6d2d3" onValueChange = {this.toggleSwitch} value = {this.state.switchValue}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Footer ></Footer>
        </View>
        );
    }
}


AddRecipe.propTypes = {
    getUserDetails: PropTypes.func.isRequired,
    user: PropTypes.object,
};

AddRecipe.defaultProps = {
    user: null,
};

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
    getUserDetails: (Token) => dispatch(getUserDetails(Token)),
    
  });


export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);