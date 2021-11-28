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
