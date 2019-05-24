package com.segundoapp;

public interface SmsListener {
    interface OTPListener{
        void messageReceived(String messageText, String messageSender);
    }
}
