/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Image,
} from 'react-native';
import {styles} from './../styles/splashscreen';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    setTimeout(()=>{
        this.props.navigation.replace('Login');
    }, 3000);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require('./../../public/images/GMEDIA.png')}
            style={styles.image}
          />
        </View>
      </View>
    );
  }
}
export default SplashScreen;
