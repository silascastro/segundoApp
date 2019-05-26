/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  AsyncStorage,
  Button,
  Alert,
  PermissionsAndroid,
  ToastAndroid,
  
} from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
import SendSMS from 'react-native-sms-x'
import * as Permission from './permissions';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const LogLocation = async(data) => {

}

const SmsTask = async(data) => {


}

   
AppRegistry.registerHeadlessTask('SmsTask', () => SmsTask);
AppRegistry.registerHeadlessTask('LogLocation',()=> LogLocation);






type Props = {};
export default class App extends Component <Props> {
  constructor(props){
    super(props);
    this.state ={ dataSource: [] };
    this.SMSReadSubscription = {};
  }

  sendSms(body, number){
    SendSMS.send(123,number, body,
      (msg)=>{
        console.log(msg);
      }
    );
    
  }

  sendSmsToWs(body, number) {
    var data = {
      sToken: "testeatende",
      idClient: 901,
      sPassWord: "123",
      sCellFone: number,
      sAplication: "SMS",
      sMessage: body
    };
   fetch('https://www.mrkoch.com/mrkoch/wsatendente.wso/SendReceive/',{
        method: 'POST',
        headers: {
          //Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json())
    .then((responseJson) => {
      let len = responseJson.length;
      for(var e=0;e<len;e++){
        //console.log(responseJson[e]);
        this.sendSms(responseJson[e].sMensagem, responseJson[e].sCellFone);
      }

      
        
    }).catch((error) => {
      console.error(error);
    });
  }

  componentDidMount(){

    Permission.requestLocation();
    this.SMSReadSubscription = SmsListener.addListener(message => {
      console.info(message);
      if(message.originatingAddress.length == 14){
        //this.sendSms(message.body, message.originatingAddress.slice(3));
        this.sendSmsToWs(message.body, message.originatingAddress.slice(3));
      }
    });
    
  }

componentWillUnmount() {
    //remove listener
    this.SMSReadSubscription.remove();
}

  render() {
    return ( 
      <View style={styles.container}>
        <Text>{instructions}</Text>
        <Button title="ativar"

          onPress={() => {
              
              this.SMSReadSubscription = SmsListener.addListener(message => {
			      ToastAndroid.showWithGravityAndOffset(
			      message.originatingAddress,
			      50,
			      ToastAndroid.BOTTOM,
			      ToastAndroid.LONG,
			      25,
			      50,
			    );
    			});

            
          }}
        />
	<View style={{marginTop: 5}}>
		<Button title="desativar"
			onPress={() => {
				this.SMSReadSubscription.remove();
			}}
		/>
	</View>
  <View style={{marginTop: 5}}>
		<Button title="enviar msg"
			onPress={() =>{
       // this.sendSms("teste", "92991786441");
       this.sendSmsToWs("teste", "92991786441");
				//this.sendSms.bind(this)
			}}
		/>
	</View>
        
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  content: {
    backgroundColor: 'blue'
  }
});
