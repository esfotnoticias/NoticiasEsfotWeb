import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Router} from '@angular/router';
import { Notificacion } from 'src/app/models/notificacion';
import { MessagingService } from 'src/app/services/messaging.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit  {
  public user$:Observable<any>= this.auth.AFauth.user;
  public checked:boolean=false;
  public url;
  public urlCredencial;
  public usuario:Usuario=new Usuario();
  notificacion:Notificacion=new Notificacion();
  perfil: FileItem[] = [];
  credencial: FileItem[] = [];
  constructor(private auth:AuthService, private router:Router, private message:MessagingService, private carga_imagenes:CargaImagenesService, private  noti:NotificacionService ) {
    this.user$.subscribe(rep=>{
      this.auth.getUser(rep.uid).subscribe(resp=>{
        this.usuario=resp;
      })
    })
   }

  ngOnInit(): void {
  }
  readUrl(event:any) {
       if (event.target.files && event.target.files[0]) {
         var reader = new FileReader();
           var file:FileList =event.target.files;
         var imagencre=this.carga_imagenes.extractFyles(file, this.perfil, 1);
         if(imagencre!=null){
          
           this.perfil.push(imagencre);
         }else{
            this.perfil.splice(0, 1);
            var valor=this.extractImages(file);
            this.perfil.push(valor);
         }

         reader.onload = (event:any) => {
           this.url = event.target.result;
         }
         reader.readAsDataURL(event.target.files[0]);
       }

  }
  readUrlCredencial(event:any) {
       if (event.target.files && event.target.files[0]) {
         var reader = new FileReader();
         var file:FileList =event.target.files;
         var imagencre=this.carga_imagenes.extractFyles(file, this.credencial, 1);
         if(imagencre!=null){
           this.credencial.push(imagencre);
           this.checked=false;
         }else{
            this.credencial.splice(0, 1);
            var valor=this.extractImages(file);
            this.credencial.push(valor);
             this.checked=false;
         }
         reader.onload = (event:any) => {
           this.urlCredencial = event.target.result;
         }
         reader.readAsDataURL(event.target.files[0]);
       }

     }

       eliminar(){
          (<HTMLInputElement>document.getElementById('ima')).value = "";
          this.url="";
         this.perfil.splice(0, 1);
       }
       eliminarCredencial(){
          (<HTMLInputElement>document.getElementById('cre')).value = "";
          this.urlCredencial="";
         this.credencial.splice(0, 1);
       }
       ejecutar(event:any){
         this.readUrl(event)
       }

       ejecutarCredencial(event:any){
         this.readUrlCredencial(event)
       }

       actualizar(form: NgForm){
         if(form.invalid){
           if(this.usuario.rol!='estudiante'){
             if(this.credencial.length==0){
                this.checked=true;
                return;
             }else{
               this.checked=false;

             }
           }else{
             return
           }
         }else{
           if(this.usuario.rol!='estudiante'){
             if(this.credencial.length==0){
               
                this.checked=true;
                return;
             }else{
               this.checked=false;
                this.auth.actualizarPerfil(this.usuario.uid, this.usuario.carrera,this.perfil, this.credencial).then(()=>{
                  this.enviarNotificacion(this.usuario);
                  this.tipodeUsuario(this.usuario);
                });
                 
             }
           }else{

           }

         }
       }

       private extractImages(fileList:FileList){
         for(const property in Object.getOwnPropertyNames(fileList)){
           const tempfile=fileList[property];
               const newFile= new FileItem(tempfile);
               return newFile;
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
          this.router.navigate(['/login']);
          this.auth.logout();
        }else{
    
        }
      }
      enviarNotificacion(usuario:Usuario){
        this.llenarNotify(usuario);
         var $noti=this.auth. getUsuariosNotificarAcAdmin().subscribe(resp=>{
           for(let us of resp){
             this.noti.guardarNoti(us.uid,this.notificacion);
             this.message.sendPostRequest(this.notificacion.mensaje, us.token);
           }
            $noti.unsubscribe();
            return;
         })

      }
      llenarNotify(usuario:Usuario){
        this.notificacion.iduc=usuario.uid;
        this.notificacion.tipo="";
        this.notificacion.acceso="userapr";
        this.notificacion.idp=usuario.uid;
        if(usuario.photoURL.length!=0){
          this.notificacion.autorimagenNot=usuario.photoURL[0].url;
        }else{
          this.notificacion.autorimagenNot="";
        }
        
        this.notificacion.codigo="";
        this.notificacion.mensaje="El usuario"+" "+ usuario.nombre+" "+usuario.apellido +" "+"requiere verificación";
    
       }
}
