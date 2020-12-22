import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { NotificacionService } from 'src/app/services/notificacion.service';

//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit, OnDestroy {
public user$:Observable<any>= this.auth.AFauth.user;
public mes$:Observable<any>;
public usuario=new Usuario();
  constructor(private auth:AuthService, private _usuario:UsuarioService, private message:MessagingService, private noti:NotificacionService) {
    this.obtenerUsuario();
    
  }
  ngOnDestroy(): void {
   
  }

  ngOnInit(): void {
    this.user$.pipe().subscribe(resp=>{
       if(resp){
        
        if(resp.token==""){
          
           this.message.requestPermission().subscribe(
            (token) => { 
               
              this.auth.actualizarTokenUser(resp.uid, token);
            },
            (error) => { console.error(error); },  
          );
        }else{
          this.message.requestPermission().subscribe(
            (token) => { 
             
              this.auth.actualizarTokenUser(resp.uid, token);
            },
            (error) => { console.error(error); },  
          );
        }
    
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
