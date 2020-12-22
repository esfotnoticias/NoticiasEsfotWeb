import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  @Input()cantidad:string;
  @Output() messageEvent = new EventEmitter<FileItem[]>();
  estaSobreElemento = false;
  files: FileItem[]=[]
  constructor() { }

  ngOnInit(): void {
  }
  onUpload(){

  }
  eliminar(i:number){
    this.files.splice(i, 1);
    this.messageEvent.emit(this.files);
  }
  enviar(){
    this.messageEvent.emit(this.files);
  }
  borrar(){
    this.files=[];
  }
  cambiar(canti:string){
    this.cantidad=canti;
    console.log(this.cantidad)
  }
}
