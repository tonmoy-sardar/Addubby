import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	Switch,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import Footer from '../common/Footer';
import { CheckBox } from 'react-native-elements';
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons';

import iconAbout from './../../assets/icon_about.png';
import iconFeedback from './../../assets/icon_feedback.png';
import iconCommunity from './../../assets/icon_community.png';
import iconTerms from './../../assets/icon_terms.png';
import iconPrivacy from './../../assets/icon_privacy.png';
import iconNotification from './../../assets/icon_notification.png';
import iconProfileEdit from './../../assets/icon_profile_edit.png';
import iconFindFriend from './../../assets/icon_find_friend.png';
import iconback from './../../assets/icon_back.png';
import flagIndia from './../../assets/flag/india.png';
import flagUnitedStates from './../../assets/flag/united-states.png';
import flagUnitedKingdom from './../../assets/flag/united-kingdom.png';
import flagSouthAfrica from './../../assets/flag/south-africa.png';
import flagAustralia from './../../assets/flag/australia.png';
import flagNigeria from './../../assets/flag/nigeria.png';
import flagKenya from './../../assets/flag/kenya.png';
class Region extends Component {

	constructor(props) {
		super(props);
		this.state = {
			switchValue: false,
			checked1: true
		 }
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

	toggleSwitch = (value) => {
		this.setState({switchValue: value})
	}

	updateSearch = search => {
		this.setState({ search });
	  };
	  onEnd = () =>{
		this.props.navigation.navigate('RestaurantSearch');
	}
	
	renderCheckList() {
		const options = [
			"United States",
			"United Kingdom",
			"South Africa",
			"India",
			"Australia",
			"Nigeria",
			"Kenya",
		];

		function setSelectedOption(checkListOption){
			this.setState({
				checkListOption,
			});
			//this.GoToPage('Login');
		}

		function renderOption( option, selected, onSelect, index) {

			const textStyle = {
				
				paddingLeft: 20,
				color: 'black',
				flex: 1,
				fontSize: 14,
			};
			const baseStyle = {
				flexDirection: 'row',
				backgroundColor: '#ffffff', 
				height:50, 
				borderWidth:1, 
				borderColor:'#dddddd', 
				borderRadius:25,
				marginTop:10,
				alignItems: 'center',
			};
			var style;
			var checkMark;

			if (index > 0) {
				style = [baseStyle, {
					backgroundColor: '#ffffff', 
					height:50, 
					borderWidth:1, 
					borderColor:'#dddddd',
					borderRadius:25,
					alignItems: 'center',
					
				}];
			} else {
				style = baseStyle;
			}

			if (selected) {
				checkMark = <Text style={{
					//flex: 0.5,
					color: '#FFFFFF',
					fontWeight: 'bold',
					fontSize: 14,
					alignSelf: 'center',
					backgroundColor:'#f9593a',
					paddingTop:5,
					paddingBottom:5,
					paddingLeft:8,
					paddingRight:8,
					borderRadius:13,
					
					
				}}>✓</Text>;
			}

			return (
				<TouchableWithoutFeedback onPress={onSelect} key={index}>
					<View style={style}>
						{
						option=='United States' && (
							<View style={{paddingLeft:20}}>
							<Image source={flagUnitedStates} style={{width: 24, height: 24}} ></Image>
						</View>
						)
						}
						{
						option=='United Kingdom' && (
							<View style={{paddingLeft:20}}>
							<Image source={flagUnitedKingdom} style={{width: 24, height: 24}} ></Image>
						</View>
						)
						}
						{
						option=='South Africa' && (
							<View style={{paddingLeft:20}}>
							<Image source={flagSouthAfrica} style={{width: 24, height: 24}} ></Image>
						</View>
						)
						}
						{
						option=='India' && (
							<View style={{paddingLeft:20}}>
							<Image source={flagIndia} style={{width: 24, height: 24}} ></Image>
						</View>
						)
						}
						{
						option=='Australia' && (
							<View style={{paddingLeft:20}}>
							<Image source={flagAustralia} style={{width: 24, height: 24}} ></Image>
						</View>
						)
						}
						{
						option=='Nigeria' && (
							<View style={{paddingLeft:20}}>
							<Image source={flagNigeria} style={{width: 24, height: 24}} ></Image>
						</View>
						)
						}
						{
						option=='Kenya' && (
							<View style={{paddingLeft:20}}>
							<Image source={flagKenya} style={{width: 24, height: 24}} ></Image>
						</View>
						)
						}
						
						<Text style={textStyle}>{option}</Text>
						<View style={{paddingRight:20}}>
							{checkMark}
						</View>
						
					</View>
				</TouchableWithoutFeedback>
			);
		}

		function renderContainer(options){
			return (
				<View>
					{options}
				</View>
			);
		}

		return (
			<View style={{flex: 1}}>
				<View style={{marginTop: 10}}>
				

					<View>
						
						<RadioButtons
							options={ options }
							onSelection={ setSelectedOption.bind(this) }
							selectedOption={ this.state.checkListOption }
							renderOption={ renderOption }
							renderContainer={ renderContainer }
						/>
					</View>
					{/* <Text style={{
						margin: 20,
					}}>Selected accent: {this.state.checkListOption || 'none'}</Text> */}
					<TouchableOpacity
          style={styles.ContinueButtonStyle}
          activeOpacity = { .5 }
          onPress={() => this.GoToPage('Login')}>
            <Text style={styles.TextStyle}> Continue </Text>
        </TouchableOpacity>
				</View>
			</View>);

	}

	render() {
		
		const { search } = this.state;
		const MoreIcon = require("./../../assets/option_menu.png");
		return (
			<View style={{flex: 1}}>
				<View style={{ width: '100%' ,backgroundColor:'#f8f8f8', height:50}}>
					<View style={{ flex: 1 ,flexDirection: 'row',justifyContent: 'center'}} >
						<View style={{width: '10%', justifyContent: 'center', paddingLeft:10,}} >
							<TouchableOpacity onPress={()=>this.GoToPage('Login')}>
								<Image source={iconback} style={{width: 26, height: 15}} ></Image>
							</TouchableOpacity>
						</View>
						<View style={{width: '90%', justifyContent: 'center'}} >
							<Text style={TextStyles.blackHeadingTextHeading}>Find your cooking community</Text>
						</View>
					</View>
				</View>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<View  style={{ margin: 10}}>
						<View style={{width: '100%', justifyContent: 'center'}} >
							<Searchbar style = {styles.searchInput} placeholder="Search Language or region" onChangeText={this.updateSearch} value={search} />
						</View>

						
						<View style={{width: '100%', justifyContent: 'center', paddingTop:10}} >
						<CheckBox
							containerStyle={styles.checkContainer1}
							title='English'
							checkedIcon='dot-circle-o'
  							uncheckedIcon='circle-o'
							checked={this.state.checked1}
							
							/>
						</View>
						{this.renderCheckList()}
						
					</View>
				</ScrollView>
			</View>
			);
		}
	}

	Region.propTypes = {
		user: PropTypes.object,
	};

	Region.defaultProps = {
		user: null,
	};

	const mapStateToProps = state => ({
		user: getUser(state),
	});

	const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Region);