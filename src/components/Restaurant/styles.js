import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10
  },
  cardContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius:10,
    marginTop:5,
    shadowColor: Colors.black,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  formInput: {
    height: 45,
    paddingLeft:30,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius:25,
  },
  SaveButtonStyle: {
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:25,
    paddingRight:25,
    backgroundColor:'#d11c21',
    borderRadius:20,
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 50,
    height: 50,
  },
  whiteTextTitle:{
    color:'#fff',
    textAlign:'center',
  },
});

export default styles;
