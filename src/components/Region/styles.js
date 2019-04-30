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
  
});

export default styles;
