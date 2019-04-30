import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10
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
  SaveButtonStyle: {
    
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:25,
    paddingRight:25,
    backgroundColor:'#d11c21',
    borderRadius:20,
    
  },
  profileInput: {
    height: 48,
    marginLeft:10,
    paddingLeft:20,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius:25,
  },
  whiteTextTitle:{
    color:'#fff',
    textAlign:'center',
  },
  errorText: {
    marginLeft:10,
    paddingTop:3,
    color:'#d11c21',
    fontSize:11,
  },
 
});

export default styles;
