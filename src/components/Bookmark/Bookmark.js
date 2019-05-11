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

import PropTypes from 'prop-types';
import { Searchbar } from 'react-native-paper';
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
import ImageLoad from 'react-native-image-placeholder';

import { getUserBookmarkRecipeList,searchInBookmarks} from '../../actions/RecipeActions';
import { getUserDetails } from '../../actions/UserActions';

class Bookmark extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            search:'',
            animating: true,
            bookmarkList:[],
            userName: ''
        }
    }

    static navigationOptions = {
        header: null,
        tabBarVisible: false,
    };

    // state = {
    //     search: '',
    // };


    componentDidMount()
  {
        if(this.props.user!=null)
		{

            this.state.token = this.props.user.data;
            this.setState({
                token: this.props.user.data
            }, () => {
                
                this.getUserDetails().then(
                    res => {                      
                        this.setState({
                            userName: res.data.data.username
                            
                        }, () => {
                            this.getUserBookmarkRecipeList(this.state.userName).then(
                                res => {

                                    this.state.bookmarkList=res.data;
                                    this.setState({
                                        bookmarkList: res.data.data,
                                        animating: false,
                                        
                                    }, () => {
                                    })
                                }
                            )
                        })
                    }
                );
            })

        }
        
    }

  

  getUserDetails = () => this.props.getUserDetails(this.state.token);

  getUserBookmarkRecipeList = (userName) => this.props.getUserBookmarkRecipeList(this.state.token, userName);
  searchInBookmarks = (data) => this.props.searchInBookmarks(this.state.token, data);
  
  searchBookmarks = (name) => {

    var data = {
        username: this.state.userName,
        name: name
    }

    this.searchInBookmarks(data).then(
        res => {

            this.state.bookmarkList=res.data;
            this.setState({
                bookmarkList: res.data.data,
            }, () => {

            })
        }
    )
  };

  GoDetailspage = (id) =>{

    this.props.navigation.navigate('RecipeDetails',{id: id});
  }

    toggleStatus = () =>{
    //this.state.textBoxShow = true;
    }

    updateSearch = search => {
        this.setState({ search:search });
    };
    onEnd = () =>{
        this.searchBookmarks(this.state.search)
        //this.props.navigation.navigate('RestaurantSearch');
    }



render() {
    //const { search } = this.state;
    const bookmarkItems = this.state.bookmarkList.map((item, i) =>

    <View style={[styles.cardContainer]}  key={i}>
        <View style={{ width: '100%'}}>
            <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.GoDetailspage(item.id)}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                
                <View style={{width: '30%', justifyContent: 'center'}} >
                    
                    {/* <Image source={bookmarkImage} style={{width: '100%', height: 100,borderTopLeftRadius:10,borderBottomLeftRadius:10,}} ></Image> */}
                    <ImageLoad style={{width: '100%', height: 100}}  loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: item.imageUrl }}/>
                   
                </View>
                <View style={{width: '70%', padding:20}}>
                    <Text style={TextStyles.redTextTitle}>{item.name}</Text>
                    <Text style={TextStyles.grayText}>{item.description}</Text>
                </View>
                
            </View>
            </TouchableOpacity>
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
                    <Searchbar style = {styles.searchInput} placeholder="Bookmark" onChangeText={this.updateSearch} value={this.state.search} onEndEditing={this.onEnd}/>
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
                        
                        {bookmarkItems}
                    </View>
                    )
                }
                
            </ScrollView>
            <Footer ></Footer>
        </View>
        );
    }
}



Bookmark.propTypes = {
   
    getUserDetails: PropTypes.func.isRequired,
    getUserBookmarkRecipeList: PropTypes.func.isRequired,
    searchInBookmarks: PropTypes.func.isRequired,
    user: PropTypes.object,
};

Bookmark.defaultProps = {
    user: null,
};

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
    getUserDetails: (Token) => dispatch(getUserDetails(Token)),
    getUserBookmarkRecipeList: (Token,userName) => dispatch(getUserBookmarkRecipeList(Token,userName)),
    searchInBookmarks: (Token,data) => dispatch(searchInBookmarks(Token,data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);