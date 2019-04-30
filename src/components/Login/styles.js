import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  },
  container: {
    fontFamily: "Lato Regular",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding:20,
  },
  formFooter:{
    fontFamily: "Lato Regular",
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    fontFamily: "Lato Regular",
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    padding: 20,
    borderRadius:20,
    marginTop:20,
  },
  ButtonStyle: {
    fontFamily: "Lato Regular",
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
    fontFamily: "Lato Regular",
    color:'#000000',
    fontSize: 16,
    textAlign:'center',
    justifyContent: 'center',
  },
  SocialText: {
    fontFamily: "Lato Regular",
    paddingTop:20,
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
  },
  AlreadyRegister:{
      fontFamily: "Lato Regular",
      paddingTop:20,
      paddingBottom:10,  
      color:'#000000',
      fontSize: 14,
  },
  TextStyle:{
    fontFamily: "Lato Regular",
    color:'#000000',
    fontSize: 12,
    textAlign:'center',
    justifyContent: 'center',
  }

  
});

export default styles;
