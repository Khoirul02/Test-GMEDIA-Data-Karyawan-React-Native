/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      logo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
      },
      header: {
        backgroundColor: '#2196f3',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
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
