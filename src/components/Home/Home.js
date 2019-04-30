import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import backgroundImage from './../../assets/home.png';
import logoHome from './../../assets/logo_home.png';

class Home extends Component {
  
  // static navigationOptions = {
  //   header: null,
  // };

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

  ButtonClickCheckFunction = () =>{
 
   // navigate('Login')}
   this.props.navigation.navigate('Region');
 
  }

  render() {
    return (
      
      <ImageBackground   source={backgroundImage} style={styles.container}>
        <Image source={logoHome}></Image>
        <Text style={TextStyles.createRecipes}>
          Create Recipes,  
        </Text>
        <Text style={TextStyles.improveText}>
        improve your cooking. 
        </Text>
        <TouchableOpacity
          style={styles.ContinueButtonStyle}
          activeOpacity = { .5 }
          onPress={ this.ButtonClickCheckFunction }>
            <Text style={styles.TextStyle}> Continue </Text>
        </TouchableOpacity>
       
        </ImageBackground> 
    );
  }
}




// Home.propTypes = {
//   user: PropTypes.object,
// };

// Home.defaultProps = {
//   user: null,
// };

// const mapStateToProps = state => ({
//   user: getUser(state),
// });

// const mapDispatchToProps = () => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
