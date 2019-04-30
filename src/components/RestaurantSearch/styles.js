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
  searchInput: {
    height: 40,
    marginLeft:10,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius:25,
  },
});

export default styles;
