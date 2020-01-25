import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main:{
            screen: Main,
            navigationOptions: {
                title: "Main teste",
                headerShown: false
            }
        },
        Profile:{
            screen: Profile,
            navigationOptions:{
                title: "Github",

            }
        },
    },{
        defaultNavigationOptions:{
            headerTintColor:'#FFF',
            headerBackTitleVisible: false,
            headerStyle:{
                backgroundColor: '#25292e',    
            },
        }
    }
    )
);

export default Routes;