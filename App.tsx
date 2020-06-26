import React, { Component } from 'react';
import { Platform, Linking, Alert, Text } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer, LinkingOptions, PathConfig } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'
import Settings from './screens/Settings'
import Game from './screens/Game'
import QRCodeScanner from './game/QRScanScreen';
import { GameScreenStartType } from './game/model';

const Stack = createStackNavigator();

const pathConfig: PathConfig = {
  Game: {
    path: 'play/:gameId',
  },
};

const linking: LinkingOptions = {
  prefixes: ['https://ticitacatoey.com', 'ticitacatoey://'],
  config: pathConfig
};

export default class App extends Component {

  render() {
    return (
      <>
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Game" component={Game} initialParams={{ gameScreenStartType: GameScreenStartType.JOIN }} />
            <Stack.Screen name="QRScan" component={QRCodeScanner} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
