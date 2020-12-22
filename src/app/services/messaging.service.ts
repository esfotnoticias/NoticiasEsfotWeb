import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import 'firebase/messaging';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  
  currentMessage = new BehaviorSubject(null);
 
 
  constructor(private afMessaging: AngularFireMessaging,private firestore: AngularFirestore,
    private http: HttpClient) { }
  requestPermission() {
    
     return this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges));
   
    
  }


  deleteToken() {
    
    this.afMessaging.getToken
      .pipe(mergeMap(token => this.afMessaging.deleteToken(token)))
      .subscribe(
        (token) => {  },
      );
  }
  listen() {
    this.afMessaging.onMessage((payload)=>{
      this.currentMessage.next(payload);
      this.reproducir();
    })

    
  
    }
    reproducir() {
      const audio = new Audio('assets/sonido.mp3');
      audio.play();
    }
    refresh(){
     
      this.afMessaging.getToken.subscribe(token=>{
        this.afMessaging.requestToken
      })
      this.afMessaging.onTokenRefresh(()=>{
        
        this.afMessaging.getToken.subscribe(token=>{
         
        })
      })
    }
  
  sendPostRequest(msg: string, token: string) {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAATDSK6YE:APA91bHx1xG8OpJQlpRom9qz-ZIx3ZchyZGdvb1V1_OzhkqcM9ukzDoAjKXkJHY-qMiF9g_5RDJJUYrKHIXeWpWNkeA_WzpJT2fotxgiXyUqhkF-WQIqwV1IMfps2ekziID8DUkPfCI8'
      })
    };
    const postData = {
      notification: {
        title: 'Noticias Esfot',
        body: msg
      },
      to: token
    };


     return this.http.post('https://fcm.googleapis.com/fcm/send', postData, httpOptions);
  }

  sendPushNotificationsAll(tokens:string[],mensaje:string){
    for(let token of tokens){
      this.sendPostRequest(mensaje,token)
    }
  }
}
