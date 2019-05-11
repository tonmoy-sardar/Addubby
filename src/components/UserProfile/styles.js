import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding:20,
  },
  formContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
  },
  ContinueButtonStyle: {
    marginTop:20,
    paddingTop:12,
    paddingBottom:12,
    paddingLeft:50,
    paddingRight:50,
    backgroundColor:'#d11c21',
    borderRadius:20,
    width:'100%',
    
  },
  otherButtonStyle:{
    marginTop:20,
    paddingTop:12,
    paddingBottom:12,
    paddingLeft:50,
    paddingRight:50,
    backgroundColor:'#ffffff',
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius:20,
    width:'100%',
  },
  TextStyle:{
      color:'#fff',
      textAlign:'center',
  },
  blackTextTitle:{
    color: '#000000',
    textAlign:'center',
  },
  actionBar: {
    backgroundColor: '#b3181c',
    color: '#000000',
    paddingHorizontal: 10
  },
  profileInput: {
    height: 48,
    marginLeft:10,
    paddingLeft:20,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius:25,
  },
  lottie: {
    width: 100,
    height: 100
  },
});

export default styles;
