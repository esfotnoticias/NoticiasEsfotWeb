import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-news-admin-home',
  templateUrl: './news-admin-home.component.html',
  styleUrls: ['./news-admin-home.component.css']
})
export class NewsAdminHomeComponent implements OnInit {
    usuario:Usuario=new Usuario();
    valor=false;
  constructor(private auth:AuthService, private router: Router,private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']!=undefined){
        console.log('va ha crear');
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

  ngOnInit() {
    /*
    this.cabecera.getCabeceras().subscribe(resp=>{
      console.log(resp[0].id);
      this.dataSource.data=resp;
    })
    /*
    console.log('se ejecuta')
    this.auth.getUsuarios().subscribe(res=>{
      this.dataSource.data=res;
    });
    this.prueba();
*/
 }



}
