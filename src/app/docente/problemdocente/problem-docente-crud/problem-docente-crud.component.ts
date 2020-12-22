import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
@Component({
  selector: 'app-problem-docente-crud',
  templateUrl: './problem-docente-crud.component.html',
  styleUrls: ['./problem-docente-crud.component.css']
})
export class ProblemDocenteCrudComponent implements OnInit {
  public usuario=new Usuario();
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
  valor=false;
  ngOnInit(): void {
  }


}
