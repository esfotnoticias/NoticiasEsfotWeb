import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-aeesfot-crud',
  templateUrl: './news-aeesfot-crud.component.html',
  styleUrls: ['./news-aeesfot-crud.component.css']
})
export class NewsAeesfotCrudComponent implements OnInit {
  public usuario=new Usuario();
  id:string;
  valor=false;
  constructor(private auth:AuthService,
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
