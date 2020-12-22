import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileItem } from '../models/file-item';
import { ImageValidator } from 'src/app/helpers/imagenValidator';
@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService extends ImageValidator{
private CARPETA_IMAGENES='img';
  constructor(private db:AngularFireStorage) {
    super();
  }

   generateFileName(name: string): string {
     return `${this.CARPETA_IMAGENES}/${new Date().getTime()}_${name}`;
   }


   extractFyles(fileList:FileList, files:FileItem[], num){
     for(const property in Object.getOwnPropertyNames(fileList)){
       const tempfile=fileList[property];
       if(this.canBeUploaded(tempfile, files)){
        let tamanio= files.length;
         if(tamanio<num){
           const newFile= new FileItem(tempfile);
           return newFile;
         }else{
           return null;
         }

       }
     }
   }


   private canBeUploaded(file:File, files:FileItem[]):boolean{
     if(
       !this.checkDropped(file.name, files) &&
       this.validateType(file.type)
     ){
       return true;
     }else{
       return false;
     }
   }

}
