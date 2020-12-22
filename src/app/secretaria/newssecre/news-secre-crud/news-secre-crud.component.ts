import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-news-secre-crud',
  templateUrl: './news-secre-crud.component.html',
  styleUrls: ['./news-secre-crud.component.css']
})
export class NewsSecreCrudComponent implements OnInit {
public usuario=new Usuario();
id:string;
valor=false;
  constructor(
             private auth:AuthService,
              private activatedRoute:ActivatedRoute) {
                this.activatedRoute.params.subscribe(params=>{
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

  ngOnInit(): void {
  }
}
