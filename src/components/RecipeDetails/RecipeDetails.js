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

import iconBookmark from './../../assets/icon_bookmark.png';
import iconLike from './../../assets/icon_like.png';
import iconComment from './../../assets/icon_comment.png';
import btnAddCart from './../../assets/btn_add_to_cart.png';

import { getRecipeDetails } from '../../actions/RecipeActions';


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
                            console.log('ddddd1:'+ JSON.stringify(this.state.detailsData));
                            console.log('ddddd3:'+ JSON.stringify(this.state.dataSource));
                        })
                    }
                );
            })
    }


    getRecipeDetails = () => this.props.getRecipeDetails(this.state.token,this.state.id);

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

        // const ingredientItems = this.state.detailsData.ingredients.map((item, i) =>
        //     <View >
        //         <View style={{ paddingBottom:5}}>
        //             <Text style={TextStyles.blackTextTitle}>{item.section}</Text>
        //         </View>
        //         <View style={{ paddingBottom:15}}>
        //             <Text style={styles.grayText}>{item.ingredient.label}</Text>
        //         </View>
        //     </View>
        // )
        
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
});


export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);