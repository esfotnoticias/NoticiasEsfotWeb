import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

import { FileItem } from 'src/app/models/file-item';
import { documentValidator } from 'src/app/helpers/documentosValidator';


@Directive({
  selector: '[appNgDocumento]'
})
export class NgDocumentoDirective extends documentValidator{
  @Input()files:FileItem[]=[];
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
    //

    const dataTransfer= this.getDataTransfer(event);
    if(!dataTransfer){
      return;
    }

    this.preventAndStop(event);
      //console.log(dataTransfer);
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
     console.log(valor);
     console.log('entra extractFyles');
     for(const property in Object.getOwnPropertyNames(fileList)){
       const tempfile=fileList[property];
       if(this.canBeUploaded(tempfile)){
         let tamanio= this.files.length;
          let max= (tempfile.size/1024/1024);
         if(tamanio<valor && max<=5){
           const newFile= new FileItem(tempfile);
           this.files.push(newFile);
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

}
