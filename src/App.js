/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './scripts/views/login';
import Home from './scripts/views/home';
import Formulir from './scripts/views/formulir';
const Stack = createNativeStackNavigator();

function App(){
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login"
            component={Login}
            options={{headerShown: false}} />
        <Stack.Screen name="Home"
            component={Home}
            options={{headerShown: false}} />
        <Stack.Screen name="Formulir"
            component={Formulir}
            options={{
                title: 'Formulir Karyawan',
            headerStyle: {
                backgroundColor: '#2196f3',
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color : '#ffffff',
            },
            headerTintColor: '#ffffff',
          }} />
        </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
