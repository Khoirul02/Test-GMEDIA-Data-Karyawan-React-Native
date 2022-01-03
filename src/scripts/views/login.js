/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import KaryawanSource from './../data/karyawan-source';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './../styles/login';
import {
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'Data Karyawan',
      username: '',
      password: '',
    };
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Data Karyawan',
        'Apakah anda yakin akan keluar aplikasi ?',
        [
          {text: 'Cancel', onPress: () => {}, style: 'cancel'},
          {text: 'Oke', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
      );
      return true;
    });
    this.requestUserPermission();
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        this.getFcmToken();
        console.log('Authorization status:', authStatus);
      }
  };

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      // console.log(fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No Token Recived');
    }
  };
  render() {
    const login = async () => {
      try {
        const data = {
          username: this.state.username,
          password: this.state.password,
        };
        const response = await KaryawanSource.loginKaryawan(data);
        if (response.metadata.status === 200) {
          let uid = response.response.uid;
          let token = response.response.token;
          AsyncStorage.setItem('uid', JSON.stringify(uid));
          AsyncStorage.setItem('token', JSON.stringify(token));
          Alert.alert(this.state.header, response.metadata.message, [
            {
              text: 'Oke',
              onPress: () => this.props.navigation.push('Home'),
            },
          ]);
        } else {
          Alert.alert(this.state.header, response.metadata.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1976d2" />
        <View style={styles.logo}>
          <Image
            source={require('./../../public/images/GMEDIA.png')}
            style={styles.image}
          />
        </View>
        <TextInput
          value={this.state.username}
          style={styles.inputText}
          placeholder="Username"
          onChangeText={value => this.setState({username: value})}
        />
        <TextInput
          value={this.state.password}
          style={styles.inputText}
          placeholder="Password"
          onChangeText={value => this.setState({password: value})}
        />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Login;
