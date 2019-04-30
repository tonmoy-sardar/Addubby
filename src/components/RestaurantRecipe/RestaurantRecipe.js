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
import { Avatar } from 'react-native-elements';
//import { SearchBar } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import ShadowStyles from '../../helpers/ShadowStyles';

import Footer2 from '../common/Footer2';


import OptionsMenu from "react-native-options-menu";

import iconBookmark from './../../assets/icon_bookmark.png';
import iconLike from './../../assets/icon_like.png';
import iconComment from './../../assets/icon_comment.png';
import searchLogo from './../../assets/search_logo.png';

import iconAddCart from './../../assets/icon_add_cart.png';

import { getListRestaurantRecipes } from '../../actions/RecipeActions';

import ImageLoad from 'react-native-image-placeholder';

class RestaurantRecipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
        token: '',
        animating: true,
        recipeList:[]
    }
    
  }

  state = {
    search: '',
  };
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  componentDidMount()
  {
        if(this.props.user!=null)
		{
            console.log("1--")
            console.log('2--'+ JSON.stringify(this.props.user.data));

            this.state.token = this.props.user.data;
            this.setState({
                token: this.props.user.data
            }, () => {
                console.log('3--:'+ this.state.token);
                this.getListRestaurantRecipes(this.state.token).then(
                    res => {
                        console.log(res.data)
                        this.state.recipeList=res.data;
                        this.setState({
                            recipeList: res.data.data,
                            animating: false,
                            
                        }, () => {
                            console.log('ddddd3:'+ JSON.stringify(this.state.recipeList));
                        })
                    }
                );
            })
        }
        
    }

  getListRestaurantRecipes = () => this.props.getListRestaurantRecipes(this.state.token);

  getMessage = () => {
    const { user } = this.props;
    return `${strings.homeMessage} ${user && user.name}`;
  }

  GoToPage = (page) =>{
    this.props.navigation.navigate(page);
  }

  GoDetailspage = (id) =>{
    this.props.navigation.navigate('RestaurantDetails',{id: id});
  }

  DetailsView = () =>{
    console.log("RestaurantDetails")
  }

  updateSearch = search => {
    this.setState({ search });
  };

  onEnd = () =>{
    this.props.navigation.navigate('RestaurantSearch');
  }
  


render() {

const { search } = this.state;
const MoreIcon = require("./../../assets/option_menu.png");

const recipeItems = this.state.recipeList.map((item, i) =>
       
        <View style={[styles.card, ShadowStyles.shadow]} key={i}>
            <View style={{ width: '100%' ,borderTopRightRadius:10,borderTopLeftRadius:10, height:50, backgroundColor:'#d11c20', paddingLeft:10, paddingRight:10}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: '15%', height: 50, justifyContent: 'center'}} >
                     <Avatar small rounded  activeOpacity={0.7}   source={{ uri: item.userDetails.imageUrl}} />
                    </View>
                    <View style={{width: '55%', height: 50, justifyContent: 'center'}}>
                        <Text style={TextStyles.whiteText}>{item.userDetails.name}</Text>
                    </View>
                    <View style={{width: '20%', height: 50, justifyContent: 'center'}} >
                        <TouchableOpacity style={styles.FollowButtonStyle} activeOpacity = { .5 }>
                            <Text style={TextStyles.redText}> Follow </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '10%', height: 50,justifyContent: 'center'}} >
                        <OptionsMenu button={MoreIcon} buttonStyle={{ width: 10, height: 19,marginLeft: 15, resizeMode: "contain" }} destructiveIndex={1} options={["Details"]} actions={[this.DetailsView]}/>
                    </View>
                </View>
            </View>
            <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.GoDetailspage(item.id)}>
                <View style={{height: 200 }}>
                    <ImageLoad style={{ width: '100%', height: 200 }}  loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: item.imageUrl }}/>
                </View>
            </TouchableOpacity>
            <View style={{ width: '100%',paddingLeft:10, paddingRight:10, height:50, backgroundColor: 'rgba(24, 24, 24, 0.5)',position:'absolute',top:200}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: '70%', height: 50, justifyContent: 'center'}}>
                        <Image source={iconBookmark} style={{width: 44, height: 30}} ></Image>
                    </View>
                    <View style={{width: '15%', height: 50, justifyContent: 'center'}} >
                        <Image source={iconLike} style={{width: 32, height: 30}} ></Image>
                    </View>
                    <View style={{width: '15%', height: 50,justifyContent: 'center'}} >
                        <Image source={iconComment} style={{width: 34, height: 30}} ></Image>
                    </View>
                </View>
            </View>
            <View style={{ width: '100%',paddingLeft:10, paddingRight:10}}>
                <View style={{flex: 1}}>
                    <View style={{width: '100%',justifyContent: 'center', paddingBottom:30, paddingTop:10,}}>
                        <Text style={TextStyles.redTextTitle}>{item.name}</Text>
                        <Text style={TextStyles.grayText}>{item.description}</Text>
                        <Text style={TextStyles.redTextTitle}>Price : $ {item.price}</Text>
                    </View>
                    <View style={{width: '100%',position:'absolute',justifyContent: 'center', alignItems: 'center',bottom:-20}}>
                        <TouchableOpacity style={{width: 40, height: 40,}} onPress={()=>this.GoToPage('RestaurantShopping')}>
                            <Image source={iconAddCart} style={{width: 40, height: 40,}} ></Image>
                        </TouchableOpacity>
                    </View>
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
                        <Searchbar style = {styles.searchInput} placeholder="Ingredients name,dish" onChangeText={this.updateSearch} value={search} onEndEditing={this.onEnd}/>
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
                        Restaurant Recipe 
                        </Text>
                        {recipeItems}
                    </View>
                 )
                }
            </ScrollView>
            <Footer2 ></Footer2>
        </View>
        );
    }
}


RestaurantRecipe.propTypes = {
    getListRestaurantRecipes: PropTypes.func.isRequired,
    user: PropTypes.object,
};

RestaurantRecipe.defaultProps = {
    user: null,
};

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
    getListRestaurantRecipes: (Token) => dispatch(getListRestaurantRecipes(Token)),    
});


export default connect(mapStateToProps, mapDispatchToProps)(RestaurantRecipe);