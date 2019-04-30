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

import { getRestaurantRecipeDetails } from '../../actions/RecipeActions';

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
            })
    }


    getRestaurantRecipeDetails = () => this.props.getRestaurantRecipeDetails(this.state.token,this.state.id);

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
});


export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetails);