import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Home from '../screens/Home';
import Settings from '../screens/settings';
import Game from '../screens/GameScreen';

const screens = {
    Home: {
        screen : Home, 
        navigationOptions: {
            headerShown: false,
        }
    },
    Settings: {
        screen : Settings, 
        navigationOptions: {
            headerShown: false,
        }
    },
    Game: {
        screen : Game, 
        navigationOptions: {
            headerShown: false,
        }
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);