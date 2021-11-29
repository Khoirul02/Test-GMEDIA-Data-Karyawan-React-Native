/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, StatusBar,Image, FlatList, Alert, RefreshControl, TouchableOpacity, BackHandler, ActivityIndicator} from 'react-native';
import KaryawanSource from './../data/karyawan-source';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from './../styles/home';

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
                    nip : '',
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
export default Home;
