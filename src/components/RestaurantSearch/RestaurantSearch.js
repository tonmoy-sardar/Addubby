import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';

import { Avatar } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import OptionsMenu from "react-native-options-menu";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import Footer from '../common/Footer';


import bookmarkImage from './../../assets/bookmark.png';
import bookmark1Image from './../../assets/bookmark1.png';
import bookmark2Image from './../../assets/bookmark2.png';

import searchLogo from './../../assets/search_logo.png';

import { searchRecipe }from '../../actions/RecipeActions';

import { getUserDetails } from '../../actions/UserActions';
import ImageLoad from 'react-native-image-placeholder';

class RestaurantSearch extends Component {

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
            console.log("1--")
            console.log('2--'+ JSON.stringify(this.props.user.data));

            this.state.token = this.props.user.data;
            this.setState({
                token: this.props.user.data,
                search:this.props.navigation.state.params.name,  
            }, () => {
                this.searchRecipe().then(
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
                // user details
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
        
    }

    searchRecipe = () => this.props.searchRecipe(this.state.token,this.state.search);
    getUserDetails = () => this.props.getUserDetails(this.state.token);

    getMessage = () => {
        const { user } = this.props;
        return `${strings.homeMessage} ${user && user.name}`;
    }

    GoToPage = (page) =>{
        this.props.navigation.navigate(page);
    }

    updateSearch = search => {
        this.setState({ search:search });
    };
    onEnd = () =>{
        this.searchRecipe(this.state.search)
        //this.props.navigation.navigate('RestaurantSearch');
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

    DetailsView = () =>{
        console.log("Details")
    }

    GoDetailspage = (id) =>{
        console.log(id);
      this.props.navigation.navigate('RecipeDetails',{id: id});
    }


    render() {
        const { search } = this.state;
        const MoreIcon = require("./../../assets/option_menu_black.png");
        const recipeItems = this.state.recipeList.map((item, i) =>

            <View style={[styles.cardContainer]} key={i}>
                <View style={{ width: '100%'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '30%', justifyContent: 'center'}} >
                            <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.GoDetailspage(item.id)}>
                            <ImageLoad style={{width: '100%', height: 100}}  loadingStyle={{ size: 'large', color: 'blue' }}
                            source={{ uri: item.imageUrl }}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '70%', padding:20}}>
                            <Text style={TextStyles.redTextTitle}>{item.name}</Text>
                            <Text style={TextStyles.grayText}>{item.description}</Text>
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
                        <Searchbar style = {styles.searchInput} placeholder="Search" onChangeText={this.updateSearch} value={this.state.search} onEndEditing={this.onEnd}/>
                            {/* <TextInput style = {styles.searchInput}  placeholder = "Search" /> */}
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

    RestaurantSearch.propTypes = {
        searchRecipe: PropTypes.func.isRequired,
        getUserDetails: PropTypes.func.isRequired,
        user: PropTypes.object,
    };

    RestaurantSearch.defaultProps = {
        user: null,
    };

    const mapStateToProps = state => ({
        user: getUser(state),
    });

    const mapDispatchToProps = dispatch => ({
        searchRecipe: (Token,name) => dispatch(searchRecipe(Token,name)),
        getUserDetails: (Token) => dispatch(getUserDetails(Token)),
        
    });
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSearch);