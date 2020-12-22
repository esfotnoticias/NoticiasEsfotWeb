import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Notificacion } from 'src/app/models/notificacion';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  @Input()  user:Usuario;
  @Input()  id:string;
  @Output() canti = new EventEmitter<number>();
  notis:Notificacion[]=[];
  cantidadNoti:number;
  valorClass:string;
  existe=false;
  valor=false;
  constructor(private notificaciones:NotificacionService) {
      

   }

  ngOnInit(): void {
    
    this.notificaciones.selectNotificaciones(this.id).subscribe(resp=>{
      if(resp){
        this.valor=true;
        if(resp.length!==0){
          this.existe=false;
          this.notis=resp;
          this.cantidadNoti=resp.length;
          this.valorClass=this.classes(resp.length);
          this.canti.emit(this.cantidadNoti);
         
        }else{
          this.cantidadNoti=0;
          this.canti.emit(this.cantidadNoti);
          this.existe=true;
        }
      }
    
    })
    
  }
  classes(num:number){
    if(num==1){
      return '1';
    }else if(num==2){
      return '2';
    }else if(num==3){
      return '3';
    }else if(num==4){
      return '4';
    }else if(num==5){
      return '5';
    }else if(num > 5){
      return 'max';
    }
  }

}
