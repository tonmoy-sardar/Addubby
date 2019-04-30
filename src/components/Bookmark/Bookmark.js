import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
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



class Bookmark extends Component {

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
    return (
        <View style={{flex: 1}}>
            <View style={{ width: '100%' ,backgroundColor:'#f8f8f8', height:50,paddingLeft:10, paddingRight:10,}}>
                <View style={{ flex: 1 ,flexDirection: 'row',justifyContent: 'center'}} >
                    <View style={{width: '15%', justifyContent: 'center'}} >
                        <Image source={searchLogo} style={{width: 38, height: 40}} ></Image>
                    </View>
                    <View style={{width: '85%', justifyContent: 'center'}} >
                    <Searchbar style = {styles.searchInput} placeholder="Bookmark" onChangeText={this.updateSearch} value={search}/>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={[styles.cardContainer]} >
                    <View style={{ width: '100%'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '30%', justifyContent: 'center'}} >
                                <Image source={bookmarkImage} style={{width: '100%', height: 100,borderTopLeftRadius:10,borderBottomLeftRadius:10,}} ></Image>
                            </View>
                            <View style={{width: '70%', padding:20}}>
                                <Text style={TextStyles.redTextTitle}>Beef Steak</Text>
                                <Text style={TextStyles.grayText}> Classic Lightly mix 6 ounces ground beef....</Text>
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
                                <Text style={TextStyles.grayText}> Classic Lightly mix 6 ounces ground beef....</Text>
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

Bookmark.propTypes = {
    user: PropTypes.object,
};

Bookmark.defaultProps = {
    user: null,
};

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);