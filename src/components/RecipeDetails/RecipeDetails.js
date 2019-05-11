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
import Footer from '../common/Footer';

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
import btnAddCart from './../../assets/btn_add_to_cart.png';

import { getRecipeDetails,bookmarkRecipe, unbookmarkRecipe,favoriteRecipe,unfavoriteRecipe } from '../../actions/RecipeActions';
import { getUserDetails } from '../../actions/UserActions';

class RecipeDetails extends Component {

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
                
                this.getRecipeDetails(this.state.token,this.state.id).then(
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


    getRecipeDetails = () => this.props.getRecipeDetails(this.state.token,this.state.id);

    getUserDetails = () => this.props.getUserDetails(this.state.token);

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
 
                let values = {...this.state.detailsData}
                values['isBookmarked'] = true
                this.setState({
                    detailsData: values
                })
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
                let values = {...this.state.detailsData}
                values['isBookmarked'] = false
                this.setState({
                    detailsData: values
                })
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
                let values = {...this.state.detailsData}
                values['isFavorite'] = true
                this.setState({
                    detailsData: values
                })
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

                let values = {...this.state.detailsData}
                values['isFavorite'] = false
                this.setState({
                    detailsData: values
                })
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

    componentWillUnmount() {
        clearInterval(this.state.interval);
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
                                    <Image source={iconBookmark} style={{width: 32, height: 32}} ></Image>
                                    </TouchableOpacity>
                                    )
                                }
                                {
                                this.state.detailsData.isBookmarked== true && (
                                    <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.removeBookmarkRecipe(this.state.detailsData.id)}>
                                    <Image source={iconBookmarkActive} style={{width: 32, height: 32}} ></Image>
                                    </TouchableOpacity>
                                )
                                }
                                
                            </View>
                            <View style={{width: '15%', height: 50, justifyContent: 'center'}} >
                                
                                {
                                this.state.detailsData.isFavorite== false && (
                                    <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.addFavoriteRecipe(this.state.detailsData.id)}>
                                    <Image source={iconLike} style={{width: 32, height: 32}} ></Image>
                                    </TouchableOpacity>
                                    )
                                }
                                {
                                this.state.detailsData.isFavorite== true && (
                                    <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.removeFavoriteRecipe(this.state.detailsData.id)}>
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
                </View>
                <View style={{ width: '100%',paddingLeft:30, paddingRight:30, paddingTop:20}}>
                    <View style={{ paddingBottom:5}}>
                        <Text style={TextStyles.redTextTitle}>{this.state.detailsData.name}</Text>
                    </View>
                    <Text style={styles.grayText}>{this.state.detailsData.description}</Text>
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
            <Footer ></Footer>
            </View>
               )
            }
        </View> 
        );
    }
}

RecipeDetails.propTypes = {
    getRecipeDetails: PropTypes.func.isRequired,
    getUserDetails: PropTypes.func.isRequired,
    bookmarkRecipe: PropTypes.func.isRequired,
    unbookmarkRecipe:PropTypes.func.isRequired,
    favoriteRecipe: PropTypes.func.isRequired,
    unfavoriteRecipe:PropTypes.func.isRequired,
    user: PropTypes.object,
};

RecipeDetails.defaultProps = {
    user: null,
};

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
    getRecipeDetails: (Token,id) => dispatch(getRecipeDetails(Token,id)),
    getUserDetails: (Token) => dispatch(getUserDetails(Token)),
    bookmarkRecipe: (Token,data) => dispatch(bookmarkRecipe(Token,data)),
    unbookmarkRecipe: (Token,data) => dispatch(unbookmarkRecipe(Token,data)),
    favoriteRecipe: (Token,data) => dispatch(favoriteRecipe(Token,data)),
    unfavoriteRecipe: (Token,data) => dispatch(unfavoriteRecipe(Token,data)),    
});


export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);