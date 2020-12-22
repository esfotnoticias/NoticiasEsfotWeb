import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanEditGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){

  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean  {
    return this.auth.$user.pipe(
      take(1),
      map((user)=> user && this.auth.isAdministrador(user)),
      tap( canEdit=>{
        if(!canEdit){
          this.auth.$user.subscribe(res=>{
            if(res){
              this.tipodeUsuario(res);
            }else{
              this.router.navigate(['/login']);
            }
          })
          window.alert('Acceso denegado, No tiene los permisos');
        }
      })
    );
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
        this.auth.logout();
        this.router.navigate(['/login']);
    }
  }
  
}
