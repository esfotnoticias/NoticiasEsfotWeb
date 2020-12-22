import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-news-secre-home',
  templateUrl: './news-secre-home.component.html',
  styleUrls: ['./news-secre-home.component.css']
})
export class NewsSecreHomeComponent implements OnInit {
  usuario:Usuario=new Usuario();
  valor=false;
  constructor(private auth:AuthService, 
    private router: Router,
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
      )}
  })

  }

  ngOnInit() {

  }
  ngAfterViewInit(){
}

}
