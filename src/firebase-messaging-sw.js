importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCtlolZn7Ofu6DkusbjHmduLUOzQr5MQOo",
    authDomain: "noticias-esfot.firebaseapp.com",
    databaseURL: "https://noticias-esfot.firebaseio.com",
    projectId: "noticias-esfot",
    storageBucket: "noticias-esfot.appspot.com",
    messagingSenderId: "327299033473",
    appId: "1:327299033473:web:f83b56b8745894a7792080",
    measurementId: "G-HYNZYYMDLW"
});

const messaging = firebase.messaging();