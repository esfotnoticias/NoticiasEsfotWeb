import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router}  from '@angular/router'
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { MessagingService } from 'src/app/services/messaging.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
public existUser=false;
id:string;
numero:string;
user:Usuario;
perfil=false;
valor=false;
public user$:Observable<any>= this.auth.AFauth.user;


  constructor(private auth:AuthService,private message:MessagingService,
              private router:Router) {
                this.user$.subscribe(resp=>{
                  this.id=resp.uid;
                  this.auth.getUser(resp.uid).subscribe(resp=>{
                   
                    if(resp){
                      this.valor=true;
                      this.user=resp;
                      if(this.user.photoURL.length!=0){
                        this.perfil=true;
                      }else{
                        this.perfil=false;
                      }
                    }
                  })
                })
               }

   ngOnInit() {

  }
async salir(){
  try{
    this.auth.actualizarTokenUser(this.user.uid, "").then(res=>{
      this.auth.logout();
      this.router.navigate(['/login']);
    });
   


  }catch(err){
   
  }


}

eliminarcuenta(){
  try{
    this.auth.borrarCuenta();
  }catch(err){
   
  }
}
cantidadNot(mensaje){
  this.numero=mensaje;

  
  
}
noNotificar(){
  this.message.deleteToken();
  try{
    this.auth.actualizarTokenUser(this.user.uid, "").then(res=>{
    });
  }catch(err){
    
  }
}
  

}
