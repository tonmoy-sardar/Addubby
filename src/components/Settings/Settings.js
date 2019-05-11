import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	Switch,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import Footer from '../common/Footer';

import iconAbout from './../../assets/icon_about.png';
import iconLike from './../../assets/heart_black.png';
import iconFeedback from './../../assets/icon_feedback.png';
import iconCommunity from './../../assets/icon_community.png';
import iconTerms from './../../assets/icon_terms.png';
import iconPrivacy from './../../assets/icon_privacy.png';
import iconNotification from './../../assets/icon_notification.png';
import iconProfileEdit from './../../assets/icon_profile_edit.png';
import iconFindFriend from './../../assets/icon_find_friend.png';
import iconback from './../../assets/icon_back.png';
import iconLogout from './../../assets/icon_logout.png';

import { login, actionTypes,logout } from '../../actions/UserActions';

import errorsSelector from '../../selectors/ErrorSelectors';
import { isLoadingSelector } from '../../selectors/StatusSelectors';

class Settings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			switchValue: false,
		 }
	}

	static navigationOptions = {
		header: null,
		tabBarVisible: false,
	};


	componentDidUpdate() {
    if (this.props.user === null) {
      this.props.navigation.navigate('Auth');
    }
    return null;
  }
	
	GoToPage = (page) =>{
        this.props.navigation.navigate(page);
    }

	toggleSwitch = (value) => {
		this.setState({switchValue: value})
	}

	logout = () => this.props.logout();

	// logout = () => {
	// 	this.props.user = null;
	// 	this.props.navigation.navigate('Login');
	// }

	render() {

		const MoreIcon = require("./../../assets/option_menu.png");
		return (
			<View style={{flex: 1}}>
				<View style={{ width: '100%' ,backgroundColor:'#f8f8f8', height:50}}>
					<View style={{ flex: 1 ,flexDirection: 'row',justifyContent: 'center'}} >
						<View style={{width: '10%', justifyContent: 'center', paddingLeft:10,}} >
							<TouchableOpacity onPress={()=>this.GoToPage('Profile')}>
								<Image source={iconback} style={{width: 26, height: 15}} ></Image>
							</TouchableOpacity>
						</View>
						<View style={{width: '90%', justifyContent: 'center'}} >
							<Text style={TextStyles.blackHeadingTextHeading}>Settings</Text>
						</View>
					</View>
				</View>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					
					<View style={[styles.cardContainer]} >
						<TouchableOpacity style={{height:50}}>	
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{width: '20%', justifyContent: 'center',alignItems: 'flex-end',}} >
								<Image source={iconFindFriend} style={{width: 23, height: 20}} ></Image>
								</View>
								<View style={{width: '80%', justifyContent: 'center', paddingLeft:15,}}>
									<Text style={TextStyles.blackTextTitle}>Find friends</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={[styles.cardContainer]} >
						<TouchableOpacity style={{height:50}} onPress={()=>this.GoToPage('Favorite')}>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{width: '20%', justifyContent: 'center',alignItems: 'flex-end',}} >
								<Image source={iconLike} style={{width: 20, height: 20}} ></Image>
								</View>
								<View style={{width: '80%', justifyContent: 'center', paddingLeft:15,}}>
									<Text style={TextStyles.blackTextTitle}>Favorite</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={[styles.cardContainer]} >
						<TouchableOpacity style={{height:50}} onPress={()=>this.GoToPage('EditProfile')}>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{width: '20%', justifyContent: 'center',alignItems: 'flex-end',}} >
								<Image source={iconProfileEdit} style={{width: 20, height: 20}} ></Image>
								</View>
								<View style={{width: '80%', justifyContent: 'center', paddingLeft:15,}}>
									<Text style={TextStyles.blackTextTitle}>Edit Profile</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={[styles.cardContainer]} >
						<View style={{flex: 1, flexDirection: 'row'}}>
							<View style={{width: '20%', justifyContent: 'center',alignItems: 'flex-end',}} >
							<Image source={iconNotification} style={{width: 17, height: 20}} ></Image>
							</View>
							<View style={{width: '60%', justifyContent: 'center', paddingLeft:15,}}>
								<Text style={TextStyles.blackTextTitle}>Notification Preferences</Text>
							</View>
							<View style={{width: '20%', justifyContent: 'center',alignItems: 'center',}}>
								<Switch thumbColor="#d11c21" trackColor="#f6d2d3" onValueChange = {this.toggleSwitch} value = {this.state.switchValue}/>
							</View>
						</View>
					</View>
					<View style={[styles.cardContainer]} >
						<TouchableOpacity style={{height:50}}>	
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{width: '20%', justifyContent: 'center',alignItems: 'flex-end',}} >
								<Image source={iconPrivacy} style={{width: 16, height: 20}} ></Image>
								</View>
								<View style={{width: '80%', justifyContent: 'center', paddingLeft:15,}}>
									<Text style={TextStyles.blackTextTitle}>Privacy Policy</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={[styles.cardContainer]} >
						<TouchableOpacity style={{height:50}}>	
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{width: '20%', justifyContent: 'center',alignItems: 'flex-end',}} >
								<Image source={iconTerms} style={{width: 20, height: 20}} ></Image>
								</View>
								<View style={{width: '80%', justifyContent: 'center', paddingLeft:15,}}>
									<Text style={TextStyles.blackTextTitle}>Terms of service</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={[styles.cardContainer]} >
						<TouchableOpacity style={{height:50}}>		
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{width: '20%', justifyContent: 'center',alignItems: 'flex-end',}} >
								<Image source={iconCommunity} style={{width: 20, height: 20}} ></Image>
								</View>
								<View style={{width: '80%', justifyContent: 'center', paddingLeft:15,}}>
									<Text style={TextStyles.blackTextTitle}>Cookpad community Guidelines</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={[styles.cardContainer]} >
						<TouchableOpacity style={{height:50}}>	
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{width: '20%', justifyContent: 'center',alignItems: 'flex-end',}} >
								<Image source={iconFeedback} style={{width: 20, height: 20}} ></Image>
								</View>
								<View style={{width: '80%', justifyContent: 'center', paddingLeft:15,}}>
									<Text style={TextStyles.blackTextTitle}>Feedback</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={[styles.cardContainer]} >
						<TouchableOpacity style={{height:50}}>	
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{width: '20%', justifyContent: 'center',alignItems: 'flex-end',}} >
								<Image source={iconAbout} style={{width: 16, height: 20}} ></Image>
								</View>
								<View style={{width: '80%', justifyContent: 'center', paddingLeft:15,}}>
									<Text style={TextStyles.blackTextTitle}>About this Application</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={[styles.cardContainer]}>
						<TouchableOpacity style={{height:50}}  onPress={this.logout}>	
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{width: '20%', justifyContent: 'center',alignItems: 'flex-end',}} >
								<Image source={iconLogout} style={{width: 20, height: 20}} ></Image>
								</View>
								<View style={{width: '80%', justifyContent: 'center', paddingLeft:15,}}>
									<Text style={TextStyles.blackTextTitle}>Logout                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>

					
				</ScrollView>
				<Footer ></Footer>
			</View>
			);
		}
	}

	

	Settings.propTypes = {
		logout: PropTypes.func.isRequired,
		user: PropTypes.object,	
		navigation: PropTypes.object.isRequired,
	};
	
	Settings.defaultProps = {
		user: null,
	};
	
	const mapStateToProps = state => ({
		user: getUser(state),
	});
	
	const mapDispatchToProps = dispatch => ({
		logout: () => dispatch(logout()),
	});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);