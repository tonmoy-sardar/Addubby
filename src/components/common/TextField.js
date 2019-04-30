import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import TextStyles from '../../helpers/TextStyles';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginVertical: 2,
  },
  line: {
    backgroundColor: Colors.gray,
    marginTop: 0,
    height: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  field: {
    alignSelf: 'stretch',
    height:40,
  },
});

const TextField = props => (
  <View style={styles.container}>
    <TextInput
      {...props}
      style={[TextStyles.textField, styles.field, props.style]}
      underlineColorAndroid="transparent"
    />
    <View style={styles.line} />
  </View>
);

TextField.propTypes = {
  style: PropTypes.object,
};

TextField.defaultProps = {
  style: null,
};

export default TextField;
