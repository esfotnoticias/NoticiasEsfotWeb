import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = false;
  mensaje=false;
  errorUser=false;
  errorRol=false;
  usuario: Usuario = new Usuario();
  usuarioparse:Usuario=new Usuario();
  constructor(
              private auth:AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.usuario.photoURL=[];
  }
async login( form: NgForm ) {
  if(form.invalid){
    Object.values(form.controls).forEach(control=>{
        
        control.markAsTouched();
      })
      return
    }

  try{
    const user= await this.auth.login(this.usuario);
      if(user && user.user.emailVerified){
        
        this.auth.getUser(user.user.uid).toPromise().then(resp=>{
              if(resp){
                this.tipodeUsuario(resp);  
              }
          }
        );
      }else if(user){
        this.router.navigate(['/emailverification']);
      }else{
        this.router.navigate(['/registro']);
      }

    }catch(err){
  
      if(err=="Error: The password is invalid or the user does not have a password."){
          this.mensaje=true;
          setTimeout(() => {
            this.mensaje=false;
          }, 3000);
      }else if(err="Error: Too many unsuccessful login attempts. Please try again later."){
    
      }
    }

  }
  async loginGoogle(){
    try{
        const user= await this.auth.loginGoogle();
   
      if(user){
       
        this.usuario.email=user.user.email;
        this.usuario.nombre=user.user.displayName;
        this.usuario.uid=user.user.uid;
        this.usuario.photoURL.push([{name:"", url:user.user.photoURL}]);
       
       
        this.auth.getUser(user.user.uid).subscribe(
          resp=>{
            this.auth.registrar_usurios_g_f(this.usuario);
            if(resp.estado=='nuevo'  && resp.rol!='estudiante'){
            
              this.router.navigate(['/firstlogin', resp.uid]);
            }else if(resp.estado=='activo' && resp.rol!='estudiante'){
             
              this.tipodeUsuario(resp);
            }else{
              this. errorRol=true;
              this.auth.logout();
            }
          }
        )
      }
    }catch(err){

    
    }
  }

  async loginFacebook(){
    try{
      const user= await this.auth.loginFacebook();
      if(user){
        this.usuario.email=user.user.email;
        this.usuario.nombre=user.user.displayName;
        this.usuario.uid=user.user.uid;
        this.usuario.photoURL.push([{name:"", url:user.user.photoURL}]);
        
        var $us =this.auth.getUser(user.user.uid).subscribe(
          resp=>{
           
          if(resp.estado=='nuevo' && resp.rol!='estudiante'){
            
            }else if(resp.estado=='activo' && resp.rol!='estudiante'){
              this.tipodeUsuario(resp);
            }else{
              this. errorRol=true;
              this.auth.logout();
            }
          }
        )
      }
    }catch(err){
      
    }
  }

  tipodeUsuario(usuario:Usuario){
    if(usuario.rol=="administrador"){
      this.router.navigate(['/admin']);
    }else if(usuario.rol=="secretaria"){
      this.router.navigate(['/secretaria']);
    }else if(usuario.rol=="docente"){
      this.router.navigate(['/docente']);
    }else if(usuario.rol=="aeesfot"){
      this.router.navigate(['/aeesfot']);
    }if(usuario.rol=="estudiante"){
        this. errorRol=true;
        setTimeout(() => {
          this. errorRol=false;
        },3000);
        this.auth.logout();
    }
  
  }

}
