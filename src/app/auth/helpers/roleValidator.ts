
import { Usuario } from 'src/app/models/usuario.model';

export class RoleValidator{
    isAdministrador(usuario:Usuario):boolean{
        return usuario.rol==='administrador';
    }
    isSecretaria(usuario:Usuario):boolean{
        return usuario.rol==='secretaria';
    }
    isDocente(usuario:Usuario):boolean{
        return usuario.rol==='docente';
    }
    isAessfot(usuario:Usuario):boolean{
        return usuario.rol==='aeesfot';
    }
   islogged(usuario:Usuario):boolean{
    if(usuario){
        return true;
    }else{
        return false;
    }
   }
}
