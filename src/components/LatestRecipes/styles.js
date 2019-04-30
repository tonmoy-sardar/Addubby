import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10
  },
  TextStyle:{
      color:'#fff',
      textAlign:'center',
  },
  container: {
    backgroundColor: '#dadada',
    paddingLeft: 5,
    paddingRight: 5
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
  card: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.white,
      marginHorizontal: 10,
      padding: 0,
      borderRadius:10,
      marginTop:10,
      marginBottom:10,
    },
  searchInput: {
    height: 40,
    marginLeft:10,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius:25,
  },
  activeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding:20,
  },
   
});

export default styles;