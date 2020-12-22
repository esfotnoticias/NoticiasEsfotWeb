import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class CanFirstGuard implements CanActivate {
  email:Subscription;
  constructor(private auth:AuthService, private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(resolve => {
      this.auth.AFauth.user.subscribe(user => {        
        if (isNullOrUndefined(user)) {
          this.router.navigate(['/login']);
          return false;
        } else {
          if(!user.emailVerified){
            resolve(true);
          }else{
            this.email=this.auth.$user.subscribe(res=>{
              if(res){
                  this.tipodeUsuario(res);
                  this.email.unsubscribe();
                  resolve(false);
              }
              
            })
          }
        }
      });
    });
  
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
