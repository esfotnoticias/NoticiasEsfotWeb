import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-docente-crud',
  templateUrl: './event-docente-crud.component.html',
  styleUrls: ['./event-docente-crud.component.css']
})
export class EventDocenteCrudComponent implements OnInit {
public usuario=new Usuario();
valor=false;
  constructor(private auth:AuthService,
   private activatedRoute:ActivatedRoute) {
     this.activatedRoute.params.subscribe(params=>{
       if(params['id']!=undefined){
         
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

  ngOnInit(): void {
  }

}
