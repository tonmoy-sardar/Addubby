import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10
  },
  checkContainer1:{
    backgroundColor: '#ffffff',
    height:50,
    borderWidth:0,
    borderColor:'#dddddd',
    borderRadius:25,
  },
  checkContainer:{
    backgroundColor: '#ffffff',
    height:50,
    borderColor:'#dddddd',
    borderRadius:25,
  },
  cardContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    height:50,
    borderBottomWidth:1,
    borderColor:'#000000',
  },
  searchInput: {
    height: 40,
    marginLeft:10,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius:25,
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
