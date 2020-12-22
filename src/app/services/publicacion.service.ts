import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';
import { Observable } from 'rxjs';
import { Publicacion } from 'src/app/models/publicaciones';
import { first, map, filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  publicacion: Observable<Publicacion>;
  public storageRef=firebase.storage().ref();
  constructor(private db:AngularFirestore) { }
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
savePublicacion(publicacion:Publicacion,imagenes:FileItem[], documentos:FileItem[]){
  
  publicacion.fechaPost=new Date();

  var retorno:boolean;
  return new Promise<any>( (resolve)=>{
  if(imagenes.length!=0 && documentos.length!=0){
  
    this.almacenarArchivos(imagenes, 'publicacion').then(resp=>{
      publicacion.imagenPost=resp;
      this.almacenarArchivos(documentos, 'documentos').then(res=>{
        publicacion.docsPost=res;
        this.guardarPost(publicacion).then(res=>{
          this.updateId(res.id, res.id);
              
              retorno=true;
              return resolve(res);
        })
      });
    });

  }else if(imagenes.length!=0 && documentos.length==0){
    
     publicacion.docsPost=[];
     this.almacenarArchivos(imagenes, 'publicacion').then(resp=>{
       publicacion.imagenPost=resp;
         this.guardarPost(publicacion).then(res=>{
          this.updateId(res.id, res.id);
          retorno=true;
          return resolve(res);
       });
     });

  }else if(imagenes.length==0 && documentos.length!=0){
    
      publicacion.imagenPost=[];;
      this.almacenarArchivos(documentos, 'documentos').then(res=>{
        publicacion.docsPost=res;
        this.guardarPost(publicacion).then(res=>{
          retorno=true;
          this.updateId(res.id, res.id);
          return resolve(res);
      });
    });
  }else if(imagenes.length==0 && documentos.length==0){
    
    publicacion.imagenPost=[];;
    publicacion.docsPost=[];;
    this.guardarPost(publicacion).then(res=>{
      retorno=true;
      this.updateId(res.id, res.id);
      return resolve(res);
  });
  };
   }).catch(err=>{
     return  "error";
   })
}
guardarPost(publicacion:Publicacion){
  return this.db.collection('publicaciones').add({
    idPost: "",
    tipoPost: publicacion.tipoPost,
    categoriaPost: publicacion.categoriaPost,
    estadoPost: publicacion.estadoPost,
    tituloPost: publicacion.tituloPost,
    autorNamePost:  publicacion.autorNamePost,
    viewsPost: publicacion.viewsPost,
    fechaPost:  publicacion.fechaPost,
    fechaInicioPost: publicacion.fechaInicioPost,
    fechaFinPost:  publicacion.fechaFinPost,
    descripcionPost:  publicacion.descripcionPost,
    imagenPost:  publicacion.imagenPost,
    autorIdPost:  publicacion.autorIdPost,
    autorImagenPost:  publicacion.autorImagenPost,
    docsPost:  publicacion.docsPost,
    ytUrlPost:  publicacion.ytUrlPost,
    horainicioPost:  publicacion.horainicioPost,
    horafinPost:  publicacion.horafinPost,
    telPost:  publicacion.telPost,
    lugarPost:  publicacion.lugarPost,
    comentarioPost: publicacion.comentarioPost,
    idGrupoPost: publicacion.idGrupoPost,
    nameGroupPost: publicacion.nameGroupPost
  })
}

updateViews(id:string, valor:number){
    this.db.doc(`publicaciones/${id}`).update({
      viewsPost:valor+1,
    });

  }
  updateId(id:string, idpost:string){
    
      this.db.doc(`publicaciones/${id}`).update({
        idPost:idpost,
      });
  
    }

  selectEvents(date:Date){
    let f1=new Date(date.getTime());
    f1.setHours(23,59,59);
    return this.db.collection('publicaciones', ref=>{
     return ref .where('fechaInicioPost','>=', date)
                .where('fechaInicioPost','<=', f1)
                .where('estadoPost','==','aprobado')
  }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Publicacion;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ))
  }
  selectEventsCalendar(date:Date){
    let f1=new Date(date.getTime());
    let d=f1.getDate() +2;
    let m=f1.getMonth()+1;
    let a=f1.getFullYear();
    let da:string=a+"-"+m+"-"+d;
    let start = new Date(da);
    return this.db.collection('publicaciones', ref=>{
     return ref .where('tipoPost','==', 'Eventos')
                .where('fechaInicioPost','>=', date)
                .where('fechaInicioPost','<=', start)
                .where('estadoPost','==','aprobado')
  }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Publicacion;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ))
  }

  geteventos(id:string){
    return this.db.collection('publicaciones', ref=>{
      return ref .where('tipoPost','==', 'Eventos')
                 .where('autorIdPost','==', id)
   }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
       const data= a.payload.doc.data() as Publicacion;
       const  id = a.payload.doc.id;
       return { id, ...data};
     })))
  }
  getnoticias(id:string){
    return this.db.collection('publicaciones', ref=>{
      return ref .where('tipoPost','==', 'Noticias')
                 .where('autorIdPost','==', id)
   }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
       const data= a.payload.doc.data() as Publicacion;
       const  id = a.payload.doc.id;
       return { id, ...data};
     } )))
     
  }
  getnoticiasGrupos(id:string,grupos:string[]){
    return this.db.collection('publicaciones', ref=>{
      return ref .where('tipoPost','==', 'Noticias')
                 .where('estadoPost','==','pendiente')
                 .where('autorIdPost','!=', id)
                 .where('idGrupoPost','in',grupos)
   }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
       const data= a.payload.doc.data() as Publicacion;
       const  id = a.payload.doc.id;
       return { id, ...data};
     } )))
  }
  getnoticiasGlobales(id:string){
    return this.db.collection('publicaciones', ref=>{
      return ref .where('tipoPost','==', 'Noticias')
                 .where('estadoPost','==','pendiente')
                 .where('autorIdPost','!=', id)
                 .where('idGrupoPost','==','Global')
   }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
       const data= a.payload.doc.data() as Publicacion;
       const  id = a.payload.doc.id;
       return { id, ...data};
     } )))
  }
  geteventosGrupos(id:string,grupos:string[]){
    return this.db.collection('publicaciones', ref=>{
      return ref .where('tipoPost','==', 'Eventos')
                 .where('estadoPost','==','pendiente')
                 .where('autorIdPost','!=', id)
                 .where('idGrupoPost','in',grupos)
   }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
       const data= a.payload.doc.data() as Publicacion;
       const  id = a.payload.doc.id;
       return { id, ...data};
     } )))
  }
  geteventosGlobales(id:string){
    return this.db.collection('publicaciones', ref=>{
      return ref .where('autorIdPost','!=', id)
                 .where('tipoPost','==', 'Eventos')
                 .where('estadoPost','==','pendiente')
   }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
       const data= a.payload.doc.data() as Publicacion;
       const  id = a.payload.doc.id;
       return { id, ...data};
     } )))
  }
  getsolicitudesGrupos(id:string,grupos:string[]){
    return this.db.collection('publicaciones', ref=>{
      return ref .where('tipoPost','==', 'Solicitudes')
                 .where('estadoPost','==','pendiente')
                 .where('autorIdPost','!=', id)
                 .where('idGrupoPost','in',grupos)
   }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
       const data= a.payload.doc.data() as Publicacion;
       const  id = a.payload.doc.id;
       return { id, ...data};
     } )))
  }
  getsolicitudesGlobales(id:string){
    return this.db.collection('publicaciones', ref=>{
      return ref .where('autorIdPost','!=', id)
                 .where('tipoPost','==', 'Solicitudes')
                 .where('estadoPost','==','pendiente')
   }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
       const data= a.payload.doc.data() as Publicacion;
       const  id = a.payload.doc.id;
       return { id, ...data};
     } )))
  }

  getsolicitudes(id:string){
    return this.db.collection('publicaciones', ref=>{
      return ref .where('tipoPost','==', 'Solicitudes')
                 .where('autorIdPost','==', id)
   }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
       const data= a.payload.doc.data() as Publicacion;
       const  id = a.payload.doc.id;
       return { id, ...data};
     })))
  }

  portada(seleccion:string[],date:Date){
    let f1=new Date(date.getTime());
    f1.setHours(23,59,59);
    return this.db.collection('publicaciones', ref=>{
     return ref .where('fechaInicioPost','>=', date)
                .where('fechaInicioPost','<=', f1)
                .where( 'idgroup','in',seleccion)
  }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Publicacion;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ))
  }

  getPublicacion(idp:string){
    const userRef : AngularFirestoreDocument<Publicacion> = this.db.doc(`publicaciones/${idp}`);
    this.publicacion=userRef.snapshotChanges().pipe(map(a=>{
    const data=a.payload.data() as Publicacion;
    if(data){
      const id=a.payload.id;
      return {id, ...data};
      }else{
        return null;
      }

  }))
  return this.publicacion;
  }
  eliminarImagenes(id:string,borrar:any[]){
    
   this.eliminarImagenesStorage(borrar['name']).then(res=>{
      
    }).catch(err=>{
      
    });
    this.db.doc(`publicaciones/${id}`).update({
        imagenPost: firebase.firestore.FieldValue.arrayRemove(borrar),
    });
  }
  eliminarDocumentos(id:string,borrar:any[]){
   
    this.eliminarDocumentosStorage(borrar['name']).then(res=>{
      
    }).catch(err=>{
     
    });
    this.db.doc(`publicaciones/${id}`).update({
        docsPost: firebase.firestore.FieldValue.arrayRemove(borrar),
    });
  }


  eliminarImagenesStorage(name:string){
      var desertRef = this.storageRef.child(`publicacion/${name}`);
      return desertRef.delete().then(function() {
        
      }).catch(function(error) {
        
      });
  }
  eliminarDocumentosStorage(name:string){
    var desertRef = this.storageRef.child(`documentos/${name}`);
    return desertRef.delete().then(function() {
     
    }).catch(function(error) {
      
    });
}
eliminarPublicacin(id:string){
  return this.db.doc(`publicaciones/${id}`).delete().then(()=>{
    
  }).catch(err=>{
    return err;
  });
}

actualizarPublicacion(publicacion:Publicacion,imagenes:FileItem[], documentos:FileItem[]){

  publicacion.fechaPost=new Date();

  var retorno:boolean;
  
  
  return new Promise<any>( (resolve)=>{
  if(imagenes.length!=0 && documentos.length!=0){
    
    this.almacenarArchivos(imagenes, 'publicacion').then(resp=>{
      publicacion.imagenPost=resp;
      this.cicloagregarImagen(publicacion.idPost, resp);
      this.almacenarArchivos(documentos, 'documentos').then(res=>{
        publicacion.docsPost=res;
        this.cicloagregarDocumentos(publicacion.idPost,res);
        this.guardarPostUpdate(publicacion.idPost,publicacion).then(res=>{
             
              retorno=true;
              return resolve(retorno);
        })
      });
    });

  }else if(imagenes.length!=0 && documentos.length==0){
  
     publicacion.docsPost=[];
     this.almacenarArchivos(imagenes, 'publicacion').then(resp=>{
       publicacion.imagenPost=resp;
       this.cicloagregarImagen(publicacion.idPost, resp);
         this.guardarPostUpdate(publicacion.idPost,publicacion).then(res=>{

          retorno=true;
          return resolve(retorno);
       });
     });

  }else if(imagenes.length==0 && documentos.length!=0){
  
      this.almacenarArchivos(documentos, 'documentos').then(res=>{
        this.cicloagregarDocumentos(publicacion.idPost,res);
        this.guardarPostUpdate(publicacion.idPost,publicacion).then(res=>{
          retorno=true;
          return resolve(retorno);
      });
    });
  }else if(imagenes.length==0 && documentos.length==0){
    this.guardarPostUpdate(publicacion.idPost,publicacion).then(res=>{
      retorno=true;
      return resolve(retorno);
  });
  };
   }).catch(err=>{
     return  err
   })
   
}
agregarImagen(id:string,agregar:any[] ){
  this.db.doc(`publicaciones/${id}`).update({
    imagenPost: firebase.firestore.FieldValue.arrayUnion(agregar)
  });
}
agregarDocumento(id:string,agregar:any[] ){
  this.db.doc(`publicaciones/${id}`).update({
    docsPost: firebase.firestore.FieldValue.arrayUnion(agregar)
  });
}

cicloagregarImagen(id:string, agregar:any[]){
  for(let item of agregar){
      this.agregarImagen(id, item);
  }
}
cicloagregarDocumentos(id:string,agregar:any[]){
  for(let item of agregar){
      this.agregarDocumento(id, item);
  }
}

guardarPostUpdate(id:string, publicacion:Publicacion){
  return this.db.doc(`publicaciones/${id}`).update({
    tipoPost: publicacion.tipoPost,
    categoriaPost: publicacion.categoriaPost,
    estadoPost: publicacion.estadoPost,
    tituloPost: publicacion.tituloPost,
    autorNamePost:  publicacion.autorNamePost,
    fechaPost:  publicacion.fechaPost,
    fechaInicioPost: publicacion.fechaInicioPost,
    fechaFinPost:  publicacion.fechaFinPost,
    descripcionPost:  publicacion.descripcionPost,
    imagenPost:  publicacion.imagenPost,
    autorIdPost:  publicacion.autorIdPost,
    ytUrlPost:  publicacion.ytUrlPost,
    horainicioPost:  publicacion.horainicioPost,
    horafinPost:  publicacion.horafinPost,
    telPost:  publicacion.telPost,
    lugarPost:  publicacion.lugarPost,
    comentarioPost: publicacion.comentarioPost,
    idGrupoPost: publicacion.idGrupoPost,
    nameGroupPost: publicacion.nameGroupPost,
    idUserAprobRech:publicacion.idUserAprobRech
  })
}
getPostIdGroup(idg:string){
  return this.db.collection('publicaciones', ref=>{
    return ref .where('idGrupoPost','==',idg)
  }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
    const data= a.payload.doc.data() as Publicacion;
    const  id = a.payload.doc.id;
    return { id, ...data};
  })
  ))
}

getNoticiasToEliminate(uid:string){
  return this.db.collection('publicaciones', ref=>{
    return ref .where('autorIdPost','==',uid)
  }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
    const data= a.payload.doc.data() as Publicacion;
    const  id = a.payload.doc.id;
    return { id, ...data};
  })
  ))
}
updateViews2(id:string){
  this.db.doc(`publicaciones/${id}`).update({
    viewsPost:firebase.firestore.FieldValue.increment(1)
  });

}
}
