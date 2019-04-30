import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	ImageBackground,
	Button,
	TouchableOpacity,
	Alert,
	ScrollView,
	TextInput,
	ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import Footer from '../common/Footer';

import { getUserDetails } from '../../actions/UserActions';
import profileImage from './../../assets/profile_image.png';

import iconSetting from './../../assets/icon_setting.png';
import iconChart from './../../assets/icon_chart.png';
import iconCart from './../../assets/icon_cart.png';
import iconShare from './../../assets/icon_share.png';
import iconSearch from './../../assets/icon_serach.png';



class Profile extends Component {

	
	constructor(props) {
		super(props);
		this.state = {
			token: '',
			detailsData: {},
			animating: true
		};
		
		this.navigateToHomeIfLogged();
		//console.log('user:'+ getUser(state));
	}

	
	static navigationOptions = {
		header: null,
		tabBarVisible: false,
	};

	componentDidMount()
	{
		if(this.props.user!=null)
		{
			

			this.state.token = this.props.user.data;

			this.setState({
                token: this.props.user.data
            }, () => {
                console.log('cccc:'+ this.state.token);
                this.getUserDetails(this.state.token).then(
                    res => {
                        console.log(res.data)
                        if(res.data.success==true)
        				{
							this.setState({
								detailsData: res.data,
								animating: false,
								
							}, () => {
								console.log('ddddd3:'+ JSON.stringify(this.state.detailsData.data.username));
							})
						}
						else{
							this.setState({
								animating: false,
							})
						}
                    }
				)
				.catch(err => {
					this.setState({
						animating: false,
					})
					console.log(err);
					console.log(err.error);
					
				  });
            })
			
		}
	}

	

	navigateToHomeIfLogged = () => {
        //this.logout();
		//console.log('user:'+ getUser(state));
		
        if (this.props.user !== null) {
           
           // this.props.navigation.navigate('LatestRecipes');
        }
	}
	
	getUserDetails = () => this.props.getUserDetails(this.state.token);
    

	getMessage = () => {
		const { user } = this.props;
		return `${strings.homeMessage} ${user && user.name}`;
	}

	GoToPage = (page) =>{
        this.props.navigation.navigate(page);
    }

	render() {
		//console.log("aaa");
		const MoreIcon = require("./../../assets/option_menu.png");
		const { visible } = this.state;
		return (
			<View style={{flex: 1}}>
				{
					this.state.animating== true && (
				<View style={[styles.container, TextStyles.horizontal]}>
					<ActivityIndicator size="large" color="#d11c21" animating={this.state.animating} />
				</View>
					)
				}
				
				{
					this.state.animating== false && (
						<View style={{flex: 1}}>
						<ScrollView contentContainerStyle={styles.contentContainer}>
					
					<View style={styles.container}>
						<Image source={profileImage}></Image>
						<View style={{paddingTop:20}}>
							{
								this.state.detailsData.data != undefined && (
									
									<Text style={TextStyles.redTextTitle}>{this.state.detailsData.data.profile.name}</Text>
								)
							}
							
						</View>
						<View style={{ width: '70%'}}>
							<View style={{flex: 1, flexDirection: 'row', paddingTop:20,}}>
								<View style={{width: '50%',  justifyContent: 'center',alignItems: 'center',}}>
									<Text style={TextStyles.blackTextTitle}>0</Text>
								</View>
								<View style={{width: '50%',  justifyContent: 'center',alignItems: 'center',}} >
									<Text style={TextStyles.blackTextTitle}>0</Text>
								</View>
							</View>
							<View style={{flex: 1, flexDirection: 'row',paddingTop:5,}}>
								<View style={{width: '50%', justifyContent: 'center',alignItems: 'center',}}>
									<Text style={TextStyles.blackTextTitle}>Followers</Text>
								</View>
								<View style={{width: '50%',  justifyContent: 'center',alignItems: 'center',}} >
									<Text style={TextStyles.blackTextTitle}>Following</Text>
								</View>
							</View>
							<View style={{flex: 1, flexDirection: 'row',paddingTop:15,}}>
								<View style={{width: '25%',  justifyContent: 'center',alignItems: 'center',}}>
									<Image source={iconSearch} style={{width: 27, height: 28}} ></Image>
								</View>
								<View style={{width: '25%',  justifyContent: 'center',alignItems: 'center',}} >
									<Image source={iconChart} style={{width: 31, height: 28}} ></Image>
								</View>
								<View style={{width: '25%',  justifyContent: 'center',alignItems: 'center',}} >
									<Image source={iconCart} style={{width: 35, height: 28}} ></Image>
								</View>
								<View style={{width: '25%', justifyContent: 'center',alignItems: 'center',}} >
									<Image source={iconShare} style={{width: 26, height: 28}} ></Image>
								</View>
							</View>
						</View>
						<View style={{ width: '90%'}}>
							<View style={{flex: 1, flexDirection: 'row', paddingTop:10,}}>
								<View style={{width: '82%',  justifyContent: 'center',alignItems: 'center',}}>
									<TouchableOpacity style={styles.ContinueButtonStyle} activeOpacity = { .5 }onPress={()=>this.GoToPage('EditProfile')}>
										<Text style={styles.TextStyle}> Edit Profile </Text>
									</TouchableOpacity>
								</View>
								<View style={{width: '18%',  justifyContent: 'center',alignItems: 'center', paddingTop:20,}} >
									<TouchableOpacity  activeOpacity = { .5 } onPress={()=>this.GoToPage('Settings')}>
										<Image source={iconSetting} style={{width: 44, height: 44}} ></Image>
									</TouchableOpacity>
								</View>
							</View>
						</View>
						<View style={{ width: '90%'}}>
							<View style={{width: '100%',  justifyContent: 'center',alignItems: 'center',}}>
								<TouchableOpacity style={styles.otherButtonStyle} activeOpacity = { .5 }>
									<Text style={styles.blackTextTitle}> Connections </Text>
								</TouchableOpacity>
							</View>
							<View style={{width: '100%',  justifyContent: 'center',alignItems: 'center',}}>
								<TouchableOpacity style={styles.otherButtonStyle} activeOpacity = { .5 }>
									<Text style={styles.blackTextTitle}> Cooksnaps </Text>
								</TouchableOpacity>
							</View>
							<View style={{flex: 1, flexDirection: 'row', paddingTop:20,}}>
								<View style={{width: '33%',  justifyContent: 'center',alignItems: 'center',}}>
									<Text style={TextStyles.blackTextTitle}>0</Text>
								</View>
								<View style={{width: '33%',  justifyContent: 'center',alignItems: 'center',}} >
									<Text style={TextStyles.blackTextTitle}>0</Text>
								</View>
								<View style={{width: '33%',  justifyContent: 'center',alignItems: 'center',}} >
									<Text style={TextStyles.blackTextTitle}>0</Text>
								</View>
							</View>
							<View style={{flex: 1, flexDirection: 'row',paddingTop:5,}}>
								<View style={{width: '33%', justifyContent: 'center',alignItems: 'center',}}>
									<Text style={TextStyles.blackTextTitle}>Private</Text>
								</View>
								<View style={{width: '33%',  justifyContent: 'center',alignItems: 'center',}} >
									<Text style={TextStyles.blackTextTitle}>Published</Text>
								</View>
								<View style={{width: '33%',  justifyContent: 'center',alignItems: 'center',}} >
									<Text style={TextStyles.blackTextTitle}>Cooksnap</Text>
								</View>
							</View>
							<View style={{width: '100%',  justifyContent: 'center',alignItems: 'center',}}>
								<TouchableOpacity style={styles.ContinueButtonStyle} activeOpacity = { .5 }>
									<Text style={styles.TextStyle}> Add Recipes </Text>
								</TouchableOpacity>
							</View>
							<View style={{width: '100%',  justifyContent: 'center',alignItems: 'center',}}>
								<TouchableOpacity style={styles.ContinueButtonStyle} activeOpacity = { .5 }>
									<Text style={styles.TextStyle}> Add Restaurent </Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
					<Footer></Footer>
					</View>
					)
				}
				
			
			</View>
			);
		}
	}

	Profile.propTypes = {
		getUserDetails: PropTypes.func.isRequired,
		user: PropTypes.object,
	};

	Profile.defaultProps = {
		user: null,
	};

	const mapStateToProps = state => ({
		user: getUser(state),
	});

	const mapDispatchToProps = dispatch => ({
		getUserDetails: (Token) => dispatch(getUserDetails(Token)),
		
	  });

export default connect(mapStateToProps, mapDispatchToProps)(Profile);