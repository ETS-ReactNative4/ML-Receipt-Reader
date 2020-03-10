import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, StatusBar, SafeAreaView } from 'react-native';
import Camera from 'expo-camera';
//import CameraClass from './Camera'
import * as ImagePicker from 'expo-image-picker';
import { Constants } from 'expo'
import {Button} from 'react-native-elements'


export default function App() {

  let [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });

  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
      </View>
    );
  }

  //Method to open camera using System's built in camera
  let openCameraAsync = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    if(permission.granted === false){
      alert('Could not get camera permission!');
      return;
    }

    let result = ImagePicker.launchCameraAsync({
      allowsEditing: true
    });

    if(result.cancelled === true){
      return;
    }

  }

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', backgroundColor: 'green', justifyContent: 'space-between'}}>
      {/* Image Picker Button */}
      <View style={styles.topLeftContainer}>
        <TouchableOpacity onPress={openImagePickerAsync} style={{top: 10, left: 10}}>
          <Image source={require('./menu_icon.png')} style={styles.icon }></Image>

          <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center'}}>Pick a photo</Text>
        </TouchableOpacity>

      </View>

      {/* Wrapping this image in a view would result in unwarranted behavior */}
      <Image style={{flex: 3, backgroundColor: 'yellow', flexWrap: 'wrap', alignSelf: 'center'}}
        source={require('./mockup1.jpg')}
        resizeMode='contain'>
      </Image>

      {/* Camera Button */}
      <View style={{flex: 1, backgroundColor: 'blue', flexWrap: 'wrap', alignSelf: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={openCameraAsync}>
          <Image 
            source={require('./camera_icon.png')}
            style={{alignSelf: 'center', width: 100, height: 100, marginBottom: 10}}>
          </Image>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'red', flex: 1/2}}></View>

    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
  topLeftContainer: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: Expo.Constants.statusBarHeight,
  },
  icon: {
    height: 48,
    width: 32,
    maxHeight: '50%',
    maxWidth: '35%',

  },

  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
