import {PermissionsAndroid} from 'react-native';

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
        console.log('permissão concedida');
      }else{
        alert("Permissão negada")
        //requestLocation();
      }
    }catch(err){
      alert(err);
    }
  };
  
  async function requestSendSms() {
    try{
      //
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'Cool App SEND_SMS Permission',
        message:
          'Cool  App needs send sms ' +
          'so you can take.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
        },
      );
      if(granted== PermissionsAndroid.RESULTS.GRANTED){
        //
      }else{
        alert("Permissão negada");
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
        requestSendSms();
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

  export {
      requestLocation,
      requestLocationCoarse,
      requestReadSms,
      requestReceiveSms,
      requestSendSms
  }
