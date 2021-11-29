/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component } from 'react';
import {Picker} from '@react-native-picker/picker';
import KaryawanSource from '../data/karyawan-source';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from '../styles/formulir';

import {
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
class Formulir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nip : this.props.route.params.nip,
      nama : '',
      alamat : '',
      gender : 'L',
      tgl_lahir : '',
      date : new Date(),
      mode : 'date',
      show : false,
      status : this.props.route.params.formulir,
      edited : false,
    };
  }
  componentDidMount() {
      if (this.state.status === 'Edit'){
      let vNip = this.state.nip;
      this.setState({edited : true});
      const data = {
        nip : vNip,
      };
      this.getDetailDataKarywan(data);
      }
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.push('Home');
        return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  getDetailDataKarywan= async (data) =>{
    const response = await KaryawanSource.detailKaryawan(data);
      if (response.metadata.status === 200) {
          this.setState({nip : response.response.nip});
          this.setState({nama : response.response.nama});
          this.setState({alamat : response.response.alamat});
          this.setState({gender : response.response.gender});
          this.setState({tgl_lahir : response.response.tgl_lahir});
          console.log(response.metadata.message);
      } else {
          console.log(response.metadata.message);
      }
  }
  render() {
    const addDataKaryawan = async () => {
      try {
        const data = {
          nama: this.state.nama,
          alamat: this.state.alamat,
          gender: this.state.gender,
          tgl_lahir: this.state.tgl_lahir,
        };
        const response = await KaryawanSource.addKaryawan(data);
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
      } catch (error) {
        console.log(error.message);
      }
    };
    const updateDataKaryawan = async () => {
      try {
        const data = {
          nip: this.state.nip,
          nama: this.state.nama,
          alamat: this.state.alamat,
          gender: this.state.gender,
          tgl_lahir: this.state.tgl_lahir,
        };
        const response = await KaryawanSource.updateKaryawan(data);
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
      } catch (error) {
        console.log(error.message);
      }
    };
    const onChange = (event, selectedValue ) =>{
      this.setState({show : false});
      const curretDate = selectedValue || this.state.date;
      this.setState({data : curretDate});
      let tempDate = new Date(curretDate);
      let fDate = tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear();
      this.setState({tgl_lahir : fDate});
    };
    const showMode = (curretDate) => {
      this.setState({show : true});
      this.setState({mode : curretDate});
    };
    let {edited} = this.state;
    const renderLabelNip = () => {
      if (edited) {
        return <Text style ={styles.label}>NIP</Text>;
      } else {
        return null;
      }
    };
    const renderInputNip = () => {
      if (edited) {
        return <TextInput
          value={this.state.nip}
          style={styles.inputText}
          editable={false}
          selectTextOnFocus={false}
        />;
      } else {
        return null;
      }
    };
    const renderButtton = () => {
      if (edited) {
        return <TouchableOpacity
        onPress = {updateDataKaryawan}
        style={styles.button}>
        <Text style={{color: '#ffffff', fontWeight: 'bold'}}>{this.state.status}</Text>
      </TouchableOpacity>;
      } else {
        return <TouchableOpacity
        onPress = {addDataKaryawan}
        style={styles.button}>
        <Text style={{color: '#ffffff', fontWeight: 'bold'}}>{this.state.status}</Text>
      </TouchableOpacity>;
      }
    };
    return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#1976d2" />
          <View style={styles.header}>
          <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 18}}>
            {this.props.route.params.formulir} Data Karyawan
          </Text>
          </View>
          {renderLabelNip()}
          {renderInputNip()}
          <Text style ={styles.label}>Nama</Text>
          <TextInput
            value={this.state.nama}
            style={styles.inputText}
            placeholder="Nama"
            onChangeText={value => this.setState({nama: value})}
          />
          <Text style ={styles.label}>Alamat</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            value={this.state.alamat}
            style={styles.inputText}
            placeholder="Alamat"
            onChangeText={value => this.setState({alamat: value})}
          />
          <Text style ={styles.label}>Jenis Kelamin</Text>
          <View style={styles.inputPicker}>
            <Picker
            selectedValue={this.state.gender} onValueChange={(itemValue, indexValue)=> this.setState({gender: itemValue})}>
              <Picker.Item label="Laki-laki" value="L" />
              <Picker.Item label="Perempuan" value="P" />
            </Picker>
          </View>
          <Text style ={styles.label}>Tanggal Lahir</Text>
          <View style={styles.datePicker}>
        <TextInput
          value={this.state.tgl_lahir}
          placeholder="Tanggal Lahir"
          onChangeText={value => this.setState({tgl_lahir: value})}
        />
        <View style={styles.datePickerIcon}>
          <TouchableOpacity
            onPress = {()=> showMode('date')}>
            <Icon name="calendar" size={25} color="#2196f3"/>
          </TouchableOpacity>
          </View>
        </View>
          {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode={this.state.mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            />
          )}
          {renderButtton()}
        </View>
      );
  }
}
export default Formulir;
