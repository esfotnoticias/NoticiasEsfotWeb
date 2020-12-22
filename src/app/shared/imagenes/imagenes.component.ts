import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent implements OnInit {
  @Input()cantidad:string;
  @Output() messageEvent = new EventEmitter<FileItem[]>();
  estaSobreElemento = false;
  files: FileItem[]=[]
  constructor() { }

  ngOnInit(): void {
  }
  onUpload():void{
   
    
  }
  eliminar(i:number){
    (<HTMLInputElement>document.getElementById('ima')).value = "";

    this.files.splice(i, 1);
      this.messageEvent.emit(this.files);
  }
  enviar(){
    
    this.messageEvent.emit(this.files);
  }

}
