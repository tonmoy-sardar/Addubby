import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  contentContainer: {
    //paddingVertical: 20
  },
  cardContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius:10,
    marginTop:5,
    shadowColor: Colors.black,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  stepContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    paddingLeft: 0,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius:10,
    marginTop:5,
    marginBottom:10,
    shadowColor: Colors.black,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
  TextWhiteStyle:{
    color:'#ffffff',
  },
  container: {
    backgroundColor: '#dadada',
  },
  FollowButtonStyle: {
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:5,
    paddingRight:5,
    backgroundColor:'#ffffff',
    borderRadius:10,
    alignItems: 'center',
  },
  searchInput: {
    height: 48,
    marginLeft:10,
    paddingLeft:20,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius:25,
  },
  
});

export default styles;
