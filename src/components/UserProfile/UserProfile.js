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

import { getUserProfileDetails } from '../../actions/UserActions';
import profileImage from './../../assets/profile_image.png';

import iconSetting from './../../assets/icon_setting.png';
import iconChart from './../../assets/icon_chart.png';
import iconCart from './../../assets/icon_cart.png';
import iconShare from './../../assets/icon_share.png';
import iconSearch from './../../assets/icon_serach.png';



class UserProfile extends Component {

	
	constructor(props) {
		super(props);
		this.state = {
			token: '',
			userName:'',
			detailsData: {},
			animating: true
		};
		
		this.navigateToHomeIfLogged();

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
				token: this.props.user.data,
				userName:this.props.navigation.state.params.userName,
            }, () => {

                this.getUserProfileDetails(this.state.token,this.state.userName).then(
                    res => {

                        if(res.data.success==true)
        				{
							this.setState({
								detailsData: res.data,
								animating: false,
								
							}, () => {
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

		
        if (this.props.user !== null) {
           
        }
	}
	
	getUserProfileDetails = () => this.props.getUserProfileDetails(this.state.token,this.state.userName);
    

	getMessage = () => {
		const { user } = this.props;
		return `${strings.homeMessage} ${user && user.name}`;
	}

	GoToPage = (page) =>{
        this.props.navigation.navigate(page);
    }

	render() {
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

	UserProfile.propTypes = {
		getUserProfileDetails: PropTypes.func.isRequired,
		user: PropTypes.object,
	};

	UserProfile.defaultProps = {
		user: null,
	};

	const mapStateToProps = state => ({
		user: getUser(state),
	});

	const mapDispatchToProps = dispatch => ({
		getUserProfileDetails: (Token,userName) => dispatch(getUserProfileDetails(Token,userName)),
		
	  });

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);