import React, { Component } from 'react';
import {
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import iconAddMore from './../../assets/icon_add_more.png';
import footerBg from './../../assets/footer_bg.png';
import menuComment from './../../assets/menu_comment.png';
import menuProfile from './../../assets/menu_profile.png';
import menuBookmark from './../../assets/menu_bookmark.png';
import menuHome from './../../assets/menu_home.png';

class Footer extends Component {

    constructor(props) {
        super(props);
    }

    GoToPage = (page) =>{
        this.props.navigation.navigate(page);
    }
    
    render() {
        return (
            <View style={styles.footercontainer}>
                <View style={{backgroundColor:'transparent', height:80,paddingTop:20,}}>
                <ImageBackground source={footerBg} style={{width: '100%', height: 60}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '20%', height:60, justifyContent: 'center',alignItems: 'center'}}>
                            <TouchableOpacity onPress={()=>this.GoToPage('LatestRecipes')}>
                                <Image source={menuHome} style={{width: 38, height: 30}} ></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '20%', height: 60, justifyContent: 'center',alignItems: 'center'}}>
                            <TouchableOpacity onPress={()=>this.GoToPage('Bookmark')}>
                                <Image source={menuBookmark} style={{width: 24, height: 30}} ></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '20%', height: 60, justifyContent: 'center'}}></View>
                        <View style={{width: '20%', height: 60, justifyContent: 'center',alignItems: 'center'}}>
                            <TouchableOpacity onPress={()=>this.GoToPage('Profile')}>
                                <Image source={menuProfile} style={{width: 30, height: 30}}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '20%', height: 60, justifyContent: 'center',alignItems: 'center'}}>
                            <TouchableOpacity onPress={()=>this.GoToPage('RestaurantRecipe')}>
                                <Image source={menuComment} style={{width: 34, height: 30}} ></Image>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </ImageBackground>
                
                <View style={{width: '100%',position:'absolute',justifyContent: 'center',alignItems: 'center',bottom:40}}>
                    <TouchableOpacity onPress={()=>this.GoToPage('AddRecipe')}>
                        <Image source={iconAddMore} style={{width: 50, height: 50,}} ></Image>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        );
    }
}
export default withNavigation(Footer);

const styles = StyleSheet.create({
    footercontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        }
    });