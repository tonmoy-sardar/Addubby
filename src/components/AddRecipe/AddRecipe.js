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
import { addRecipe } from '../../actions/RecipeActions';
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
            },
            recipeData: {
                name: "",
                description: "",
                images: [
                  {
                    id: "",
                    imageUrl: ""
                  }
                ],
                ingredients: [
                  {
                    section: "",
                    ingredient: [
                      {
                        label: ""
                      }
                    ]
                  }
                ],
                steps: [
                  {
                    description: "",
                    images: [
                      {
                        id: "",
                        imageUrl: ""
                      }
                    ]
                  }
                ],
                isAllowComment: true,
                userDetails: {
                  name: "",
                  imageUrl: ""
                }
            }


        }
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.selectStepPhotoTapped = this.selectStepPhotoTapped.bind(this);
    }

    static navigationOptions = {
        header: null,
        tabBarVisible: false,
    };

    // Ingredient Section
    addIngredientSection = () => {
        let values = {...this.state.recipeData}
        var obj = {
            section: "",
            ingredient: [
              {
                label: ""
              }
            ]
        }
        values['ingredients'].push(obj)
        this.setState({
            recipeData: values
        })
    }

    removeIngredientSection = (i) => {
        let values = {...this.state.recipeData}
        values['ingredients'].splice(i,1)
        this.setState({
            recipeData: values
        })
    }

    // Ingredient
    addIngredient = () => {
        var index = this.state.recipeData['ingredients'].length - 1 ;
        let values = {...this.state.recipeData}
        var obj = {
            label: ""
        }
        values['ingredients'][index]['ingredient'].push(obj)
        this.setState({
            recipeData: values
        })
    }

    removeIngredient = (i) => {
        var parentIndex = this.state.recipeData['ingredients'].length - 1 ;
        let values = {...this.state.recipeData}
        values['ingredients'][parentIndex]['ingredient'].splice(i,1)
        this.setState({
            recipeData: values
        })
    }

    // steps
    addStep = () => {
        let values = {...this.state.recipeData}
        var obj = {
            description: "",
            images: [
              {
                id: "",
                imageUrl: ""
              }
            ]
        }
        values['steps'].push(obj)
        this.setState({
            recipeData: values
        })
    }

    removeStep = (i) => {
        let values = {...this.state.recipeData}
        values['steps'].splice(i,1)
        this.setState({
            recipeData: values
        })
    }

    // Step Image
    addStepImage = (index) => {
        let values = {...this.state.recipeData}
        var obj = {
            id: "",
            imageUrl: ""
        }
        values['steps'][index]['images'].push(obj)
        this.setState({
            recipeData: values
        })
        
    }

    removeStepImage = (parentIndex,i) => {
        let values = {...this.state.recipeData}
        values['steps'][parentIndex]['images'].splice(i,1)
        this.setState({
            recipeData: values
        })
    }
    // 

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
            let values = {...this.state.recipeData}
            values['images'][0]['imageUrl'] = source
            this.setState({
                recipeData: values,
            }, () => {

            });
          }
        });
    }

    componentDidMount()
    {
        let receipeValues = {...this.state.recipeData}
        receipeValues.name = "";
        receipeValues.description = "";
        var imagesData = [
            {
              id: "",
              imageUrl: ""
            }
        ]
        receipeValues.images = imagesData;
        var ingredientsData =  [
            {
              section: "",
              ingredient: [
                {
                  label: ""
                }
              ]
            }
        ]
        receipeValues.ingredients = ingredientsData;
        var stepsData = [
            {
              description: "",
              images: [
                {
                  id: "",
                  imageUrl: ""
                }
              ]
            }
        ]
        receipeValues.steps = stepsData;
        this.setState({
            recipeData: receipeValues
        })


    
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

                            let values = {...this.state.recipeData};
                            values['userDetails']['name'] = res.data.data.username;
                            values['userDetails']['imageUrl'] = res.data.data.profile.photo;
                           
                            
                            this.setState({
                                recipeData: values
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

    componentDidUpdate() {
       
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
        let values = {...this.state.recipeData};
        if(type=='name')
        {
            values['name'] = text;
            this.setState({ recipeData: values });    
        }
        if(type=='description')
        {
            values['description'] = text;
            this.setState({ recipeData: values });    
        }
    }


getIngredientItems = (index) => {
    const ingredientsItems = this.state.recipeData.ingredients[index]['ingredient'].map((item, j) =>
        <View style={{width: '100%', justifyContent: 'center',paddingBottom:2,}} key={j}>
            <TextInput style = {styles.textInput} placeholder='Label Value' value={item.label} onChangeText={(text)=>this.ingredientLabelChange(text,index,j)}/>
        </View>
    )
    return ingredientsItems;

}

getStepImages = (index) => {
    const stepImages = this.state.recipeData.steps[index]['images'].map((item, j) =>
        <View style={{width: '25%', justifyContent: 'center',}} key={j}>
            <TouchableOpacity style={styles.AddInstructionsButtonStyle} activeOpacity = { .5 } onPress={()=>this.selectStepPhotoTapped(index,j)}>
            {item.imageUrl == '' ? (
                <Image source={iconCamera} style={{width: 26, height: 20}} ></Image>
                ) : (
                <Image style = {styles.avatar} source={item.imageUrl}  />
                )
            }
            {/* <Image source={iconCamera} style={{width: 26, height: 20}} ></Image> */}
            </TouchableOpacity>
        </View>
    )
    return stepImages;

}

ingredientSectionChange = (val, index) => {
    let values = {...this.state.recipeData}
    values.ingredients[index].section = val;
    this.setState({
        recipeData: values
    })

}


ingredientLabelChange = (val, parentIndex, i) => {
    let values = {...this.state.recipeData}
    values.ingredients[parentIndex].ingredient[i].label = val;
    this.setState({
        recipeData: values
    })

}

stepDescriptionChange = (val, index) => {
    let values = {...this.state.recipeData}
    values.steps[index].description = val;
    this.setState({
        recipeData: values
    })

}

selectStepPhotoTapped(parentIndex,i) {
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
        let values = {...this.state.recipeData}        
        values.steps[parentIndex].images[i]['imageUrl'] = source
        this.setState({
            recipeData: values,
        });
      }
    });
}

addRecipe = () => {

    this.props.addRecipe(this.state.token, this.state.recipeData).then(
        res => {

            this.props.navigation.navigate('LatestRecipes');
        }
    )
}

render() {
    const ingredients = this.state.recipeData.ingredients.map((item, i) =>
    <View style={{ width: '100%', padding: 20,}} key={i}>
                <View style={{width: '100%', justifyContent: 'center',paddingBottom:2,}} >
                    <TextInput style = {styles.textInputSection} placeholder='Section Title' value={item.section} onChangeText={(text)=>this.ingredientSectionChange(text,i)}/>
                </View>
                {this.getIngredientItems(i)}               
            </View>
       
    )

    const steps = this.state.recipeData.steps.map((item, i) =>
        <View style={[styles.cardContainer]} key={i}>
            <View style={{ width: '100%',padding:20,paddingTop:10,}}>
                <View style={{flex: 1, flexDirection: 'row', paddingBottom:30,}}>
                    <View style={{width: '12%',paddingTop:5,}}>
                        <View  style={{width: '75%', padding:5,  justifyContent: 'center',backgroundColor:'#969696',borderRadius:13,  alignItems: 'center', }}>
                            <Text style={TextStyles.whiteTextSmall}>{i+1}</Text>
                        </View>
                    </View>
                    <View style={{width: '88%', justifyContent: 'center',}}>
                        <View style={{paddingBottom:2,}}>
                        {/* <Text style={styles.grayText}>Write instructions</Text> */}
                        <TextInput style = {styles.textInput} placeholder='Write instructions' value={item.description} onChangeText={(text)=>this.stepDescriptionChange(text,i)}/>
                        </View>
                        <View style={{width: '100%',flex: 1, flexDirection: 'row'}}>
                            {this.getStepImages(i)}
                            <View style={{width: '25%', justifyContent: 'center',}} >
                                <TouchableOpacity style={styles.AddInstructionsBorderButtonStyle} activeOpacity = { .5 } onPress={()=>this.addStepImage(i)}>
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
    )                
                
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
                        <TouchableOpacity style={styles.SaveButtonStyle} activeOpacity = { .5 } onPress={this.addRecipe}>
                            <Text style={styles.whiteTextTitle}> Save </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>                
                <View  style={{ margin: 10,}}>
                    <View style={{width: '100%', justifyContent: 'center'}} >
                        <TextInput style = {styles.formInput}  placeholder = "Recipe Title" onChangeText={(text)=>this.changeAndSetText(text,'name')} value={this.state.recipeData.name}/>
                    </View>
                </View>
                <View  style={{ margin: 10,}}>
                    <View style={{width: '100%', justifyContent: 'center'}} >
                        <TextInput style = {styles.formInput}  placeholder = "Add a short description...." onChangeText={(text)=>this.changeAndSetText(text,'description')} value={this.state.recipeData.description}/>
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
                                    {this.state.recipeData.images[0].imageUrl == '' ? (
                                    <Image source={iconCamera} style={{width: 51, height: 40}} ></Image>
                                    ) : (
                                    <Image style = {styles.avatar} source={this.state.recipeData.images[0]['imageUrl']}  />
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
                {/* <View  style={{ margin: 10,}}>
                    <View style={{width: '100%', justifyContent: 'center'}} >
                        <TextInput style = {styles.formInput}  placeholder = "Main ingredient.." />
                    </View>
                </View> */}
                 <View style={[styles.ingredientsContainer]} >
                 {ingredients}
                </View>
                
                <View  style={{ margin: 10,marginTop:0,}}>
                    <View style={{width: '100%',flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '50%', justifyContent: 'center',paddingRight:10,}} >
                            <TouchableOpacity style={styles.AddButtonStyle} activeOpacity = { .5 }  onPress={()=>this.addIngredientSection()}>
                                <Text style={TextStyles.blackText}>Add Section</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '50%', justifyContent: 'center',alignItems: 'flex-end',addingLeft:10,}} >
                        <TouchableOpacity style={styles.AddButtonStyle} activeOpacity = { .5 } onPress={()=>this.addIngredient()} >
                            <Text style={TextStyles.blackText}>Add Ingredient</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <View style={{width: '100%',  justifyContent: 'center',alignItems: 'center',paddingLeft:10,paddingRight:10,marginTop:10,marginBottom:20,}}>
                    <TouchableOpacity style={styles.ContinueButtonStyle} activeOpacity = { .5 }>
                        <Text style={TextStyles.whiteText}>Edit More Data</Text>
                    </TouchableOpacity>
                </View> */}

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
                {steps}
                
                <View  style={{ margin: 10,marginTop:0,}}>
                    <View style={{width: '100%',flex: 1, flexDirection: 'row'}}>
                        
                        <View style={{width: '100%',justifyContent: 'center',alignItems: 'center'}} >
                        <TouchableOpacity style={styles.AddStepButtonStyle} activeOpacity = { .5 } onPress={()=>this.addStep()}>
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
    addRecipe: PropTypes.func.isRequired,
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
    addRecipe:(Token,data) => dispatch(addRecipe(Token,data)),
    
  });


export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);