import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getUser from '../../selectors/UserSelectors';
import Colors from '../../helpers/Colors';

//import { refresh, actionTypes } from '../../actions/UserActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});

class AuthHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      search:'',
      animating: true,
      recipeList:[],
      userName: ''
    }
    this.navigateWithAuth();
   
  }

  navigateWithAuth = async () => {
    if (this.props.user !== null) {
      //this.refresh();
      this.props.navigation.navigate('App');
    } else {
      this.props.navigation.navigate('Auth');
    }
    //this.props.navigation.navigate('App');
  }

  //refresh = () => this.props.refresh(this.state.token);
  

  render() {
    return (
      <View style={styles.container} />
    );
  }
}

AuthHandler.propTypes = {
  // refresh: PropTypes.func.isRequired,
  user: PropTypes.object,
  navigation: PropTypes.object.isRequired,
};

AuthHandler.defaultProps = {
  user: null,
};

const mapStateToProps = state => ({
  user: getUser(state),
});
// const mapDispatchToProps = dispatch => ({
//   refresh: (Token) => refresh(logout(Token)),
// });

export default connect(mapStateToProps)(AuthHandler);
