import { createStackNavigator } from 'react-navigation';

import MainScreen from './MainScreen'
import RegisterScreen from './User/RegisterScreen'
import SearchScreen from './Trade/SearchScreen'
import { Colors } from '../Themes';

const AppNavigator = createStackNavigator(
    {
        Main: MainScreen,
        Register: RegisterScreen,
        Search: SearchScreen,
    },
    {
        initialRouteName: "Main",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.COLOR_NAV_HEADER,
            },
        },
    }
);

export default AppNavigator;