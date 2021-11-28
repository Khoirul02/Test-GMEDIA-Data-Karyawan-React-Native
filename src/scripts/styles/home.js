/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
          paddingLeft : 15,
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
