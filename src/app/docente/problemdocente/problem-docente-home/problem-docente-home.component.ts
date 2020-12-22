import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-problem-docente-home',
  templateUrl: './problem-docente-home.component.html',
  styleUrls: ['./problem-docente-home.component.css']
})
export class ProblemDocenteHomeComponent implements OnInit {
  usuario:Usuario=new Usuario();
  valor=false;
  constructor(private auth:AuthService, private router: Router,private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']!=undefined){
        
        this.auth.getUser(params['id']).subscribe(
           resp=>{
            this.usuario=resp;
            if(resp!=undefined){
              this.valor=true;
            }
         
           })
      }
   })
   }

  ngOnInit(): void {
  }


}
