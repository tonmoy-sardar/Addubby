import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import Footer from '../common/Footer';

import iconback from './../../assets/icon_back.png';
import bookmarkImage from './../../assets/bookmark.png';
import bookmark1Image from './../../assets/bookmark1.png';
import btnDelete from './../../assets/btn_delete.png';
import btnMinus from './../../assets/btn_cart_minus.png';
import btnPlus from './../../assets/btn_cart_plus.png';

class Bookmark extends Component {

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

    toggleStatus = () =>{
    //this.state.textBoxShow = true;
    }



render() {
    return (
        <View style={{flex: 1}}>
            <View style={{ width: '100%' ,backgroundColor:'#f8f8f8', height:50}}>
                <View style={{ flex: 1 ,flexDirection: 'row',justifyContent: 'center'}} >
                    <View style={{width: '10%', justifyContent: 'center', paddingLeft:10,}} >
                        <TouchableOpacity onPress={()=>this.GoToPage('RestaurantRecipe')}>
                            <Image source={iconback} style={{width: 26, height: 15}} ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '90%', justifyContent: 'center'}} >
                        <Text style={TextStyles.blackHeadingTextHeading}>Shopping</Text>
                    </View>
                    
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={[styles.cardContainer]} >
                    <View style={{ width: '100%',}}>
                        <View style={{flex: 1, flexDirection: 'row', paddingBottom:20,borderBottomWidth:1, borderColor:'#000000'}}>
                            <View style={{width: '25%', justifyContent: 'center'}} >
                                <Image source={bookmarkImage} style={{width: 80, height: 80,borderRadius:5,}} ></Image>
                            </View>
                            <View style={{width: '75%', paddingLeft:10}}>
                                <View style={{paddingBottom:5,}}>
                                    <Text style={TextStyles.redTextTitle}>French Onion Chicken Meatballs</Text>
                                </View>
                                <View style={{paddingBottom:5,}}>
                                    <Text style={TextStyles.grayText}>We think everything can be improved......</Text>
                                </View>
                                <View style={{ width: '100%' ,}}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{width: '15%', justifyContent: 'center'}} >
                                            <Avatar size={25} rounded icon={{ name: 'user',type: 'font-awesome' }}  />
                                        </View>
                                        <View style={{width: '85%',  justifyContent: 'center'}}>
                                            <Text style={TextStyles.blackText}>French Delish</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', paddingTop:10}}>
                            <View style={{width: '50%', justifyContent: 'center'}} >
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{width: '20%', justifyContent: 'center'}} >
                                        <TouchableOpacity  activeOpacity = { .5 }>
                                            <Image source={btnMinus} style={{width: 30, height: 30,}} ></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '10%',  justifyContent: 'center',alignItems: 'center',}}>
                                        <Text style={TextStyles.blackText}>1</Text>
                                    </View>
                                    <View style={{width: '20%',  justifyContent: 'center'}}>
                                        <TouchableOpacity  activeOpacity = { .5 }>
                                            <Image source={btnPlus} style={{width: 30, height: 30,}} ></Image>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{width: '50%',alignItems: 'flex-end',}}>
                                <TouchableOpacity  activeOpacity = { .5 }>
                                    <Image source={btnDelete} style={{width: 24, height: 30,}} ></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.cardContainer]} >
                    <View style={{ width: '100%',}}>
                        <View style={{flex: 1, flexDirection: 'row', paddingBottom:20,borderBottomWidth:1, borderColor:'#000000'}}>
                            <View style={{width: '25%', justifyContent: 'center'}} >
                                <Image source={bookmark1Image} style={{width: 80, height: 80,borderRadius:5,}} ></Image>
                            </View>
                            <View style={{width: '75%', paddingLeft:10}}>
                                <View style={{paddingBottom:5,}}>
                                    <Text style={TextStyles.redTextTitle}>Stuffed Cabbage</Text>
                                </View>
                                <View style={{paddingBottom:5,}}>
                                    <Text style={TextStyles.grayText}>We think everything can be improved......</Text>
                                </View>
                                <View style={{ width: '100%' ,}}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{width: '15%', justifyContent: 'center'}} >
                                            <Avatar size={25} rounded icon={{ name: 'user',type: 'font-awesome' }}  />
                                        </View>
                                        <View style={{width: '85%',  justifyContent: 'center'}}>
                                            <Text style={TextStyles.blackText}>French Delish</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', paddingTop:10}}>
                            <View style={{width: '50%', justifyContent: 'center'}} >
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{width: '20%', justifyContent: 'center'}} >
                                        <TouchableOpacity  activeOpacity = { .5 }>
                                            <Image source={btnMinus} style={{width: 30, height: 30,}} ></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '10%',  justifyContent: 'center',alignItems: 'center',}}>
                                        <Text style={TextStyles.blackText}>1</Text>
                                    </View>
                                    <View style={{width: '20%',  justifyContent: 'center'}}>
                                        <TouchableOpacity  activeOpacity = { .5 }>
                                            <Image source={btnPlus} style={{width: 30, height: 30,}} ></Image>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{width: '50%',alignItems: 'flex-end',}}>
                                <TouchableOpacity  activeOpacity = { .5 }>
                                    <Image source={btnDelete} style={{width: 24, height: 30,}} ></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', paddingBottom:30}}>
                    <View style={{flex: 1,margin: 10,flexDirection: 'row',paddingLeft:20,paddingBottom:10,borderBottomWidth:1, borderColor:'#000000'}}>
                        <View style={{width: '50%', justifyContent: 'center'}} >
                            <Text style={TextStyles.blackText}>Subtotal</Text>
                        </View>
                        <View style={{width: '50%', paddingLeft:10,alignItems: 'flex-end',}}>
                            <Text style={TextStyles.blackText}>$100</Text>
                        </View>
                    </View>
                    <View style={{flex: 1,margin: 10,flexDirection: 'row',paddingLeft:20,paddingBottom:10,borderBottomWidth:1, borderColor:'#000000'}}>
                        <View style={{width: '50%', justifyContent: 'center'}} >
                            <Text style={TextStyles.blackText}>Tax</Text>
                        </View>
                        <View style={{width: '50%', paddingLeft:10,alignItems: 'flex-end',}}>
                            <Text style={TextStyles.blackText}>$20</Text>
                        </View>
                    </View>
                    <View style={{flex: 1,margin: 10,flexDirection: 'row',paddingLeft:20,paddingBottom:10,borderBottomWidth:1, borderColor:'#000000'}}>
                        <View style={{width: '50%', justifyContent: 'center'}} >
                            <Text style={TextStyles.blackText}>Total</Text>
                        </View>
                        <View style={{width: '50%', paddingLeft:10,alignItems: 'flex-end',}}>
                            <Text style={TextStyles.blackText}>$120</Text>
                        </View>
                    </View>
                    <View style={{width: '100%',  justifyContent: 'center',alignItems: 'center',paddingLeft:10,paddingRight:10,}}>
                        <TouchableOpacity style={styles.ContinueButtonStyle} activeOpacity = { .5 }>
                            <Text style={TextStyles.whiteText}> Book Now </Text>
                        </TouchableOpacity>
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