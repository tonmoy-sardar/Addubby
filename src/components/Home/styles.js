import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    fontFamily: "Lato Regular",
  },
  ContinueButtonStyle: {
    fontFamily: "Lato Regular",
    marginTop:20,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:50,
    paddingRight:50,
    backgroundColor:'#d11c21',
    borderRadius:20,
    
  },
  TextStyle:{
      fontFamily: "Lato Regular",
      color:'#fff',
      textAlign:'center',
  }
});

export default styles;
