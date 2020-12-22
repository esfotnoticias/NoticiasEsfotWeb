import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MessagingService } from 'src/app/services/messaging.service';
@Component({
  selector: 'app-aeesfothome',
  templateUrl: './aeesfothome.component.html',
  styleUrls: ['./aeesfothome.component.css']
})
export class AeesfothomeComponent implements OnInit {
  public user$:Observable<any>= this.auth.AFauth.user;

  public usuario=new Usuario();
  constructor(private auth:AuthService, private _usuario:UsuarioService, private message:MessagingService) {
      this.obtenerUsuario();
      this.message.requestPermission();
      this.message.listen();
  }

  ngOnInit(): void {
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
