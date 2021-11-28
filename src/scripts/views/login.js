/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import KaryawanSource from './../data/karyawan-source';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'Data Karyawan',
      username: '',
      password: '',
    };
  }
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
              onPress: () => this.props.navigation.navigate('Home'),
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  image: {
    width: 250,
    height: 200,
  },
  header: {
    backgroundColor: '#2196f3',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  inputText: {
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: '#bdbdbd',
    marginHorizontal: 40,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#2196f3',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 120,
    fontSize: 18,
    borderRadius: 30,
    elevation: 5,
  },
});
export default Login;
