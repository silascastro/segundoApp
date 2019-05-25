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
import SendSMS from 'react-native-sms'


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const LogLocation = async(data) => {


   
   
 
}

const SmsTask = async(data) => {

  SmsListener.addListener((message) => {
    ToastAndroid.showWithGravityAndOffset(
      'mensagem recebida',
      50,
      ToastAndroid.BOTTOM,
      ToastAndroid.LONG,
      25,
      50,
    );
    
    //AsyncStorage.setItem('msg',JSON.stringify(message));
  });


}

   
AppRegistry.registerHeadlessTask('SmsTask', () => SmsTask);
AppRegistry.registerHeadlessTask('LogLocation',()=> LogLocation);



async function requestLocationCoarse() {
  try{
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Cool App Coarse Location Permission',
      message:
        'Cool  App needs access to your location ' +
        'so you can take.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
      },
    );
    if(granted== PermissionsAndroid.RESULTS.GRANTED){
      requestReadSms();
    }else{
      alert("Permissão negada")
      //requestLocation();
    }
  }catch(err){
    alert(err);
  }
};

async function requestReadSms() {
  try{
    //
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'Cool App READ_SMS Permission',
      message:
        'Cool  App needs access to your location ' +
        'so you can take.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
      },
    );
    if(granted== PermissionsAndroid.RESULTS.GRANTED){
      requestReceiveSms();
    }else{
      alert("Permissão negada")
      //requestLocation();
    }
  }catch(err){
    alert(err);
  }
};




async function requestReceiveSms() {
  try{
    //
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      {
        title: 'Cool App READ_SMS Permission',
      message:
        'Cool  App needs access to your location ' +
        'so you can take.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
      },
    );
    if(granted== PermissionsAndroid.RESULTS.GRANTED){
      //requestBroadcastSms();
    }else{
      alert("Permissão negada")
      //requestLocation();
    }
  }catch(err){
    alert(err);
  }
};


async function requestLocation() {
  try{
    //
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool App Location Permission',
      message:
        'Cool  App needs access to your location ' +
        'so you can take.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
      },
    );
    if(granted== PermissionsAndroid.RESULTS.GRANTED){
      requestLocationCoarse();
    }else{
      alert("Permissão negada")
      //requestLocation();
    }
  }catch(err){
    alert(err);
  }
};



type Props = {};
export default class App extends Component <Props> {
  constructor(props){
	super(props);
	this.SMSReadSubscription = {};
  }

  sendSms(){
    /*SendSMS.send({
      body: 'teste SMS!',
      recipients: ['92991786441'],
      successTypes: ['sent', 'queued'],
      allowAndroitRReadPermission: true
    }, (completed, cancelled, error) => {
      console.log('SMS callback: completed: '+completed);
    });*/
    SendSMS.send(1,"+5592991969528", "Hey.., this is me!\nGood to see you. Have a nice day.",
      (msg)=>{
        console.info(msg);
      }
    );
    
  }

  componentDidMount(){
    requestLocation();
    this.SMSReadSubscription = SmsListener.addListener(message => {
      console.info(message);
      this.sendSms();
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
			onPress={
				this.sendSms.bind(this)
			}
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
