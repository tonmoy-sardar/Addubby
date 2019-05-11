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

import searchLogo from './../../assets/search_logo.png';
import ImageLoad from 'react-native-image-placeholder';

import { getUserFavoriteRecipeList } from '../../actions/RecipeActions';
import { getUserDetails } from '../../actions/UserActions';

class Favorite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            animating: true,
            favoriteList:[],
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
                
                this.getUserDetails().then(
                    res => {                      
                        this.setState({
                            userName: res.data.data.username
                            
                        }, () => {
                            this.getUserFavoriteRecipeList(this.state.userName).then(
                                res => {

                                    this.state.favoriteList=res.data;
                                    this.setState({
                                        favoriteList: res.data.data,
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

  getUserFavoriteRecipeList = (userName) => this.props.getUserFavoriteRecipeList(this.state.token, userName);

  

  GoDetailspage = (id) =>{
 
    this.props.navigation.navigate('RecipeDetails',{id: id});
  }

   

    toggleStatus = () =>{
    //this.state.textBoxShow = true;
    }

    updateSearch = search => {
        this.setState({ search });
    };
    onEnd = () =>{
    this.props.navigation.navigate('RestaurantSearch');
    }



render() {
    const { search } = this.state;
    const favoriteItems = this.state.favoriteList.map((item, i) =>

    <View style={[styles.cardContainer]}  key={i}>
        <View style={{ width: '100%'}}>
        <TouchableOpacity activeOpacity = { .5 } style={{width: '100%'}} onPress={()=>this.GoDetailspage(item.id)}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: '30%', justifyContent: 'center'}} >
                    
                    
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
                    <Searchbar style = {styles.searchInput} placeholder="Favorite" onChangeText={this.updateSearch} value={search}/>
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
                        
                        {favoriteItems}
                    </View>
                    )
                }
                
            </ScrollView>
            <Footer ></Footer>
        </View>
        );
    }
}



Favorite.propTypes = {
   
    getUserDetails: PropTypes.func.isRequired,
    getUserFavoriteRecipeList: PropTypes.func.isRequired,
    user: PropTypes.object,
};

Favorite.defaultProps = {
    user: null,
};

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
    getUserDetails: (Token) => dispatch(getUserDetails(Token)),
    getUserFavoriteRecipeList: (Token,userName) => dispatch(getUserFavoriteRecipeList(Token,userName)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);