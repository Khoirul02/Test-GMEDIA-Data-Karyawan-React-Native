import React, { Component } from 'react';
import { Text,View, StatusBar, Image, TextInput ,TouchableOpacity, StyleSheet, Button } from 'react-native';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        data: 'Data Karyawan',
        username: '',
        password: ''
     };
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor ="#1976d2"/>
        <View
        style={styles.header}>
        <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 18}}>
          {this.state.data}
        </Text>
        </View>
        <View
        style={styles.logo}>
          <Image 
            source={require('./src/images/GMEDIA.png')}
            style={styles.image}
          />  
        </View>
        <TextInput 
          value={this.state.username}
          style={styles.inputText}
          placeholder="Username"
          onChangeText={(value)=> this.setState({username: value})}
        />
        <TextInput 
          value={this.state.password}
          style={styles.inputText}
          placeholder="Password"
          onChangeText={(value)=> this.setState({password: value})}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={()=> console.log('login')}>
          <Text style={{color: '#ffffff',fontWeight: 'bold'}}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  logo:{
    justifyContent : 'center',
    alignItems : 'center',
    paddingVertical : 50
  },
  image:{
    width: 250,
    height:200
  },
  header:{
    backgroundColor : '#2196f3',
    paddingVertical : 20,
    justifyContent : 'center',
    alignItems : 'center',
    elevation: 3
  },
  inputText: {
    marginTop : 20,
    borderWidth : 1.5,
    borderColor : '#bdbdbd',
    marginHorizontal : 40,
    borderRadius:10
  },
  button:{
    backgroundColor :'#2196f3',
    paddingVertical : 20,
    justifyContent : 'center',
    alignItems : 'center',
    marginTop: 20,
    marginHorizontal : 120,
    fontSize: 18,
    borderRadius:30,
    elevation: 5
  }
})
export default App;