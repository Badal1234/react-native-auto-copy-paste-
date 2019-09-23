import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Clipboard,Button,ImageBackground,PermissionsAndroid,NativeModules,Linking} from 'react-native';
import { tsConstructorType } from '@babel/types';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { DocumentPicker, DocumentPickerUtil }  from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
//`var RNFS = require('react-native-fs');
//import * as DocumentPicker from 'expo-document-picker';
//import Pdf from 'react-native-pdf';
import PDFView from 'react-native-view-pdf'

//import PdfReader from 'rn-pdf-reader-js';
//import FilePickerManager from 'react-native-file-picker';
//import RNFileSelector from 'react-native-file-selector'

//var RNGRP = require('react-native-get-real-path')
// alert(RNGRP)
 class Home extends React.Component{
  constructor(props){
    super(props)
    this.state={uri:''}
    
  }
  start=async()=>{
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
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
        console.log('You can use the camera');
        alert('b')
       

      
        
          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles ],
          });
          
          var uri_id=res.name

         
          Linking.canOpenURL(`content://media/external/file/${uri_id}`).then(supported => {
        if (!supported) {
alert('Can\'t handle url: ' );
        } else {
         return Linking.openURL( `content://media/external/file/${uri_id}`);
       }
}).catch(err => alert('An error occurred', err));
          
          //RNGRP.getRealPathFromURI(res.uri).then(filePath =>
           // alert(filePath)
          //)
          this.setState({uri:res.uri})
          //Linking.canOpenURL(res.uri).then(supported => {
          ////  if (!supported) {
    //alert('Can\'t handle url: ' + url);
          //  } else {
          //    return Linking.openURL(res.uri);
          //  }
    //}).catch(err => console.error('An error occurred', err));
          console.log(
            res.uri,
            res.type, // mime type
            res.name,
            res.size
          );
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
          } else {
            throw err;
          }
        }
    
    
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }

    this.props.navigation.navigate('Creator')

  }

  render(){
    
    return(
      
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
      <Text>Make Notes</Text>
 
      <Button
      title='create note'
      onPress={this.start}/>
      </View>
    )
  }
}

class Create extends React.Component{
  constructor(props){
    super(props)
    this.state={uri:''}

  }
  change=async()=>{
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    }, (error, res) => {
      if(res) {
        FileViewer.open(res.uri)
        .then(() => {
          // success
        })
        .catch(_err => {
          // error
        });
      }
    });
           

   

   /* FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        alert(response.uri)
      }
    });*/
    
//PSPDFKit.OpenFilePicker()

   /*try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      
      this.setState({uri:res.uri})
      //Linking.canOpenURL(res.uri).then(supported => {
      ////  if (!supported) {
//alert('Can\'t handle url: ' + url);
      //  } else {
      //    return Linking.openURL(res.uri);
      //  }
//}).catch(err => console.error('An error occurred', err));
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
      alert(res.uri)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }*/


    //PSPDFKit.OpenFilePicker()
   // PSPDFKit.present(DOCUMENT, CONFIGURATION);
   // console.log('middle')
  
  //this.props.navigation.navigate('Pdfview',{
  //  uri:this.state.uri
 // })
  }
  render(){
    return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
      <Button
      title='choose files'
      onPress={this.change}/>
      </View>
    )
  }
}
const resources = {
  file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
  url: 'https://www.ets.org/Media/Tests/TOEFL/pdf/SampleQuestions.pdf',
  base64: 'JVBERi0xLjMKJcfs...',
};



class Pdfview extends React.Component{
  render(){
    return(
       <View style={styles.container}>
         
       </View>
      
    )
  }
}



const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
  }
});

const AppNavigator=createStackNavigator({

  Home:{
    screen:Home
  },
  Creator:{
    screen:Create

  },
  Pdfview:{
    screen:Pdfview
  }
},{initialRouteName:'Home'})

export default createAppContainer(AppNavigator);