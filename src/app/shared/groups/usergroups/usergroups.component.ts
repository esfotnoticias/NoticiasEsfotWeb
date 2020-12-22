import { Component, OnInit, ElementRef,Renderer2,ViewChild,AfterViewInit,QueryList,ViewChildren, Input } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { GruposService } from 'src/app/services/grupos.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { Grupos } from 'src/app/models/grupos';
import { Router,ActivatedRoute } from '@angular/router';
import { Notificacion } from 'src/app/models/notificacion';
import { MessagingService } from 'src/app/services/messaging.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
@Component({
  selector: 'app-usergroups',
  templateUrl: './usergroups.component.html',
  styleUrls: ['./usergroups.component.css']
})
export class UsergroupsComponent implements OnInit, AfterViewInit {
 
  displayedColumns: string[] = ['nombre', 'apellido', 'email','actions'];
  displayedColumns1: string[] = ['nombre', 'apellido', 'email','actions'];
  dataSource: MatTableDataSource<Usuario>= new MatTableDataSource <Usuario>();
  dataSource1: MatTableDataSource<Usuario>= new MatTableDataSource <Usuario>();
  group:Grupos=new Grupos;
  error=false;
  valor=false;
  notificacion:Notificacion=new Notificacion();
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
   @ViewChild('inputTarget') inputElement: ElementRef;
  constructor(private renderer: Renderer2,private message:MessagingService,private  noti:NotificacionService, private auth:AuthService,private grupos:GruposService,private activatedRoute:ActivatedRoute) { 
    
     this.activatedRoute.params.subscribe(params=>{
    
      if(params['id']!=undefined){

        this.grupos.getGroup(params['id']).subscribe(resp=>{
           this.group=resp;
           this.auth.getUsuariosEstudiantes().subscribe(res=>{
            this.dataSource = new MatTableDataSource<Usuario>(res.filter(f=>!resp.mienbros.includes(f.uid) && (f.grupos.length<9)));
            this.dataSource.paginator = this.paginator.toArray()[0];
            });
            this.auth.getUsuariosEstudiantesinGroup().subscribe(res=>{
              this.dataSource1 = new MatTableDataSource<Usuario>(res.filter(f=>resp.mienbros.includes(f.uid)));         
              this.dataSource1.paginator = this.paginator.toArray()[1];
              });
    
        }
      )
      }
     
  }) 

  }

  ngOnInit(): void {

  }
  ngAfterViewInit(){
    setTimeout(() => {
      this.renderer.setProperty(this.inputElement.nativeElement, 'value', this.group.idGroup);
    },1000);
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  agregarUser(uid:string){

    if(this.group.mienbros.length<this.group.maxmienbrosGroup){
      this.grupos.agregarMiembros(this.group.idg ,uid);
      this.auth.agregarGrupo(uid, this.group.idg);
       this.enviarNotificacion(uid);
    }else{
      this.error=true;
      setTimeout(() => {
        this.error=false;
      }, 3000);
    }
  

  }
  devolverUser(uid:string){
    
    this.grupos.eliminarMienbros(this.group.idg ,uid);
    this.auth.eliminarGrupo(uid, this.group.idg);
    this.enviarNotificacion2(uid);
  }
  enviarNotificacion(id:string){
   
     var $user=this.auth.getUser(id).subscribe(resp=>{
       if(resp){
         this.llenarNotify(resp, this.group);
         this.noti.guardarNoti(resp.uid,this.notificacion);
         this.message.sendPostRequest(this.notificacion.mensaje, resp.token).toPromise().then(()=>{}).catch(err=>{});
         $user.unsubscribe();
       }
     })
  }
  enviarNotificacion2(id:string){
    
     var $user=this.auth.getUser(id).subscribe(resp=>{
       if(resp){
         this.llenarNotify2(resp, this.group);
         this.noti.guardarNoti(resp.uid,this.notificacion);
         this.message.sendPostRequest(this.notificacion.mensaje, resp.token).toPromise().then(()=>{}).catch(err=>{});;
         $user.unsubscribe();
       }
     })
  }
  llenarNotify(usuario:Usuario, grupo:Grupos){
    this.notificacion.iduc=usuario.uid;
    this.notificacion.tipo="";
    this.notificacion.acceso="group";
    this.notificacion.idp=usuario.uid;
    this.notificacion.autorimagenNot="https://firebasestorage.googleapis.com/v0/b/noticias-esfot.appspot.com/o/default%2Fgrupos.jpg?alt=media&token=a55109ea-a7d9-4bbe-b088-1302d117f17f";
    this.notificacion.codigo="";
    this.notificacion.mensaje="Te han agregado al grupo"+" "+ grupo.nameGroup;
   }
   llenarNotify2(usuario:Usuario, grupo:Grupos){
    this.notificacion.iduc=usuario.uid;
    this.notificacion.tipo="";
    this.notificacion.acceso="group";
    this.notificacion.idp=usuario.uid;
    this.notificacion.autorimagenNot="https://firebasestorage.googleapis.com/v0/b/noticias-esfot.appspot.com/o/default%2Fgrupos.jpg?alt=media&token=a55109ea-a7d9-4bbe-b088-1302d117f17f";
    this.notificacion.codigo="";
    this.notificacion.mensaje="Te han eliminado del grupo"+" "+ grupo.nameGroup;
   }
   

}
