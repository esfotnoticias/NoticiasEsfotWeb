import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MessagingService } from 'src/app/services/messaging.service';
@Component({
  selector: 'app-secretariahome',
  templateUrl: './secretariahome.component.html',
  styleUrls: ['./secretariahome.component.css']
})
export class SecretariahomeComponent implements OnInit {
  public user$:Observable<any>= this.auth.AFauth.user;

  public usuario=new Usuario();
  constructor(private auth:AuthService, private _usuario:UsuarioService, private message:MessagingService) {
    this.obtenerUsuario();

  }

  ngOnInit(): void {
    this.user$.pipe().subscribe(resp=>{
      if(resp){
       this.message.requestPermission().subscribe(
         (token) => { 
           
           this.auth.actualizarTokenUser(resp.uid, token);
         },
         (error) => { console.error(error); },  
       );;
         
      }
   })

   this.message.listen();
  }
  obtenerUsuario(){
    let url:string;
     this.user$.pipe().subscribe(resp=>{
         
         url=resp.photoURL;
         this.auth.getUser(resp.uid).subscribe(resp=>{
           
           this.usuario=resp;
         
        

           this._usuario.enviarUsuario(this.usuario);
        
         })


    });

 }
}
