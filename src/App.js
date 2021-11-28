/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './scripts/views/login';
import Home from './scripts/views/home';
import Formulir from './scripts/views/formulir';
import SplashScreen from './scripts/views/splashscreen';
const Stack = createNativeStackNavigator();

function App(){
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="Login"
            component={Login}
            options={{headerShown: false}} />
        <Stack.Screen name="Home"
            component={Home}
            options={{headerShown: false}} />
        <Stack.Screen name="Formulir"
            component={Formulir}
            options={{headerShown: false}}/>
          <Stack.Screen name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}} />
        </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
