import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    usuario:Usuario= new Usuario();
    private enviarUsuarioSubject= new Subject<Usuario>();
    enviarUsuarioObservable=this.enviarUsuarioSubject.asObservable();
  constructor() { }

  enviarUsuario(usuario:Usuario){
    this.usuario=usuario;
    this.enviarUsuarioSubject.next(usuario);
  }
}
