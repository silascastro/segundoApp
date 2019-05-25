package com.segundoapp;


import android.app.Application;
import android.location.LocationManager;
import android.location.LocationListener;
import android.location.Location;

import android.content.Context;
import com.facebook.react.ReactApplication;
//import com.tkporter.sendsms.SendSMSPackage;
import com.centaurwarchief.smslistener.SmsListenerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import android.os.Bundle;

import com.facebook.react.HeadlessJsTaskService;

import android.content.Intent;
import android.widget.Toast;

import com.facebook.soloader.SoLoader;
import com.segundoapp.service.LocationService;
import com.segundoapp.service.MessageService;

import java.util.Arrays;
import java.util.List;
import com.rhaker.reactnativesmsandroid.RNSmsAndroidPackage;
import com.someone.sendsms.SendSMSPackage;

public class MainApplication extends Application implements ReactApplication {
    private final LocationListener listener = new LocationListener() {
        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {
        }

        @Override
        public void onProviderEnabled(String provider) {
        }

        @Override
        public void onProviderDisabled(String provider) {
        }

        @Override
        public void onLocationChanged(Location location) {
            Intent myIntent = new Intent(getApplicationContext(), LocationService.class);
            getApplicationContext().startService(myIntent);
            HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());

        }
    };




    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            //SendSMSPackage.getInstance(),
            new SmsListenerPackage(),
            new SendSMSPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        // Start requesting for location
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 2000, 1, listener);
        SmsListenerBrod.bindListener(new SmsListener.OTPListener() {
            @Override
            public void messageReceived(String messageText, String messageSender) {
                Intent serviceIntent = new Intent(getApplicationContext(), MessageService.class);
                //serviceIntent.putExtra("msg: ","message: "+messageText+"\nfrom: "+messageSender);

                //serviceIntent.putExtra("msg",messageSender);
                getApplicationContext().startService(serviceIntent);
                HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());
            }
        });

        SoLoader.init(this, /* native exopackage */ false);
    }




}
