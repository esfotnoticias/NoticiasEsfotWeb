import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UrlyoutubeService } from 'src/app/services/urlyoutube.service';
import { AuthService } from 'src/app/services/auth.service';
import { NoticiasService } from 'src/app/services/noticias.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-admin-crud',
  templateUrl: './event-admin-crud.component.html',
  styleUrls: ['./event-admin-crud.component.css']
})
export class EventAdminCrudComponent implements OnInit {
public usuario=new Usuario();
valor=false;
  constructor(
             private auth:AuthService,
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

  ngOnInit() {


}
}
