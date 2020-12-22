import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Notificacion } from 'src/app/models/notificacion';
import { Usuario } from 'src/app/models/usuario.model';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  @Input()  notificacion:Notificacion;
  @Input()  user:Usuario;
  valor:boolean=false;
  constructor(private notify:NotificacionService, private publicaciones:PublicacionService) { 
    
  }

  ngOnInit(): void {
    if(this.notificacion){
      this.valor=true;
      
    }

    
  }
  solover(){
    
    this.notify.actualizarEstaNoti(this.user.uid,this.notificacion.idnot)
  }
  vista(){
    this.notify.actualizarEstaNoti(this.user.uid,this.notificacion.idnot);
    this.publicaciones.updateViews2(this.notificacion.idp);
  }
}


