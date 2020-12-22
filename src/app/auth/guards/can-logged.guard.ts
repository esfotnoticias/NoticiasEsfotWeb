import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CanLoggedGuard implements CanActivate {
  constructor(private auth:AuthService, private router:Router){

  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean  {
    return this.auth.$user.pipe(
      take(1),
      map((user)=> user && this.auth.isAessfot(user)  ),
      tap( canEdit=>{
        if(!canEdit){
          this.auth.$user.subscribe(res=>{
            
          })
          window.alert('Acceso denegado, Inicia sesión');
        }
      })
    );
  }
  tipodeUsuario(usuario:Usuario){
    //firstLogin
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
