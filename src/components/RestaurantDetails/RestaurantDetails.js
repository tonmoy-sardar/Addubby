import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Slideshow from 'react-native-slideshow';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import OptionsMenu from "react-native-options-menu";
import Footer2 from '../common/Footer2';

import iconBookmark from './../../assets/icon_bookmark.png';
import iconLike from './../../assets/icon_like.png';
import iconComment from './../../assets/icon_comment.png';
import btnAddCart from './../../assets/btn_add_to_cart.png';

import { getRestaurantRecipeDetails,bookmarkRecipe, unbookmarkRecipe,favoriteRecipe,unfavoriteRecipe } from '../../actions/RecipeActions';
import { getUserDetails } from '../../actions/UserActions';

class RestaurantDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            position: 1,
            interval: null,
            animating: true,
            token: '',
            id:'',
            detailsData: {},
            dataSource: [],
        };
    }

    static navigationOptions = {
        header: null,
        tabBarVisible: false,
    };


    componentDidMount()
    {

        this.setState({
            token: this.props.user.data,
            id:this.props.navigation.state.params.id,      
         }, () => {
                
                this.getRestaurantRecipeDetails(this.state.token,this.state.id).then(
                    res => {
                        var urlData = []
                        res.data.data.images.forEach(x => {
                            var d = {
                                url: x.imageUrl
                            }
                            urlData.push(d)
                        })
                        this.setState({
                            detailsData: res.data.data,
                            animating: false,
                            dataSource: urlData
                        }, () => {
                            console.log('ddddd1:'+ JSON.stringify(this.state.detailsData));
                            console.log('ddddd3:'+ JSON.stringify(this.state.dataSource));
                        })
                    }
                );
                this.getUserDetails().then(
                    res => {                      
                        this.setState({
                            userName: res.data.data.username
                            
                        }, () => {
                            
                        })
                    }
                );
            })
    }


    getRestaurantRecipeDetails = () => this.props.getRestaurantRecipeDetails(this.state.token,this.state.id);

    getUserDetails = () => this.props.getUserDetails(this.state.token);

    bookmarkRecipe = (data) => this.props.bookmarkRecipe(this.state.token, data);

    unbookmarkRecipe = (data) => this.props.unbookmarkRecipe(this.state.token, data);
    unfavoriteRecipe = (data) => this.props.unfavoriteRecipe(this.state.token, data);

    addBookmarkRecipe = (id) => {
        console.log(id)
        var data = {
            username: this.state.userName,
            recipeid: id
        }
        console.log(data)    
        this.bookmarkRecipe(data).then(
            res => {
                console.log("result"+ JSON.stringify(res.data))
            }
        )
    };

    removeBookmarkRecipe = (id) => {
        console.log(id)
        var data = {
            username: this.state.userName,
            recipeid: id
        }
        console.log(data)    
        this.unbookmarkRecipe(data).then(
            res => {
                console.log("result"+ JSON.stringify(res.data))
            }
        )
      };

    favoriteRecipe = (data) => this.props.favoriteRecipe(this.state.token, data);

    addFavoriteRecipe = (id) => {
        console.log(id)
        var data = {
            username: this.state.userName,
            recipeid: id
        }
        console.log(data)    
        this.favoriteRecipe(data).then(
            res => {
                console.log("result"+ JSON.stringify(res.data))
            }
        )
    };

    removeFavoriteRecipe = (id) => {
        console.log(id)
        var data = {
            username: this.state.userName,
            recipeid: id
        }
        console.log(data)    
        this.unfavoriteRecipe(data).then(
            res => {
                console.log("result"+ JSON.stringify(res.data))
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

    DetailsView = () =>{
    console.log("Details")
    }

    componentWillMount() {
        this.setState({
        interval: setInterval(() => {
            this.setState({
            position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
            });
            }, 4000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    getIngredients(){


        if(this.state.animating== false)
        {
            var ingredientItems = this.state.detailsData.ingredients.map((item, i) =>
            <View key={i}>
                <View style={{ paddingBottom:5}}>
                    <Text style={TextStyles.blackTextTitle}>{item.section}</Text>
                </View>
                <View style={{ paddingBottom:15}}>
                    <Text style={styles.grayText}>{item.ingredient.label}</Text>
                </View>
            </View>
            )
            return ingredientItems;
        }
        else{
            return null;
        }
        
    }

    getSteps(){
        if(this.state.animating== false)
        {
            var stepItems = this.state.detailsData.steps.map((item, i) =>
            <View style={[styles.stepContainer]} key={i}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: '12%', height:20, justifyContent: 'center', paddingTop:10}}>
                        <View  style={{width: '75%', paddingTop:8,paddingBottom:8,  justifyContent: 'center',backgroundColor:'#d11c21',borderTopRightRadius:3,borderBottomRightRadius:3,  alignItems: 'center', }}>
                            <Text style={styles.TextWhiteStyle}>{i+1}</Text>
                        </View>
                    </View>
                    <View style={{width: '88%', justifyContent: 'center'}}>
                        <Text style={styles.grayText}>{item.label}</Text>
                    </View>
                </View>
            </View>
            )
            return stepItems;
        }
        else{
            return null;
        }
        
    }

    render() {
        const MoreIcon = require("./../../assets/option_menu.png");
        return (
            <View style={{flex: 1}}>
                {
					this.state.animating== true && (
				<View style={[styles.activeContainer, TextStyles.horizontal]}>
					<ActivityIndicator size="large" color="#d11c21" animating={this.state.animating} />
				</View>
					)
                }
                {
					this.state.animating== false && (

                
			<View style={{flex: 1}}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.container}>
                    <Slideshow dataSource={this.state.dataSource} position={this.state.position} onPositionChanged={position => this.setState({ position })} />
                    <View style={{ width: '100%',paddingLeft:10, paddingRight:10, height:50, backgroundColor: 'rgba(24, 24, 24, 0.5)',position:'absolute',top:0}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '70%', height: 50, justifyContent: 'center'}}>
                                {
                                this.state.detailsData.isBookmarked== false && (
                                    <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.addBookmarkRecipe(this.state.detailsData.id)}>
                                    <Image source={iconBookmark} style={{width: 44, height: 30}} ></Image>
                                    </TouchableOpacity>
                                    )
                                }
                                {
                                this.state.detailsData.isBookmarked== true && (
                                    <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.removeBookmarkRecipe(this.state.detailsData.id)}>
                                    <Image source={iconBookmark} style={{width: 44, height: 30}} ></Image>
                                    </TouchableOpacity>
                                )
                                }
                            </View>
                            <View style={{width: '15%', height: 50, justifyContent: 'center'}} >
                                {
                                this.state.detailsData.isFavorite== false && (
                                    <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.addFavoriteRecipe(this.state.detailsData.id)}>
                                    <Image source={iconLike} style={{width: 32, height: 30}} ></Image>
                                    </TouchableOpacity>
                                    )
                                }
                                {
                                this.state.detailsData.isFavorite== true && (
                                    <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.removeFavoriteRecipe(this.state.detailsData.id)}>
                                    <Image source={iconLike} style={{width: 32, height: 30}} ></Image>
                                    </TouchableOpacity>
                                )
                                }
                            </View>
                            <View style={{width: '15%', height: 50,justifyContent: 'center'}} >
                                <Image source={iconComment} style={{width: 34, height: 30}} ></Image>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%',paddingLeft:30, paddingRight:30, paddingTop:20}}>
                    <View style={{ paddingBottom:5}}>
                        <Text style={TextStyles.redTextTitle}>{this.state.detailsData.name}</Text>
                    </View>
                    <Text style={styles.grayText}>{this.state.detailsData.description}</Text>
                </View>
                <View style={{ width: '100%',paddingLeft:10, paddingRight:10, paddingTop:20}}>
                    <View style={{ width: '100%' ,borderRadius:10, height:50, backgroundColor:'#d11c20', paddingLeft:10, paddingRight:10}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '15%', height: 50, justifyContent: 'center'}} >
                                <Avatar rounded icon={{ name: 'user',type: 'font-awesome' }}  />
                            </View>
                            <View style={{width: '55%', height: 50, justifyContent: 'center'}}>
                                <Text style={TextStyles.whiteText}>{this.state.detailsData.name}</Text>
                            </View>
                            <View style={{width: '20%', height: 50, justifyContent: 'center'}} >
                                <TouchableOpacity style={styles.FollowButtonStyle} activeOpacity = { .5 }>
                                    <Text style={TextStyles.redText}> Follow </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width: '10%', height: 50,justifyContent: 'center'}} >
                                <OptionsMenu button={MoreIcon} buttonStyle={{ width: 10, height: 19, marginLeft: 15, resizeMode: "contain" }} destructiveIndex={1} options={["Details"]} actions={[this.DetailsView]}/>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%',paddingLeft:10, paddingRight:10, paddingTop:20}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{ width: '50%', paddingLeft:20,paddingTop:10}}>
                            <Text style={TextStyles.redTextTitle}>Price : $ {this.state.detailsData.price}</Text>
                        </View>
                        <View style={{width: '50%',  justifyContent: 'center',alignItems: 'flex-end'}} >
                            <TouchableOpacity onPress={()=>this.GoToPage('RestaurantShopping')}>
                                <Image source={btnAddCart} style={{width: 117, height: 30}} ></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%',paddingLeft:10, paddingRight:10,}}>
                    <View style={{ paddingLeft:20,paddingTop:30}}>
                        <Text style={TextStyles.redTextTitle}>INGREDIENTS</Text>
                    </View>
                    <View style={[styles.cardContainer ]}>
                        {this.getIngredients()}
                    </View>
                </View>
                <View style={{ width: '100%',paddingLeft:10, paddingRight:10, paddingTop:20}}>
                    {this.state.detailsData.steps.length>0 && (
                    <View style={{ paddingLeft:20}}>
                        <Text style={TextStyles.redTextTitle}>Steps</Text>
                    </View>
                    )}
                    {this.getSteps()}
                    
                    {this.state.detailsData.isAllowComment==true && (
                    <View style={{ width: '100%', paddingRight:10, paddingTop:20,paddingBottom:40}}>
                        <View style={{ paddingLeft:30,paddingBottom:10}}>
                            <Text style={TextStyles.redTextTitle}>Comments</Text>
                        </View>
                        <View style={{width: '100%', height: 50, justifyContent: 'center'}}>
                            <TextInput style = {styles.searchInput}  placeholder = "Main ingredient.." />
                        </View>
                    </View> 
                     )}
                </View>
            </ScrollView>
            <Footer2 ></Footer2>
        </View>
            )
            }
        </View> 
        );
    }
}



RestaurantDetails.propTypes = {
    getRestaurantRecipeDetails: PropTypes.func.isRequired,
    getUserDetails: PropTypes.func.isRequired,
    bookmarkRecipe: PropTypes.func.isRequired,
    unbookmarkRecipe:PropTypes.func.isRequired,
    favoriteRecipe: PropTypes.func.isRequired,
    unfavoriteRecipe:PropTypes.func.isRequired,
    user: PropTypes.object,
};

RestaurantDetails.defaultProps = {
    user: null,
};

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
    getRestaurantRecipeDetails: (Token,id) => dispatch(getRestaurantRecipeDetails(Token,id)), 
    getUserDetails: (Token) => dispatch(getUserDetails(Token)),
    bookmarkRecipe: (Token,data) => dispatch(bookmarkRecipe(Token,data)),
    unbookmarkRecipe: (Token,data) => dispatch(unbookmarkRecipe(Token,data)),
    favoriteRecipe: (Token,data) => dispatch(favoriteRecipe(Token,data)),
    unfavoriteRecipe: (Token,data) => dispatch(unfavoriteRecipe(Token,data)),    
});


export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetails);