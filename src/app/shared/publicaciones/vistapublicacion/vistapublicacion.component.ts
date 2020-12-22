import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CargarCabeceraService } from 'src/app/services/cargar-cabecera.service';
import { Publicacion } from '../../../models/publicaciones';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-vistapublicacion',
  templateUrl: './vistapublicacion.component.html',
  styleUrls: ['./vistapublicacion.component.css']
})
export class VistapublicacionComponent implements OnInit {
  publicacion:Publicacion=new Publicacion();
  images:number;
  doc:number;
  vid:number;
  carousel=0;
  valor=false;
  existe=false;
  constructor(  private activatedRoute:ActivatedRoute,
    private _carga: CargarCabeceraService ) {
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']!=undefined){
        
        this._carga.getPublicacion(params['id']).subscribe(resp=>{
              if(resp){
                this.valor=true;
                this.publicacion=resp;
                if(isNullOrUndefined(resp)){
                    this.existe=false;
                }else{
                  this.existe=true;
                  
                  this.images=this.publicacion.imagenPost.length;
          
                 
                  this.doc=this.publicacion.docsPost.length;
                  this.vid=this.publicacion.ytUrlPost.length;
                }
 
              }else{
                this.valor=true;
                this.existe=false;
              }
             
        })
      }
      })
  }

  ngOnInit(): void {
  }
  preview(){
    if(this.carousel<=this.images && this.carousel>0){
        this.carousel=this.carousel-1;
        
    }

  }

  next(){
    
   
    if(this.carousel<this.images-1 && this.carousel>=0){
      this.carousel=this.carousel +1;
      
    }
  }

}
