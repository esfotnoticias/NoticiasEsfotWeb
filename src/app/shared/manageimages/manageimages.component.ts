import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';

@Component({
  selector: 'app-manageimages',
  templateUrl: './manageimages.component.html',
  styleUrls: ['./manageimages.component.css']
})
export class ManageimagesComponent implements OnInit {
  @Input()cantidad:string;
  @Output() messageEvent = new EventEmitter<FileItem[]>();
  estaSobreElemento = false;
  files: FileItem[]=[];
  datos: any[]=[];
  constructor() { }

  ngOnInit(): void {
  }
  onUpload():void{
   
  }
  eliminar(i:number){
    (<HTMLInputElement>document.getElementById('ima')).value = "";

    this.files.splice(i, 1);
    this.datos.splice(i,1);
      this.messageEvent.emit(this.files);
  }
  enviar(){
    
    this.messageEvent.emit(this.files);
   
  }
  borrar(){
    this.files=[];
    this.datos=[];
  }
  cambiar(canti:string){
    this.cantidad=canti;
    
  }
}
