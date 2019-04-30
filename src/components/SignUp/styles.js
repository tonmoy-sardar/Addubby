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
  formFooter:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    padding: 20,
    borderRadius:20,
    marginTop:20,
  },
  ButtonStyle: {
 
    marginTop:20,
    paddingTop:12,
    paddingBottom:12,
    paddingLeft:85,
    paddingRight:85,
    backgroundColor:'#FFFFFF',
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#a1a1a1',
  },
  BottanTextStyle:{
    color:'#000000',
    fontSize: 16,
    textAlign:'center',
    justifyContent: 'center',
  },
  SocialText: {
    paddingTop:20,
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
  },
  AlreadyRegister:{
      paddingTop:20,
      paddingBottom:10,  
      color:'#000000',
      fontSize: 14,
  },
  TextStyle:{
    color:'#000000',
    fontSize: 12,
    textAlign:'center',
    justifyContent: 'center',
  },
  whiteTextTitle:{
    color:'#fff',
    textAlign:'center',
  },
  SaveButtonStyle: {
    
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:25,
    paddingRight:25,
    backgroundColor:'#d11c21',
    borderRadius:20,
    
  },
  errorText: {
  
    paddingTop:3,
    color:'#d11c21',
    fontSize:11,
  },
  profileInput: {
    height: 48,
    borderColor: '#dddddd',
    borderBottomWidth: 1,
  },

  
});

export default styles;
