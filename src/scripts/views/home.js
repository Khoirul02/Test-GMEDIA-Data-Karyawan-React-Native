/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, StatusBar,Image, StyleSheet, FlatList, Alert, RefreshControl, TouchableOpacity, BackHandler, ActivityIndicator} from 'react-native';
import KaryawanSource from './../data/karyawan-source';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: 'Data Karyawan',
            valueUid : '',
            valueToken : '',
            refresh : false,
            dataKaryawan : [],
         };
    }
    componentDidMount() {
        // AsyncStorage.getItem('uid').then((uid) => {
        //     if (uid){
        //         let id = JSON.parse(uid);
        //         this.setState({valueUid: id});
        //     }
        // });
        // AsyncStorage.getItem('token').then((token) => {
        //     if (token){
        //         let key = JSON.parse(token);
        //         this.setState({valueToken: key});
        //     }
        // });
        const data = {
            start : 0,
            count : 10,
        };
        this.getDataKarywan(data);
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            Alert.alert('Data Karyawan', 'Apakah anda yakin akan logout ?', [
                { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                { text: 'Oke', onPress: () => this.handleLogout() }],
                { cancelable: false });
            return true;
        });
    }
    getDataKarywan = async (data) => {
        const response = await KaryawanSource.listKaryawan(data);
        if (response.metadata.status === 200) {
            this.setState({dataKaryawan : response.response});
            console.log(response.metadata.message);
        } else {
            console.log(response.metadata.message);
        }
    }
    componentWillUnmount() {
        this.backHandler.remove();
    }

    handleLogout() {
        AsyncStorage.setItem('uid', '');
        AsyncStorage.setItem('token', '');
        return this.props.navigation.push('Login');
    }
    deleteAlretAction = (nip) => {
        Alert.alert('Data Karyawan', 'Apakah Anda Yakin Akan Menghapus Data?',
        [
            {
                text : 'Cencel',
                onPress : () => null,
                style : 'cancel',
            },
            {
                text : 'Yes',
                onPress : ()=> this.deleteKaryawan(nip),
            },
        ]
        );
    };
    deleteKaryawan = async (vNip) => {
        const data = {
            nip : vNip,
        };
        const response = await KaryawanSource.deleteKaryawan(data);
        if (response.metadata.status === 200) {
            Alert.alert('Data Karyawan', response.metadata.message, [
              {
                text: 'Oke',
                onPress: () => this.props.navigation.push('Home'),
              },
            ]);
        } else {
          Alert.alert('Data Karyawan', response.metadata.message);
        }
    };
    render() {
        if (this.state.dataKaryawan.length === 0){
            return (
            <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1976d2" />
            <View style={styles.header}>
            <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 18}}>
                    {this.state.header}
            </Text>
            </View>
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
            </View>
            );
        }
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#1976d2" />
                <View style={styles.header}>
                <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 18}}>
                    {this.state.header}
                </Text>
                </View>
                <FlatList
                data={this.state.dataKaryawan}
                keyExtractor={item => item.nip}
                renderItem={({item, index})=>
                <View style={styles.card}>
                    <View style={styles.cardImage}>
                        <Icon name="user" size={30} color="#ffffff"/>
                    </View>
                    <View style={styles.cardViewText}>
                        <Text style={styles.cardLabel}>NIP</Text>
                        <Text style={styles.cardText}>{item.nip}</Text>
                        <Text style={styles.cardLabel}>Nama</Text>
                        <Text style={styles.cardText}>{item.nama}</Text>
                        <Text style={styles.cardLabel}>Alamat</Text>
                        <Text style={styles.cardText}>{item.alamat}</Text>
                    </View>
                    <View style={styles.cardIcon}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.push('Formulir',
                        {
                            formulir : 'Edit',
                            nip : item.nip,
                        })}>
                        <Icon name="edit" size={25} color="#2196f3"/>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.cardIcon}>
                    <TouchableOpacity
                        onPress={()=> this.deleteAlretAction(item.nip)}>
                        <Icon name="trash" size={25} color="#2196f3"/>
                    </TouchableOpacity>
                    </View>
                </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refresh} onRefresh={()=> {console.log('refreshing'); this.setState({refresh: false});}}/>
                } />
                <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.props.navigation.push('Formulir', {
                    formulir : 'Simpan',
                })}
                style={styles.touchableOpacityStyle}>
                <Image
                    source={require('./../../public/images/plus.png')}
                    style={styles.floatingButtonStyle}
                />
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loader : {
      flex : 1,
      alignItems : 'center',
      justifyContent : 'center',
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
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
     card : {
        marginLeft : 10,
        marginRight : 10,
        flexDirection : 'row',
        backgroundColor : '#fafafa',
        borderRadius : 5,
        elevation : 3,
        marginTop : 5,
        marginBottom : 5,
      },
      cardImage : {
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#2196f3',
        paddingHorizontal : 30,
        paddingVertical : 20,
        borderTopLeftRadius : 5,
        borderBottomLeftRadius : 5,
      },
      cardIcon : {
        alignItems : 'flex-end',
        padding : 8,
      },
      cardViewText : {
        flex : 1,
        padding : 5,
        justifyContent : 'center',
        alignItems : 'flex-start',
        paddingHorizontal : 15,
      },
      cardLabel : {
          fontSize : 16,
          fontWeight : 'bold',
      },
      cardText : {
        paddingBottom : 5,
        fontSize : 16,
    },
  });
export default Home;
