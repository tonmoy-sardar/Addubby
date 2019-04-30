import { StyleSheet } from 'react-native';
import Colors from '../helpers/Colors';

const styles = StyleSheet.create({
  createRecipes: {
    paddingTop: 15,
    fontSize: 17,
    fontWeight: '700',
    color: '#d11c21',
  },
  improveText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
  },
  whiteTextSmall:{
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  whiteText:{
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
  },
  blackText:{
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
  },
  blackTextBig:{
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  redTextTitle:{
    fontSize: 17,
    fontWeight: '700',
    color: '#d11c21',
  },
  redTextMediam:{
    fontSize: 15,
    fontWeight: '700',
    color: '#d11c21',
  },
  blackTextTitle:{
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
  },
  
  redText:{
    fontSize: 13,
    fontWeight: '700',
    color: '#d11c21',
  },
  grayText:{
    fontSize: 13,
    fontWeight: '700',
    color: '#bcbcbc',
  },
  blackTextHeading:{
    fontSize: 19,
    fontWeight: '700',
    color: '#000000',
    paddingLeft:15,
  },
  blackHeadingTextHeading:{
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    paddingLeft:15,
  },
  lightTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
  textField: {
    fontSize: 15,
    fontWeight: 'normal',
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  error: {
    fontSize: 14,
    color: Colors.red,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  errorInput:{
    borderColor: '#d11c21',
    borderBottomColor:'#d11c21',
  }
});

export default styles;
