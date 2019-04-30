import { createStackNavigator } from 'react-navigation';
import Login from '../Login';

import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Region from '../Region';

const AuthStack = createStackNavigator(
    {
        Region:Region,
        SignIn:SignIn,
        SignUp:SignUp,
        Login:Login
    },
    {
      initialRouteName: 'Region',
    }
  );


export default AuthStack;
