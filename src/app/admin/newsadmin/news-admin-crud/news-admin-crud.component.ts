import { Component, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-news-admin-crud',
  templateUrl: './news-admin-crud.component.html',
  styleUrls: ['./news-admin-crud.component.css']
})

export class NewsAdminCrudComponent implements OnInit {
  usuario:Usuario=new Usuario();
  valor=false;
  constructor( private auth:AuthService,
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
