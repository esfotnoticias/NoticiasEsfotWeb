import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-see-perfil',
  templateUrl: './see-perfil.component.html',
  styleUrls: ['./see-perfil.component.css']
})
export class SeePerfilComponent implements OnInit {
  usuario: Usuario = new Usuario();
  perfil=false;
  valor=false;
  existe=false;
  constructor(private auth:AuthService,private activatedRoute:ActivatedRoute,) { 
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']!=undefined){
        this.auth.getUser(params['id']).subscribe(resp=>{
          if(resp){
           
            this.valor=true;

            if(isNullOrUndefined(resp)){
              
                this.existe=false;
            }else{
                this.existe=true;
                this.usuario=resp;
                
                if(this.usuario.photoURL.length!=0){
                  this.perfil=true;
                }else{
                  this.perfil=false;
                }
            }
          
          }else{
            this.valor=true;
            this.existe=false;            
          }
        })
      };
  
    })


  }

  ngOnInit(): void {
  }


}
