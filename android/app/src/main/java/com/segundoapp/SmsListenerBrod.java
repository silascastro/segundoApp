package com.segundoapp;

import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.provider.Telephony;
import android.telephony.SmsMessage;

import com.facebook.react.HeadlessJsTaskService;
import com.segundoapp.service.MessageService;

import java.util.List;

public class SmsListenerBrod extends BroadcastReceiver {
    private static SmsListener.OTPListener mListener;
    @Override
    public void onReceive(Context context, Intent intent) {
        
            if (intent.getAction().equals("Telephony.Sms.Intents.SMS_RECEIVED_ACTION")) {
                Bundle bundle = intent.getExtras();
                SmsMessage[] msgs = null;
                String msg_from = null;

                if (bundle != null) {
                    try {
                        Object[] pdus = new Object[0];
                        pdus = (Object[]) bundle.get("pdus");
                        if(pdus!=null){
                            for(Object pdu : pdus ){
                                SmsMessage smsMessage = SmsMessage.createFromPdu((byte[])pdu);
                                String sender = smsMessage.getDisplayOriginatingAddress();
                                String messageBody = smsMessage.getMessageBody();
                                if (mListener!=null)
                                {
                                    mListener.messageReceived(messageBody, sender);
                                    break;
                                }
                            }
                        }

                        /*Object[] pdus = (Object[]) bundle.get("pdus");
                        msgs = new SmsMessage[pdus.length];
                        for (int i = 0; i < msg_from.length(); i++) {
                            msgs[i] = SmsMessage.createFromPdu((byte[]) pdus[i]);
                            msg_from = msgs[i].getOriginatingAddress();
                            String msgBody = msgs[i].getMessageBody();
                        }*/

                    } catch (Exception e) {

                    }
                    /*Intent serviceIntent = new Intent(context, MessageService.class);
                    serviceIntent.putExtra("msgs",msgs);
                    context.startService(serviceIntent);
                    HeadlessJsTaskService.acquireWakeLockNow(context);*/
                }

            }

        
    }

    public static void bindListener(SmsListener.OTPListener listener) {
        mListener = listener;
    }

    public static void unbindListener() {
        mListener = null;
    }

    private boolean isAppOnForeground(Context context) {
        /**
         We need to check if app is in foreground otherwise the app will crash.
         http://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
         **/
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses =
                activityManager.getRunningAppProcesses();
        if (appProcesses == null) {
            return false;
        }
        final String packageName = context.getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.importance ==
                    ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                    appProcess.processName.equals(packageName)) {
                return true;
            }
        }
        return false;
    }

}
