import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import {auth} from 'firebase/app'
import { Router } from '@angular/router';
import { first, map, filter, switchMap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Observable, of } from 'rxjs';
import { FileItem } from '../models/file-item';
import * as firebase from 'firebase';
import { RoleValidator } from '../auth/helpers/roleValidator';
import { GruposService } from './grupos.service';
import { PublicacionService } from './publicacion.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends  RoleValidator{
  public $user: Observable<Usuario>;
  public storageRef=firebase.storage().ref();
userRef:AngularFirestoreDocument<Usuario>;
usu: Observable<Usuario>;
public usuario=new Usuario();
  constructor(public AFauth: AngularFireAuth, private db:AngularFirestore, 
   private router:Router) { 
      super();
      this.$user =this.AFauth.authState.pipe(
        switchMap((user)=>{
          if(user){
            return this.db.doc<Usuario>(`usuarios/${user.uid}`).valueChanges();
          }else{
            return of(null)
          }
        })
      )
    }


    async login(usuario:Usuario){

    const authData = {
      ...usuario,
    };
    const result= await this.AFauth.signInWithEmailAndPassword(authData.email, authData.password);
    return result;

    }

    async register(usuario:Usuario){
      const authData = {
        ...usuario,
      }
      const result= await this.AFauth.createUserWithEmailAndPassword(authData.email, authData.password).then(
        resp=>{
         
           this.db.doc(`usuarios/${resp.user.uid}`).set({
            uid:resp.user.uid,
            email : authData.email,
            nombre: authData.nombre,
            apellido: authData.apellido,
            fechanacimiento: authData.fechanacimiento,
            rol:authData.rol,
            usuarioVerificado:authData.usuarioVerificado,
            creado:'firebase',
            estado:authData.estado,
            genero:authData.genero,
            grupos:['Global'],
            photoURL:[],
            credencial:[],
            carrera:"",
            token:""
        }

      );
     
      resp.user.updateProfile({
          displayName: authData.apellido,
      })
      return resp;
    });


      await this.sendVerificationEmail();
      return result;

  }

  async sendVerificationEmail(){
      try{
      const  result=(await this.AFauth.currentUser).sendEmailVerification();
      return result;
    }catch(error){
      return error
    }
  }

  async logout(){
   await this.AFauth.signOut();
  }
 
  async getCurrentUser(){
    return this.AFauth.authState.pipe(first()).toPromise();
  }
  async changePassword(newpassword:string){
    return (await this.AFauth.currentUser).updatePassword(newpassword);
   }
   
  
  async resetPass(email:string){

        const result= await this.AFauth.sendPasswordResetEmail(email);
        return result;

  }

  async loginGoogle(){
    try{
      return (await this.AFauth.signInWithPopup( new auth.GoogleAuthProvider()))
    }catch(err){
      
    }
  }

  async loginFacebook(){
    try{
      return this.AFauth.signInWithPopup( new auth.FacebookAuthProvider());
    }catch(err){
      
    }
  }
  async borrarCuenta(){
    try{
      return (await this.AFauth.currentUser).delete()

    }catch(err){
      
    }
  }
  guardarUserAdmin(usuario:Usuario){
    return this.db.collection('usuarios').add({
      email : usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fechanacimiento:usuario.fechanacimiento,
      rol:usuario.rol,
      usuarioVerificado:usuario.usuarioVerificado,
      creado:'firebase',
      estado:'nuevo',
      grupos:['Global'],
      genero:usuario.genero,
      photoURL:[],
      credencial:[],
      token:""
  });
  }
  actuliazarUidUser(uid:string){
    this.db.doc(`usuarios/${uid}`).update({
      uid:uid,
    });
  }
  actuliazarCuentaUsuario(usuario:Usuario){
   return this.db.doc(`usuarios/${usuario.uid}`).update({
      nombre:usuario.nombre,
      apellido:usuario.apellido,
      fechanacimiento:usuario.fechanacimiento,
      genero:usuario.genero,
      carrera:usuario.carrera
    });
  }
  obtenerUsuario(uid:string){
  const userRef: AngularFirestoreDocument<Usuario> = this.db.doc(`usuarios/${uid}`);
     userRef.valueChanges().subscribe(data=>{
      if(data){
       
      }else{
        
      }

      return userRef;
    });


  }
  getUser(uid:string){

    const userRef : AngularFirestoreDocument<Usuario> = this.db.doc(`usuarios/${uid}`);
      this.usu=userRef.snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as Usuario;
      if(data){
        this.usuario=data;
        
        const id=a.payload.id;
        return {id, ...data};
      }else{
        return null;
      }

    }))
return this.usu;

  }
  getUsuarios(){
    var estados=['activo','nuevo']
    return this.db.collection('usuarios', ref=>ref.where('estado','in', estados)).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Usuario;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ))
  }
   getUsuariosEspecificos(group:string[]){
    return this.db.collection('usuarios', ref=>ref.where('uid','in', group)).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Usuario;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ))
  }
  getUsuariosCorreo(email:string){
    return this.db.collection('usuarios', ref=>ref.where('email','==', email)).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Usuario;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ))
  }
  getUsuariosEstudiantes(){
  
    return this.db.collection('usuarios', ref=>ref.where('rol','==', 'estudiante') ).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Usuario;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ))

  }
  getUsuariosEstudiantesinGroup(){
   
      return this.db.collection('usuarios', ref=>ref.where('rol','==', 'estudiante')).snapshotChanges().pipe(map(resp=>resp.map(a=>{
        const data= a.payload.doc.data() as Usuario;
        const  id = a.payload.doc.id;
        return { id, ...data};
      })
      ))
   
  }
  getUsuariosNotificarAcAdmin(){
   return this.db.collection('usuarios', ref=>ref.where('estado','==', 'activo').where('rol','==','administrador')).snapshotChanges().pipe(map(resp=>resp.map(a=>{
     const data= a.payload.doc.data() as Usuario;
     const  id = a.payload.doc.id;
     return { id, ...data};
   })
   ))
 }

  getUsuariosNotificarAll(){
    return this.db.collection('usuarios', ref=>ref.where('estado','==', 'activo')).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Usuario;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ))
  }
  getUsuariosNotificarAll2(){
    return this.db.collection('usuarios', ref=>ref.where('estado','==', 'activo')).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Usuario;
      const  id = a.payload.doc.id;
      return { id, ...data};

    })
    ))
  }
  getUsuariosNotificarGroup( group:string[]){
    return this.db.collection('usuarios', ref=>ref.where('estado','==', 'activo')).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Usuario;
      const  id = a.payload.doc.id;
      return { id, ...data};

    })
    ))
  }
 
  probar(){
    var datos:string[]=["activo","eliminado"];
    return this.db.collection('usuarios', ref=>ref.where('estado','in', datos)).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Usuario;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ));
  }

  registrar_usurios_g_f(usuario:Usuario){
  
    const authData = {
      ...usuario,
    }
      this.userRef=this.db.doc(`usuarios/${usuario.uid}`);
      this.userRef.valueChanges().subscribe(data=>{
        if(data){
          
          this.db.doc(`usuarios/${usuario.uid}`).update({
            email : authData.email,
            nombre:authData.nombre,
            photoURL:authData.photoURL
          })
        }else{
         
          this.db.doc(`usuarios/${usuario.uid}`).set({
           uid:usuario.uid,
           email : authData.email,
           nombre:authData.nombre,
           apellido:"",
           rol:"docente",
           estado:"nuevo",
           usuarioVerificado:false,
           photoURL:authData.photoURL,
           creado:'google',
           grupos:['Global']
       }

     );
        }
      })
  }
   updateUser(usuario:Usuario){
      this.db.doc(`usuarios/${usuario.uid}`).update(usuario);
   }

   estadoUser(uid:string){
      let user =new Usuario;
     this.getUser(uid).subscribe(rep=>{
        user=rep;
        if(user.estado=='nuevo'){

          return true;
        }else if(user.estado=='activo'){
          return true;
        }else{
          return false;
        }
     });
   }

   eliminarUsuario(uid:string){
     this.db.doc(`usuarios/${uid}`).update({
       estado:"eliminado",
     });

   }
   UsuarioCarreraEstado(uid:string,carr:string){
    this.db.doc(`usuarios/${uid}`).update({
      carrera:carr,
      estado:'activo'
    });
  }

  actualizarUserAdmin(user:Usuario){
   
    return this.db.doc(`usuarios/${user.uid}`).update({
      nombre:user.nombre,
      apellido:user.apellido,
      email:user.email,
      genero:user.genero,
      rol:user.rol,
      carrera:user.carrera,
      fechanacimiento:user.fechanacimiento,
      usuarioVerificado:user.usuarioVerificado,
      estado:'activo'
    });
  }
  actualizarTokenUser(uid:string, token:string){
    
  return  this.db.doc(`usuarios/${uid}`).update({
      token:token,
    });
  }


  actualizarPerfil(id:string,carr:string, per:FileItem[], cre:FileItem[]){
    this.UsuarioCarreraEstado(id,carr);
    if(per.length!=0){
     return this.almacenarArchivos(per, 'perfiles').then(resp=>{
          
            this.agregarPerfil(id, resp);
          
      })
    }
    if(cre.length!=0){
      return this.almacenarArchivos(cre, 'credencial').then(res=>{
        
          this.agregarCredencial(id, res);
        
  
      })
    }
  }
  agregarPerfil(id:string,agregar:any[] ){
    this.db.doc(`usuarios/${id}`).update({
      
      photoURL:agregar
    });
  }
  agregarCredencial(id:string,agregar:any[] ){
    this.db.doc(`usuarios/${id}`).update({
      
      credencial:agregar
    });
  }
    async borrarUsuerio(uid:string){
     return this.db.doc(`usuarios/${uid}`).delete().then(()=>{
      
     }).catch(err=>{
       return err;
     });
   }
   agregarGrupo(id:string,gid:string ){
    this.db.doc(`usuarios/${id}`).update({
      grupos: firebase.firestore.FieldValue.arrayUnion(gid)
    });
   
  }
  eliminarGrupo(id:string,gid:string){
    this.db.doc(`usuarios/${id}`).update({
      grupos: firebase.firestore.FieldValue.arrayRemove(gid)
    });
  }

   ingreso(correo:string, password:string){
     return this.db.collection('usuarios', ref=>{
       return ref .where('password','==',password)
                  .where('email','==',correo)
     }).snapshotChanges().pipe(first(),map(resp=>resp.map(a=>{
       const data= a.payload.doc.data() as Usuario;
       const  id = a.payload.doc.id;
       return { id, ...data};
     })
     ))

   }
   ingresoT(correo:string, password:string){
     return this.db.collection('usuarios', ref=>{
       return ref .where('password','==',password)
                  .where('email','==',correo)
     }).valueChanges();
   }


  almacenarArchivos(imagenes:FileItem[], carpeta:string):Promise<any[]>{
     
      let images=[];
      return new Promise<any[]>( (resolve)=>{
        let i=0;
        for (const item of imagenes){
    
          item.uploading=true;
          if(item.progreso>=100){
    
            continue;
          }
          var fec= new Date().getTime();
           const uploadTask: firebase.storage.UploadTask =
                      this.storageRef.child(`${carpeta }/${fec}_${ item.name }`)
                                .put( item.archivo );
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            ( snapshot: firebase.storage.UploadTaskSnapshot ) =>
                              item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
                              ( error ) => console.error('Error al subir', error ),
                async() => {
                 
                  item.url = await this.storageRef.child(uploadTask.snapshot.ref.fullPath).getDownloadURL();
                   
                  images.push({url:item.url, name:fec+'_'+item.name});
                  
                  if(images.length===imagenes.length){
                  
                    item.uploading = false;
                    
                    return resolve(images);
                  }
                }
           );
         }
        }
      )
  }


updateUserwithImg(imagen:FileItem[], uid:string){
  return this.almacenarArchivos(imagen,'perfiles').then(resp=>{
    this.db.doc(`usuarios/${uid}`).update({
      photoURL:resp
    });
  });
}

updateUserwithCre(credencial:FileItem[], uid:string){
    return this.almacenarArchivos(credencial,'credencial').then(resp=>{
    this.db.doc(`usuarios/${uid}`).update({
      credencial:resp
    });
  });;
}

 countUsuariosNuevoActivos(){
 
  let respuesta=[];
  return new Promise<number[]>((resolve)=>{
    this.usuariosnuevos().subscribe(resp=>{
      if(respuesta.length!=0){
        respuesta.splice(0,1);
        respuesta.unshift(resp);
      }else{
        respuesta.unshift(resp);
      }
     
      this.usuariosactivos().subscribe(resp=>{
        if(respuesta.length!=1){
          respuesta.splice(1,1);
          respuesta.push(resp);
        }else{
          respuesta.push(resp);
        }
        
        resolve(respuesta);
      })
    })
  })

}

usuariosnuevos(){
  return this.db.collection('usuarios', ref=>{
    return ref .where('estado','==','nuevo')
  }).snapshotChanges().pipe(map(resp=>{
      return resp.length;
  }));
}
usuariosactivos(){
  return this.db.collection('usuarios', ref=>{
    return ref .where('estado','==','activo')
  }).snapshotChanges().pipe(map(resp=>{
      return resp.length;
  }));
}

 usuariosgrafico1(){
  let retornar=[]
  return this.db.collection('usuarios').snapshotChanges().pipe(map(resp=>{
    let val=resp.filter(resp=>(resp.payload.doc.data() as Usuario).estado=='nuevo').length; 
    let val1=resp.filter(resp=>(resp.payload.doc.data() as Usuario).estado=='activo').length;
    retornar.splice(0,1,val);
    retornar.splice(1,1,val1);
    return retornar;
  }));
}
usuariosGrafico2(){
  let retornar=[]
  return this.db.collection('usuarios').snapshotChanges().pipe(map(resp=>{
    let val=resp.filter(resp=>(resp.payload.doc.data() as Usuario).rol=='administrador').length; 
    let val1=resp.filter(resp=>(resp.payload.doc.data() as Usuario).rol=='secretaria').length;
    let val2=resp.filter(resp=>(resp.payload.doc.data() as Usuario).rol=='aeesfot').length;
    let val3=resp.filter(resp=>(resp.payload.doc.data() as Usuario).rol=='docente').length;
    let val4=resp.filter(resp=>(resp.payload.doc.data() as Usuario).rol=='estudiante').length;
    let val5=resp.filter(resp=>(resp.payload.doc.data() as Usuario).rol=='invitado').length;
    retornar.splice(0,1,val);
    retornar.splice(1,1,val1);
    retornar.splice(2,1,val2);
    retornar.splice(3,1,val3);
    retornar.splice(4,1,val4);
    retornar.splice(5,1,val5);
    return retornar;
  }));
}
}
