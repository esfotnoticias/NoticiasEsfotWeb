import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ImageValidator } from 'src/app/helpers/imagenValidator';
import { FileItem } from 'src/app/models/file-item';
//import { FileItem } from '../models/file-item';
//import { ImageValidator } from '../helpers/imagenValidator';

@Directive({
  selector: '[appNgImagen]',

})

export class NgImagenDirective extends ImageValidator{
 @Input()files:FileItem[]=[];
 @Input()datos:any[]=[];
 @Input()num:string;
 @Output() mouseOver: EventEmitter<boolean>=new EventEmitter();
 @HostListener('dragover',['$event'])
 onDragEnter(event:any){
   console.log('listener');
   this.preventAndStop(event);
   this.mouseOver.emit(true);
 }
 @HostListener('dragleave',['$event'])
 onDragLeave(){
  // this.preventAndStop(event);
   this.mouseOver.emit(false);
 }
 @HostListener('drop',['$event'])
 onDrop(event:any){
   const dataTransfer= this.getDataTransfer(event);
   if(!dataTransfer){
     return;
   }

   this.preventAndStop(event);
   this.extractFyles(dataTransfer.files);
   this.mouseOver.emit(false);
 }
 @HostListener('change' ,['$event'])
  ngOnChanges (event:any) {
    try{
      if (event.target.files && event.target.files[0]) {
        var file:FileList =event.target.files;
        console.log('entra changes');
        this.extractFyles(file);
        this.mouseOver.emit(false);
      }

    }catch(err){
      //console.log(err)
    }

    }

  private getDataTransfer(event:any){
    return event.dataTransfer
    ?  event.dataTransfer
    :  event.originalEvent.dataTransfer;
  }
  private extractFyles(fileList:FileList):void{
    let valor=parseInt(this.num);
    for(const property in Object.getOwnPropertyNames(fileList)){
      const tempfile=fileList[property];
      if(this.canBeUploaded(tempfile)){
        let tamanio= this.files.length;
        if(tamanio<valor){
          const newFile= new FileItem(tempfile);
          this.files.push(newFile);
          this.imaganes();
          let tamanio= this.files.length;
        }

      }
    }
  }

  private canBeUploaded(file:File):boolean{
    if(
      !this.checkDropped(file.name, this.files) &&
      this.validateType(file.type)
    ){
      return true;
    }else{
      return false;
    }
  }
  private preventAndStop(event:any):void{
    event.preventDefault();
    event.stopPropagation();
  }
  imaganes(){
    var i=this.files.length-1;
    var url:any;
    var reader = new FileReader();
    reader.onload = ()=> {
      url=reader.result;
      this.datos.push(url);
    };
    reader.onerror = function (error) {
       console.log('Error: ', error);
    };
    if(this.files[i].file){
      reader.readAsDataURL(this.files[i].file);
    }
  }

}
