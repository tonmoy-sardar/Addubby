import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
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

class RestaurantSearch extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null,
        tabBarVisible: false,
    };

    state = {
        search: '',
    };

    getMessage = () => {
        const { user } = this.props;
        return `${strings.homeMessage} ${user && user.name}`;
    }

    GoToPage = (page) =>{
        this.props.navigation.navigate(page);
    }

    updateSearch = search => {
        this.setState({ search });
    };

    onEnd = () =>{
    this.props.navigation.navigate('RestaurantSearch');
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


    render() {
        const { search } = this.state;
        const MoreIcon = require("./../../assets/option_menu_black.png");
        return (
            <View style={{flex: 1}}>
                <View style={{ width: '100%' ,backgroundColor:'#f8f8f8', height:50,paddingLeft:10, paddingRight:10,}}>
                    <View style={{ flex: 1 ,flexDirection: 'row',justifyContent: 'center'}} >
                        <View style={{width: '15%', justifyContent: 'center'}} >
                            <Image source={searchLogo} style={{width: 38, height: 40}} ></Image>
                        </View>
                        <View style={{width: '85%', justifyContent: 'center'}} >
                        <Searchbar style = {styles.searchInput} placeholder="Search" onChangeText={this.updateSearch} value={search}/>
                            {/* <TextInput style = {styles.searchInput}  placeholder = "Search" /> */}
                        </View>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={{ width: '100%' , paddingLeft:20, paddingRight:20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '15%', height: 50, justifyContent: 'center'}} >
                                <Avatar rounded icon={{ name: 'user',type: 'font-awesome' }}  />
                            </View>
                            <View style={{width: '75%', height: 50, justifyContent: 'center'}}>
                                <Text style={TextStyles.blackText}>Japanese Restaurant</Text>
                            </View>
                            
                            <View style={{width: '10%', height: 50,justifyContent: 'center'}} >
                                <OptionsMenu button={MoreIcon} buttonStyle={{ width: 10, height: 19,marginLeft: 15, resizeMode: "contain" }} destructiveIndex={1} options={["Details"]} actions={[this.DetailsView]}/>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.cardContainer]} >
                        <View style={{ width: '100%'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: '30%', justifyContent: 'center'}} >
                                    <Image source={bookmarkImage} style={{width: '100%', height: 100,borderTopLeftRadius:10,borderBottomLeftRadius:10,}} ></Image>
                                </View>
                                <View style={{width: '70%', padding:20}}>
                                    <Text style={TextStyles.redTextTitle}>Beef Steak</Text>
                                    <Text style={TextStyles.grayText}>Classic Lightly mix 6 ounces ground beef....</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.cardContainer]} >
                        <View style={{ width: '100%'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: '30%', justifyContent: 'center'}} >
                                    <Image source={bookmark2Image} style={{width: '100%', height: 100,borderTopLeftRadius:10,borderBottomLeftRadius:10,}} ></Image>
                                </View>
                                <View style={{width: '70%', padding:20}}>
                                    <Text style={TextStyles.redTextTitle}>Veg Burger</Text>
                                    <Text style={TextStyles.grayText}>Cheese Make Classic Burger...</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.cardContainer]} >
                        <View style={{ width: '100%'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: '30%', justifyContent: 'center'}} >
                                    <Image source={bookmark1Image} style={{width: '100%', height: 100,borderTopLeftRadius:10,borderBottomLeftRadius:10,}} ></Image>
                                </View>
                                <View style={{width: '70%', padding:20}}>
                                    <Text style={TextStyles.redTextTitle}>Lasguna mutton</Text>
                                    <Text style={TextStyles.grayText}>Caramelized Onion Cook 2 sliced red....</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.cardContainer]} >
                        <View style={{ width: '100%'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: '30%', justifyContent: 'center'}} >
                                    <Image source={bookmarkImage} style={{width: '100%', height: 100,borderTopLeftRadius:10,borderBottomLeftRadius:10,}} ></Image>
                                </View>
                                <View style={{width: '70%', padding:20}}>
                                    <Text style={TextStyles.redTextTitle}>Beef Steak</Text>
                                    <Text style={TextStyles.grayText}>Classic Lightly mix 6 ounces ground beef....</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.cardContainer]} >
                        <View style={{ width: '100%'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: '30%', justifyContent: 'center'}} >
                                    <Image source={bookmark2Image} style={{width: '100%', height: 100,borderTopLeftRadius:10,borderBottomLeftRadius:10,}} ></Image>
                                </View>
                                <View style={{width: '70%', padding:20}}>
                                    <Text style={TextStyles.redTextTitle}>Veg Burger</Text>
                                    <Text style={TextStyles.grayText}>Cheese Make Classic Burger...</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.cardContainer]} >
                        <View style={{ width: '100%'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: '30%', justifyContent: 'center'}} >
                                    <Image source={bookmark1Image} style={{width: '100%', height: 100,borderTopLeftRadius:10,borderBottomLeftRadius:10,}} ></Image>
                                </View>
                                <View style={{width: '70%', padding:20}}>
                                    <Text style={TextStyles.redTextTitle}>Lasguna mutton</Text>
                                    <Text style={TextStyles.grayText}>Caramelized Onion Cook 2 sliced red....</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Footer ></Footer>
            </View>
            );
        }
    }

    RestaurantSearch.propTypes = {
        user: PropTypes.object,
    };

    RestaurantSearch.defaultProps = {
        user: null,
    };

    const mapStateToProps = state => ({
        user: getUser(state),
    });

    const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSearch);