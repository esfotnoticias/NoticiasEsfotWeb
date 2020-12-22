import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-docente-crud',
  templateUrl: './news-docente-crud.component.html',
  styleUrls: ['./news-docente-crud.component.css']
})
export class NewsDocenteCrudComponent implements OnInit {
  public usuario=new Usuario();
  id:string;
  valor=false;
  constructor(private auth:AuthService,
   private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {  this.activatedRoute.params.subscribe(params=>{
      if(params['id']!=undefined){
        this.id=params['id'];
        
        this.auth.getUser(params['id']).subscribe(
           resp=>{
            this.usuario=resp;
            if(resp!=undefined){
              this.valor=true;
            }
        }
      )
      }
    })
  }

}
