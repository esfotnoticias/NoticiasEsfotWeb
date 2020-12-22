import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Publicacion } from 'src/app/models/publicaciones';
import { Router, ActivatedRoute } from '@angular/router';
import {PublicacionService} from '../../services/publicacion.service'
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
@Input() publicacion:Publicacion;
@Input()  index:number;
@Output() cabeceraSeleccionada:EventEmitter<number>;
imagenes=false;
  constructor(private router:Router,private activatedRoute:ActivatedRoute, private publicaciones:PublicacionService) {
   /*
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']!=undefined){
        /*

        console.log('va ha crear');
        this.auth.getUser(params['id']).subscribe(
           resp=>{
            this.usuario=resp;
            console.log(this.usuario);
            this.router.navigate(['/registro']);
        }
      )*/
      /* }
      })
  */
  }

  ngOnInit(): void {
    if(this.publicacion.imagenPost.length!=0){
      this.imagenes=true;
    }else{
      this.imagenes=false;

    }
  }
  navegar(id:string){
    console.log(id+'si realiza la accion bro');
    this.publicaciones.updateViews(this.publicacion.idPost, this.publicacion.viewsPost);
  }
}
