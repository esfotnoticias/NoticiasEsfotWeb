import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-event-secre-crud',
  templateUrl: './event-secre-crud.component.html',
  styleUrls: ['./event-secre-crud.component.css']
})
export class EventSecreCrudComponent implements OnInit {
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
