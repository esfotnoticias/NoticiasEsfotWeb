import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cabecera } from '../models/cabecera';
import { FileItem } from '../models/file-item';
import * as firebase from 'firebase';
import { Noticias } from '../models/noticias.modelo';

@Injectable({
  providedIn: 'root'
})

export class NoticiasService {
  public cabecera=new Cabecera();
  public storageRef=firebase.storage().ref();
  constructor( private db:AngularFirestore) { }

   almacenarArchivos(imagenes:FileItem[], carpeta:string):Promise<any[]>{
     
      let images=[];
    return new Promise<any[]>( (resolve)=>{
      let i=0;
    for (const item of imagenes){

      item.uploading=true;
      if(item.progreso>=100){

        continue;
      }
      var fec= new Date().getTime()

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

guardarPortada(cabecera:Cabecera){
  
   return this.db.collection('cabecera').add({
    uid_User:cabecera.uid,
    nombre_User:cabecera.nombre_User,
    cargo_User:cabecera.cargo_User,
    photoUrl_User:cabecera.photoUrl_User,
    titulo_cabecera:cabecera.titulo_cabecera,
    descrip_cabecera:cabecera.descrip_cabecera,
    imagen_cabecera:cabecera.imagen_cabecera,
    estado_cabecera:cabecera.estado_cabecera,
    tipo_cabecera:cabecera.tipo_cabecera,
    fecha_pub_cabecera:cabecera.fecha_pub_cabecera,
    visulizaciones:cabecera.visulizaciones
  });

}

async guardarNoticia(cabecera:Cabecera, noticias:Noticias, imagenPortada:FileItem[], imagenesCuerpo:FileItem[], documentos:FileItem[]){
  let carpeta="cabecera";
  let cuerpo="cuerpo";
  let doc="doc";
  let news="noticias";
 

  if( imagenPortada.length!=0){
      await this.almacenarArchivos(imagenPortada, carpeta).then(resp=>{
      
        cabecera.imagen_cabecera=resp;
       this.guardarPortada(cabecera).then(resp=>{
         
         noticias.cuid=resp.id;
         if(imagenesCuerpo.length!=0){
           this.almacenarArchivos(imagenesCuerpo,news).then(resp=>{
             noticias.imagenes=resp;

              this.almacenarArchivos(documentos, doc).then(resp=>{

               noticias.documentos_cuerpo=resp;
               this.guardarCuerpo(noticias, noticias.cuid)
             })
           }
           );
         }else if(documentos.length!=0){
           this.almacenarArchivos(documentos, doc).then(resp=>{

             noticias.documentos_cuerpo=resp;
             this.guardarCuerpo(noticias, noticias.cuid)
           })
         }

       })

      });

  }else{
    this.guardarPortada(cabecera).then(resp=>{
       noticias.cuid=resp.id;
    }
    );
  }





}

guardarCuerpo(noticia:Noticias, cuid:string){
  const result= this.db.doc(`noticias/${cuid}`).set({
    detalle_cuerpo:noticia.detalle_cuerpo,
    documentos_cuerpo:noticia.documentos_cuerpo,
    imagenes:noticia.imagenes,
    url_yt_cuerpo:noticia.url_yt_cuerpo
  })
return result
}

guardarNotificacion(){

}

async saveNews(cabecera:Cabecera, noticias:Noticias, imagenPortada:FileItem[], imagenesCuerpo:FileItem[], documentos:FileItem[]){
    let carpeta="cabecera";
    let cuerpo="cuerpo";
    let doc="doc";
    let news="noticias";
    if(imagenPortada.length!=0 && imagenesCuerpo.length!=0 && documentos.length!=0){
      await this.almacenarArchivos(imagenPortada, carpeta).then(resp=>{
        cabecera.imagen_cabecera=resp;
       this.guardarPortada(cabecera).then(resp=>{
         noticias.cuid=resp.id;
         this.almacenarArchivos(imagenesCuerpo, news).then(resp=>{
           noticias.imagenes=resp;
           this.almacenarArchivos(documentos, doc).then(resp=>{
            noticias.documentos_cuerpo=resp;
            this.guardarCuerpo(noticias, noticias.cuid)
          })
         })
       })
      })

    }else if(imagenPortada.length==0 && imagenesCuerpo.length!=0 && documentos.length!=0){
      cabecera.imagen_cabecera=[];
      this.guardarPortada(cabecera).then(resp=>{
        noticias.cuid=resp.id;
        this.almacenarArchivos(imagenesCuerpo, news).then(resp=>{
          noticias.imagenes=resp;
          this.almacenarArchivos(documentos, doc).then(resp=>{
           noticias.documentos_cuerpo=resp;
           this.guardarCuerpo(noticias, noticias.cuid)
         })
        })
      })

    }else if( imagenPortada.length==0 && imagenesCuerpo.length==0 &&documentos.length!=0){
      cabecera.imagen_cabecera=[];
      noticias.imagenes=[];
      this.guardarPortada(cabecera).then(resp=>{
        noticias.cuid=resp.id;
          this.almacenarArchivos(documentos, doc).then(resp=>{
           noticias.documentos_cuerpo=resp;
           this.guardarCuerpo(noticias, noticias.cuid)
         })

      })


    }else if( imagenPortada.length==0 && imagenesCuerpo.length!=0 &&documentos.length==0){
      cabecera.imagen_cabecera=[];
      noticias.documentos_cuerpo=[];
      this.guardarPortada(cabecera).then(resp=>{
        noticias.cuid=resp.id;
          this.almacenarArchivos(imagenesCuerpo, news).then(resp=>{
             noticias.imagenes=resp;
           this.guardarCuerpo(noticias, noticias.cuid)
         })

      })
    }else if( imagenPortada.length!=0 && imagenesCuerpo.length==0 &&documentos.length!=0){
      noticias.imagenes=[];;
      this.almacenarArchivos(imagenPortada, carpeta).then(resp=>{
        cabecera.imagen_cabecera=resp;
       this.guardarPortada(cabecera).then(resp=>{
         noticias.cuid=resp.id;
           this.almacenarArchivos(documentos, doc).then(resp=>{
            noticias.documentos_cuerpo=resp;
            this.guardarCuerpo(noticias, noticias.cuid)
          })
       })
      })


    }else if( imagenPortada.length!=0 && imagenesCuerpo.length==0 &&documentos.length==0){
      noticias.imagenes=[];
      noticias.documentos_cuerpo=[];
      this.almacenarArchivos(imagenPortada, carpeta).then(resp=>{
      cabecera.imagen_cabecera=resp;
       this.guardarPortada(cabecera).then(resp=>{
            noticias.cuid=resp.id;
            this.guardarCuerpo(noticias, noticias.cuid)

       })
      })
    }else if( imagenPortada.length!=0 && imagenesCuerpo.length!=0 &&documentos.length==0){
      noticias.documentos_cuerpo=[];
      this.almacenarArchivos(imagenPortada, carpeta).then(resp=>{
        cabecera.imagen_cabecera=resp;
       this.guardarPortada(cabecera).then(resp=>{
         noticias.cuid=resp.id;
           this.almacenarArchivos(imagenesCuerpo, news).then(resp=>{
            noticias.imagenes=resp;
            this.guardarCuerpo(noticias, noticias.cuid)
          })
       })
      })
    }else if( imagenPortada.length==0 && imagenesCuerpo.length==0 &&documentos.length==0){
      noticias.imagenes=[];
      cabecera.imagen_cabecera=[];
      noticias.documentos_cuerpo=[];
       this.guardarPortada(cabecera).then(resp=>{
         noticias.cuid=resp.id;
           this.guardarCuerpo(noticias, noticias.cuid)
       })
    }
}
/*
generateFileName(name: string): string {
  return `${this.CARPETA_IMAGENES}/${new Date().getTime()}_${name}`;
}
*/

}
