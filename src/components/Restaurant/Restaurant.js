import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';

import PropTypes from 'prop-types';
import OptionsMenu from "react-native-options-menu";
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import Footer from '../common/Footer';


import bookmarkImage from './../../assets/bookmark.png';
import bookmark1Image from './../../assets/bookmark1.png';
import bookmark2Image from './../../assets/bookmark2.png';

import iconCamera from './../../assets/icon_camera.png';
import btnRestaurantAdd from './../../assets/btn_restaurant_add.png';

class Restaurant extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null,
        tabBarVisible: false,
    };

    getMessage = () => {
        const { user } = this.props;
        return `${strings.homeMessage} ${user && user.name}`;
    }

    GoToPage = (page) =>{
        this.props.navigation.navigate(page);
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



render() {
    const MoreIcon = require("./../../assets/btn_restaurant_add.png");
    return (
        <View style={{flex: 1}}>
            
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View  style={{ margin: 10,}}>
                    <View style={{width: '100%', justifyContent: 'center'}} >
                        <TextInput style = {styles.formInput}  placeholder = "Restaurant Name" />
                    </View>
                </View>
                <View  style={{ margin: 10,}}>
                    <View style={{width: '100%', justifyContent: 'center'}} >
                        <TextInput style = {styles.formInput}  placeholder = "Description" />
                    </View>
                </View>
                <View style={[styles.cardContainer]} >
                    <View style={{ width: '100%'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '100%', padding:30, justifyContent: 'center',alignItems: 'center',}}>
                                <Image source={iconCamera} style={{width: 51, height: 40}} ></Image>
                                <View style={{paddingTop:20,}}>
                                    <Text style={TextStyles.blackTextTitle}>Upload Photo</Text>
                                </View>
                                <View style={{paddingTop:5}}>
                                    <Text style={TextStyles.grayText}>Please only use your own original photos.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View  style={{ margin: 10,}}>
                    <View style={{width: '100%', justifyContent: 'center',borderColor: '#dddddd', borderWidth: 1,borderRadius:25}} >
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '30%', justifyContent: 'center', paddingLeft:30,height:45}} >
                                <Text style={TextStyles.blackTextTitle}>Recipes</Text>
                            </View>
                            <View style={{width: '70%', justifyContent: 'center',alignItems: 'flex-end', paddingRight:30,}} >
                                <OptionsMenu button={MoreIcon} buttonStyle={{ width: 82, height: 30,marginLeft: 15, resizeMode: "contain" }} destructiveIndex={1} options={["Add (Search)","Add (new)"]} actions={[this.DetailsView,this.DetailsView]}/>
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

Restaurant.propTypes = {
    user: PropTypes.object,
};

Restaurant.defaultProps = {
    user: null,
};

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);