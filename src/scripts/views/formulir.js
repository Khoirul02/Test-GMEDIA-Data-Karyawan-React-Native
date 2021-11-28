/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component } from 'react';
import {Picker} from '@react-native-picker/picker';
import KaryawanSource from '../data/karyawan-source';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
class Formulir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nip : '',
      nama : '',
      alamat : '',
      gender : 'L',
      tgl_lahir : '',
      date : new Date(),
      mode : 'date',
      show : false,
    };
  }
  componentDidMount() {
      if (this.props.route.params.formulir === 'Edit'){
      let vNip = this.props.route.params.nip;
      const data = {
        nip : vNip,
      };
      this.getDetailDataKarywan(data);
      }
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
          tgl_lahir: this.state.date,
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
      console.log(fDate);
    };
    const showMode = (curretDate) => {
      this.setState({show : true});
      this.setState({mode : curretDate});
    };

    if (this.props.route.params.formulir === 'Edit'){
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#1976d2" />
          <Text style ={styles.label}>NIP</Text>
          <TextInput
            value={this.props.route.params.nip}
            style={styles.inputText}
            placeholder="Nama"
            onChangeText={value => this.setState({nama: value})}
          />
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
          onChangeText={value => this.setState({nama: value})}
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
          <TouchableOpacity
            onPress = {updateDataKaryawan}
            style={styles.button}>
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>{this.props.route.params.formulir}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1976d2" />
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
          onChangeText={value => this.setState({nama: value})}
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
        <TouchableOpacity
          onPress = {addDataKaryawan}
          style={styles.button}>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>{this.props.route.params.formulir}</Text>
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
  inputText: {
    borderWidth: 1.5,
    borderColor: '#bdbdbd',
    marginHorizontal: 40,
    borderRadius: 10,
  },
  inputPicker: {
    borderWidth: 1.5,
    borderColor: '#bdbdbd',
    marginLeft: 40,
    marginRight : 150,
    borderRadius: 10,
  },
  label : {
    marginHorizontal: 50,
    fontSize : 16,
    fontWeight : 'bold',
    marginTop : 10,
    marginBottom : 10,
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
  datePicker : {
    flexDirection : 'row',
    borderWidth: 1.5,
    borderColor: '#bdbdbd',
    marginHorizontal : 40,
    borderRadius: 10,
  },
  datePickerIcon : {
    alignItems : 'flex-end',
    marginLeft : 170,
    padding : 8,
  },
});
export default Formulir;
