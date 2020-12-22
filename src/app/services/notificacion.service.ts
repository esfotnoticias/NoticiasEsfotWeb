import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { first, map, filter, combineAll } from 'rxjs/operators';
import { Notificacion } from 'src/app/models/notificacion';
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private db:AngularFirestore) { }

  guardarNoti(uid:string, noti:Notificacion){
    noti.notFechaP=new Date();
    
    
    return this.db.collection(`usuarios/${uid}/notificaciones`).add({
      
      iduc:noti.iduc,
      idp:noti.idp,
      tipo:noti.tipo,
      acceso:noti.acceso,
      codigo:noti.codigo,
      mensaje:noti.mensaje,
      notFechaP:noti.notFechaP,
      autorimagenNot:noti.autorimagenNot,
      seeNot:false

    }).then(res=>{
      this.actualizarIdNoti(uid,res.id);
    })
  }
  actualizarIdNoti(uid:string,id:string){
    this.db.doc(`usuarios/${uid}/notificaciones/${id}`).update({
      idnot:id,
    });
  }
  actualizarEstaNoti(uid:string,id:string){
    this.db.doc(`usuarios/${uid}/notificaciones/${id}`).update({
      seeNot:true
    });
  }

  selectNotificaciones(id:string){
    return this.db.collection(`usuarios/${id}/notificaciones/`, ref=>{
     return ref .where('seeNot','==',false)
                 .where('seeNot','==',false)
                 .orderBy('notFechaP','desc')
  }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Notificacion;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ))
  }
}
