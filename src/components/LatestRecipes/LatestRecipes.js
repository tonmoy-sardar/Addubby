import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import ShadowStyles from '../../helpers/ShadowStyles';
import Footer from '../common/Footer';
import OptionsMenu from "react-native-options-menu";

//import iconBookmark from './../../assets/icon_bookmark.png';
//import iconBookmarkActive from './../../assets/icon_bookmark_active.png';
import iconBookmark from './../../assets/tag.png';
import iconBookmarkActive from './../../assets/tag_active.png';
//import iconLike from './../../assets/icon_like.png';
//import iconLikeActive from './../../assets/icon_like_active.png';

import iconLike from './../../assets/heart.png';
import iconLikeActive from './../../assets/heart_active.png';
import iconComment from './../../assets/conversation.png';
import iconCommentActive from './../../assets/conversation_active.png';
import searchLogo from './../../assets/search_logo.png';


import { getListRecipes, getUserBookmarkRecipeList, bookmarkRecipe, unbookmarkRecipe,favoriteRecipe,unfavoriteRecipe,getUserFavoriteRecipeList }from '../../actions/RecipeActions';

import { getUserDetails } from '../../actions/UserActions';

import ImageLoad from 'react-native-image-placeholder';


class LatestRecipes extends Component {

  constructor(props) {
    super(props);
    this.state = {
        token: '',
        search:'',
        animating: true,
        recipeList:[],
        userName: ''
    }
  }
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  state = {
    search: '',
  };


  componentDidMount()
  {
        if(this.props.user!=null)
		{

            this.state.token = this.props.user.data;
            this.setState({
                token: this.props.user.data
            }, () => {
                this.getListRecipes().then(
                    res => {

                        this.state.recipeList=res.data;
                        this.setState({
                            recipeList: res.data.data,
                            animating: false,
                            
                        }, () => {

                        })
                    }
                );
                // user details
                this.getUserDetails().then(
                    res => {                      
                        this.setState({
                            userName: res.data.data.username
                            
                        }, () => {
                            this.getUserBookmarkRecipeList(this.state.userName).then(
                                res => {

                                }
                            )
                        })
                    }
                );
            })

        }
        
    }

  getListRecipes = () => this.props.getListRecipes(this.state.token);

  getUserDetails = () => this.props.getUserDetails(this.state.token);

  getUserBookmarkRecipeList = (userName) => this.props.getUserBookmarkRecipeList(this.state.token, userName);

  bookmarkRecipe = (data) => this.props.bookmarkRecipe(this.state.token, data);
  unbookmarkRecipe = (data) => this.props.unbookmarkRecipe(this.state.token, data);
  unfavoriteRecipe = (data) => this.props.unfavoriteRecipe(this.state.token, data);
  
  
  addBookmarkRecipe = (id) => {

    var data = {
        username: this.state.userName,
        recipeid: id
    }
  
    this.bookmarkRecipe(data).then(
        res => {

            var index = this.state.recipeList.findIndex(x => x.id == id)
            if(index != -1){
                let values = [...this.state.recipeList]
                values[index]['isBookmarked'] = true
                this.setState({
                    recipeList: values
                })
            }
        }
    )
  };

  removeBookmarkRecipe = (id) => {

    var data = {
        username: this.state.userName,
        recipeid: id
    }

    this.unbookmarkRecipe(data).then(
        res => {

            var index = this.state.recipeList.findIndex(x => x.id == id)
            if(index != -1){
                let values = [...this.state.recipeList]
                values[index]['isBookmarked'] = false
                this.setState({
                    recipeList: values
                })
            }
        }
    )
  };


  favoriteRecipe = (data) => this.props.favoriteRecipe(this.state.token, data);

  addFavoriteRecipe = (id) => {

    var data = {
        username: this.state.userName,
        recipeid: id
    }
    
    this.favoriteRecipe(data).then(
        res => {

            var index = this.state.recipeList.findIndex(x => x.id == id)
            if(index != -1){
                let values = [...this.state.recipeList]
                values[index]['isFavorite'] = true
                this.setState({
                    recipeList: values
                })
            }
        }
    )
  };

  removeFavoriteRecipe = (id) => {

    var data = {
        username: this.state.userName,
        recipeid: id
    }
  
    this.unfavoriteRecipe(data).then(
        res => {

            var index = this.state.recipeList.findIndex(x => x.id == id)
            if(index != -1){
                let values = [...this.state.recipeList]
                values[index]['isFavorite'] = false
                this.setState({
                    recipeList: values
                })
            }
        }
    )
  };



  getMessage = () => {
    const { user } = this.props;
    return `${strings.homeMessage} ${user && user.name}`;
  }

  GoToPage = (page) =>{
    this.props.navigation.navigate(page);
  }

  GoDetailspage = (id) =>{

    this.props.navigation.navigate('RecipeDetails',{id: id});
  }

  DetailsView = (id) =>{

    this.props.navigation.navigate('RecipeDetails',{id: id});
  }

  DetailsUserProfile = (userName) =>{

    this.props.navigation.navigate('UserProfile',{userName: userName});
  }

  updateSearch = search => {
    this.setState({ search:search });
  };

  onEnd = () =>{
    this.props.navigation.navigate('RestaurantSearch',{name: this.state.search});
  }

  render() {
    const { search } = this.state;
    const MoreIcon = require("./../../assets/option_menu.png");

    const recipeItems = this.state.recipeList.map((item, i) =>
       
        <View style={[styles.card, ShadowStyles.shadow]} key={i}>
            <View style={{ width: '100%' ,borderTopRightRadius:10,borderTopLeftRadius:10, height:50, backgroundColor:'#d11c20', paddingLeft:10, paddingRight:10}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: '15%', height: 50, justifyContent: 'center'}} >
                        {/* <Avatar rounded icon={{ name: 'user',type: 'font-awesome' }}  /> */}
                        <TouchableOpacity activeOpacity = { .5 } onPress={()=>this.DetailsUserProfile(item.userDetails.name)}>
                        <Avatar small rounded  activeOpacity={0.7}   source={{ uri: item.userDetails.imageUrl}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '55%', height: 50, justifyContent: 'center'}}>
                        <TouchableOpacity  activeOpacity = { .5 } onPress={()=>this.DetailsUserProfile(item.userDetails.name)}>
                        <Text style={TextStyles.whiteText}>{item.userDetails.name}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '20%', height: 50, justifyContent: 'center'}} >
                        <TouchableOpacity style={styles.FollowButtonStyle} activeOpacity = { .5 }>
                            <Text style={TextStyles.redText}> Follow </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '10%', height: 50,justifyContent: 'center'}} >
                        <OptionsMenu button={MoreIcon} buttonStyle={{ width: 10, height: 19,marginLeft: 15, resizeMode: "contain" }} destructiveIndex={1} options={["Details"]} actions={[this.DetailsView.bind(this,item.id)]}/>
                    </View>
                </View>
            </View>
            <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.GoDetailspage(item.id)}>
                <View style={{height: 200 }}>
                    {/* <Image source={recipeImage} style={{width: '100%', height: 200}} resizeMode="cover"></Image> */}
                    <ImageLoad style={{ width: '100%', height: 200 }}  loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: item.imageUrl }}/>
                </View>
            </TouchableOpacity>
            <View style={{ width: '100%',paddingLeft:10, paddingRight:10, height:50, backgroundColor: 'rgba(24, 24, 24, 0.5)',position:'absolute',top:200}}>
                <View style={{flex: 1, flexDirection: 'row'}}>                   
                    <View style={{width: '70%', height: 50, justifyContent: 'center'}}>
                        {
                        item.isBookmarked== false && (
                            <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.addBookmarkRecipe(item.id)}>
                            <Image source={iconBookmark} style={{width: 32, height: 32}} ></Image>
                            </TouchableOpacity>
                            )
                        }
                        {
                        item.isBookmarked== true && (
                            <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.removeBookmarkRecipe(item.id)}>
                            <Image source={iconBookmarkActive} style={{width: 32, height: 32}} ></Image>
                            </TouchableOpacity>
                         )
                        }
                    </View>                    
                    <View style={{width: '15%', height: 50, justifyContent: 'center'}} >
                        {
                        item.isFavorite== false && (
                            <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.addFavoriteRecipe(item.id)}>
                            <Image source={iconLike} style={{width: 32, height: 32}} ></Image>
                            </TouchableOpacity>
                            )
                        }
                        {
                        item.isFavorite== true && (
                            <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.removeFavoriteRecipe(item.id)}>
                            <Image source={iconLikeActive} style={{width: 32, height: 32}} ></Image>
                            </TouchableOpacity>
                         )
                        }
                        
                    </View>
                    <View style={{width: '15%', height: 50,justifyContent: 'center'}} >
                        <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.GoToPage('Chat')}>
                        <Image source={iconComment} style={{width: 32, height: 32}} ></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ width: '100%',paddingLeft:10, paddingRight:10}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.GoDetailspage(item.id)}>
                    <View style={{width: '80%',paddingTop:10,justifyContent: 'center'}}>
                        <Text style={TextStyles.redTextTitle}>{item.name}</Text>
                        <Text style={TextStyles.grayText}>{item.description}  # Lunch</Text>
                    </View>
                    <View style={{width: '20%', height: 50, justifyContent: 'center'}} >
                        <Text style={TextStyles.grayText}>3 Min Ago</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    return (
            <View style={{flex: 1}}>
                <View style={{ width: '100%' ,backgroundColor:'#f8f8f8', height:50,paddingLeft:10, paddingRight:10,}}>
                    <View style={{ flex: 1 ,flexDirection: 'row',justifyContent: 'center'}} >
                        <View style={{width: '15%', justifyContent: 'center'}} >
                            <Image source={searchLogo} style={{width: 38, height: 40}} ></Image>
                        </View>
                        <View style={{width: '85%', justifyContent: 'center'}} >
                            <Searchbar style = {styles.searchInput} placeholder="Ingredients name,dish" onChangeText={this.updateSearch} value={this.state.search} onEndEditing={this.onEnd}/>
                            {/* <TextInput style = {styles.searchInput}  placeholder = "Ingredients name,dish" /> */}
                        </View>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {
                        this.state.animating== true && (
                    <View style={[styles.activeContainer, TextStyles.horizontal]}>
                        <ActivityIndicator size="large" color="#d11c21" animating={this.state.animating} />
                    </View>
                        )
                    }
                    {
                        this.state.animating== false && (
                        <View style={{ flex: 1 }} underlayColor='white'>
                            
                            <Text style={TextStyles.blackTextHeading}>
                            Latest Recipes 
                            </Text>
                            {recipeItems}
                        </View>
                     )
                    }
                </ScrollView>
                <Footer ></Footer>
            </View>

            );
        }
    }


LatestRecipes.propTypes = {
    getListRecipes: PropTypes.func.isRequired,
    getUserDetails: PropTypes.func.isRequired,
    getUserBookmarkRecipeList: PropTypes.func.isRequired,
    bookmarkRecipe: PropTypes.func.isRequired,
    unbookmarkRecipe:PropTypes.func.isRequired,
    favoriteRecipe: PropTypes.func.isRequired,
    unfavoriteRecipe:PropTypes.func.isRequired,
    user: PropTypes.object,
};

LatestRecipes.defaultProps = {
    user: null,
};

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
    getListRecipes: (Token) => dispatch(getListRecipes(Token)),
    getUserDetails: (Token) => dispatch(getUserDetails(Token)),
    getUserBookmarkRecipeList: (Token,userName) => dispatch(getUserBookmarkRecipeList(Token,userName)),
    bookmarkRecipe: (Token,data) => dispatch(bookmarkRecipe(Token,data)),
    unbookmarkRecipe: (Token,data) => dispatch(unbookmarkRecipe(Token,data)),
    favoriteRecipe: (Token,data) => dispatch(favoriteRecipe(Token,data)),
    unfavoriteRecipe: (Token,data) => dispatch(unfavoriteRecipe(Token,data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LatestRecipes);