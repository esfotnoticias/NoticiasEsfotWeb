import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { first, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Grupos } from 'src/app/models/grupos';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { PublicacionService } from './publicacion.service';
@Injectable({
  providedIn: 'root'
})
export class GruposService {
  groupRef:AngularFirestoreDocument<Grupos>;
  grupos: Observable<Grupos>;
  constructor(private db:AngularFirestore, private auth:AuthService,
    private publicacione:PublicacionService) { }
  
  guardarGrupo(grupo:Grupos){
    return this.db.collection('grupos').add({
      idGroup:grupo.idGroup,
      idownerGroup:grupo.idownerGroup,
      nameGroup:grupo.nameGroup,
      detalleGroup:grupo.detalleGroup,
      maxmienbrosGroup:grupo.maxmienbrosGroup,
      mienbros:grupo.mienbros
    })
  }
  actualizarGrupo(idg:string,grupo:Grupos){
   return this.db.doc(`grupos/${idg}`).update({
      nameGroup:grupo.nameGroup,
      detalleGroup:grupo.detalleGroup,
      maxmienbrosGroup:grupo.maxmienbrosGroup,
      idGroup:grupo.idGroup
   
    })
  }
  actualizarIdgGrupo(idg:string,id:string){
    this.db.doc(`grupos/${idg}`).update({
      idg:id
     })
   }
  probar(codigo:string){
    return this.db.collection('grupos', ref=>{
      return ref .where('idGroup','==', codigo)
                 .limit(1)}
                 ).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Grupos;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ));
  }

  agregarMiembros(id:string,uid:string ){
   return this.db.doc(`grupos/${id}`).update({
      mienbros: firebase.firestore.FieldValue.arrayUnion(uid)
    });
   
  }
  eliminarMienbros(id:string,uid:string){
    this.db.doc(`grupos/${id}`).update({
      mienbros: firebase.firestore.FieldValue.arrayRemove(uid)
    });
  }
  getGroup(id:string){

    const userRef : AngularFirestoreDocument<Grupos> = this.db.doc(`grupos/${id}`);
      this.grupos=userRef.snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as Grupos;
      if(data){
        const id=a.payload.id;
        return {id, ...data};
      }else{
        return null;
      }
    }))
  return this.grupos;
  }
  updateGruposid(gid:string){
    this.db.doc(`grupos/${gid}`).update({
      id:gid,
    });

  }

  getGroups(id){
   
    return this.db.collection('grupos', ref=>ref.where('idownerGroup','!=',id)).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Grupos;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    )
      )
  }
  getGroupsOwner(id:string){
    return this.db.collection('grupos', ref=>ref.where('idownerGroup','==',id)).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Grupos;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    )
      )
  }

  makeid() { 
   
    var text = ""; 
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
    for (var i = 0; i < 6; i++) {     
      text =text+ possible.charAt(Math.floor(Math.random() * possible.length)); 
    }
    return text; 
  } 

  eliminarGrupoDefi(miembros:string[], gid:string){
    for(let id of miembros){
        this.auth.eliminarGrupo(id, gid);
    };
    this.publicacione.getPostIdGroup(gid).subscribe(resp=>{
      resp.length
      if(resp.length!=0){
        for(let pub of resp){
          this.publicacione.eliminarPublicacin(pub.idPost);
        }
     }
    });
     this.eliminarGropoFinal(gid);
  }
  eliminarGropoFinal(id:string){
    return this.db.doc(`grupos/${id}`).delete().then(()=>{
      
    }).catch(err=>{
      return err;
    });
  }
  
}
