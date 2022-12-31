import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';

const Downloader = () => {
  const [pastedUrl, setPastedUrl] = useState('');

  const requestCameraPermission = async () => {
    console.log("clicked")
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        DownloadFile()
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };



  const DownloadFile = () => {
    const {config,fs} = RNFetchBlob;
    const date = new Date()
    const fileDir = fs.dirs.DownloadDir;
  config({
    // add this option that makes response data to be stored as a file,
    // this is much more performant.
    fileCache : true,
    addAndroidDownloads:{
        useDownloadManager:true,
        notification:true,
        path:fileDir+ "/downloads_"+Math.floor(date.getDate() + date.getSeconds()/2)+'.mp4',
        description:"file download"
    }
  })
  .fetch('GET', pastedUrl, {
    //some headers ..
  })
  .then((res) => {
    // the temp file path
    console.log('The file saved to ', res.path())
  })

  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        placeholder="Enter your Url"
        value={pastedUrl}
        onChangeText={text => setPastedUrl(text)}
        style={{borderWidth: 0.5, width: '90%', padding: 15, borderRadius: 5}}
      />
      <TouchableOpacity
        style={{
          borderWidth: 0.5,
          width: '60%',
          padding: 15,
          backgroundColor: 'black',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: 20,
          borderRadius: 100,
        }}
        onPress={() => {
          if (pastedUrl !== '') {
            requestCameraPermission();
          }else{
            alert("please Add Url")
          }
        }}>
        <Text>Download File</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Downloader;

const styles = StyleSheet.create({});
