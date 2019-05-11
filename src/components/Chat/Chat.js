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



import { login, actionTypes,logout } from '../../actions/UserActions';
import iconback from './../../assets/icon_back.png';

import { GiftedChat } from "react-native-gifted-chat";

class Chat extends Component {

	constructor(props) {
		super(props);
		this.state = {
			switchValue: false,
			messages: [],
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

	componentWillMount() {

    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

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
							<Text style={TextStyles.blackHeadingTextHeading}>Chat</Text>
						</View>
					</View>
				</View>
				
				<GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
      />
			</View>
			);
		}
	}


	Chat.propTypes = {
		logout: PropTypes.func.isRequired,
		user: PropTypes.object,	
		navigation: PropTypes.object.isRequired,
	};
	
	Chat.defaultProps = {
		user: null,
	};
	
	const mapStateToProps = state => ({
		user: getUser(state),
	});
	
	const mapDispatchToProps = dispatch => ({
		logout: () => dispatch(logout()),
	});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);