import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import Button from '../common/Button';
import TextField from '../common/TextField';
//import ErrorView from '../common/ErrorView';
import ShadowStyles from '../../helpers/ShadowStyles';
import TextStyles from '../../helpers/TextStyles';
//import strings from '../../localization';
import { login, actionTypes } from '../../actions/UserActions';
import getUser from '../../selectors/UserSelectors';
import errorsSelector from '../../selectors/ErrorSelectors';
import { isLoadingSelector } from '../../selectors/StatusSelectors';
import styles from './styles';
import logo from './../../assets/logo.png';
import LatestRecipes from '../LatestRecipes';
import Home from '../Home';


import btnFacebook from './../../assets/facebook.png';
import btnGoogle from './../../assets/google.png';

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    //this.navigateToHomeIfLogged();
  }

  
 
  GoToPage = (page) =>{
    this.props.navigation.navigate(page);
}

  ButtonClickCheckFunction = () =>{
    // navigate('Login')}
    this.props.navigation.navigate('Profile');
  
   }

  state = {
    name: '',
    email: '',
    phoneNo: '',
  };

  componentDidUpdate() {
    this.navigateToHomeIfLogged();
    return null;
  }

  navigateToHomeIfLogged = () => {
    if (this.props.user !== null) {
      this.props.navigation.navigate('App');
    }
  }

  passwordChanged = value => this.setState({ password: value });

  emailChanged = value => this.setState({ email: value });

  login = () => this.props.login(this.state.email, this.state.password);

  render() {
    const { isLoading, errors } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
        <Image source={logo}></Image>
        <Text style={TextStyles.createRecipes}>
            Create Recipes,  
        </Text>
        <Text style={TextStyles.improveText}>
          improve your cooking. 
        </Text>
        <View style={{ paddingBottom:20}}>
          <Text style={styles.SocialText}>
            Continue with social 
          </Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: '48%', height: 40, justifyContent: 'center'}} >
          <Image source={btnFacebook} style={{width: 150, height: 40}} ></Image>
          </View>
          <View style={{width: '48%', height: 40, justifyContent: 'center',alignItems: 'flex-end'}} >
          <Image source={btnGoogle} style={{width: 145, height: 40}} ></Image>
          </View>
        </View>

        <View style={{ paddingBottom:5}}>
          <Text style={styles.SocialText}>
            Or
          </Text>
        </View>
        <TouchableOpacity
          style={styles.ButtonStyle}
          activeOpacity = { .5 }
          onPress={()=>this.GoToPage('SignUp')}>
            <Text style={styles.BottanTextStyle}> Sign up with Email </Text>
        </TouchableOpacity>
      
        {/* <View style={[styles.formContainer, ShadowStyles.shadow]}>
         
          <TextField
            placeholder='Name'
            onChangeText={this.emailChanged}
            value={this.state.name}
          />
          <TextField
            placeholder='Email'
            onChangeText={this.emailChanged}
            value={this.state.email}
          />
          <TextField
            placeholder='Phone No'
            onChangeText={this.emailChanged}
            value={this.state.phoneNo}
          />
          <View style={styles.formFooter}>
            <TouchableOpacity onPress={()=>this.GoToPage('SignIn')}>
            <Text style={styles.AlreadyRegister}>
              Already registered with email? Login
            </Text>
            </TouchableOpacity>
            <Text style={styles.TextStyle}>
            By signing up, you agree to 
            </Text>
            <Text style={styles.TextStyle}>
            our Terms of Service and Privacy Policy.
            </Text>
          </View>
          
        </View> */}
        </View>
      </ScrollView>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.array,
  navigation: PropTypes.object.isRequired,
};

Login.defaultProps = {
  user: null,
  errors: [],
};

const mapStateToProps = state => ({
  user: getUser(state),
  isLoading: isLoadingSelector([actionTypes.LOGIN], state),
  errors: errorsSelector([actionTypes.LOGIN], state),
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
