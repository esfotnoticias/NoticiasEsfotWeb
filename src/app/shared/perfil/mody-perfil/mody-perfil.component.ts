import { Component, OnInit, TemplateRef, ViewChild ,QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { MyErrorStateMatcher, errorMessages } from 'src/app/models/MyErrorStateMatcher';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ValidadoresService } from 'src/app/services/validadores.service';
import { FileItem } from 'src/app/models/file-item';
import {ManageimagesComponent} from 'src/app/shared/manageimages/manageimages.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Notificacion } from 'src/app/models/notificacion';
import { MessagingService } from 'src/app/services/messaging.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
@Component({
  selector: 'app-mody-perfil',
  templateUrl: './mody-perfil.component.html',
  styleUrls: ['./mody-perfil.component.css']
})
export class ModyPerfilComponent implements OnInit {
  @ViewChildren(ManageimagesComponent) hijo= new QueryList<ManageimagesComponent>();
  @ViewChild('lgModal') public childModal:ModalDirective;
  @ViewChild('lgCreden') public childCred:ModalDirective;
  @ViewChild('template') public childconfirm:ModalDirective;
  forma: FormGroup;
  forma2: FormGroup;
  formaingresar: FormGroup;
  usuario: Usuario = new Usuario();
  userc: Usuario= new Usuario();
  errors = errorMessages;
  matcher = new MyErrorStateMatcher();
  perfil=false;
  creden=false;
  valor=false;
  hide = false;
  step = 0;
  incorrecta=false;
  contrasenia=false;
  filesImagenCuerpo: FileItem[]=[];
  filesImagenCreden: FileItem[]=[];
  notificacion:Notificacion=new Notificacion();
  constructor(private fb: FormBuilder,
    private auth:AuthService,
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService,
    private router:Router,
    private message:MessagingService,
    private  noti:NotificacionService ,
    private validaciones: ValidadoresService) {
      this.activatedRoute.params.subscribe(params=>{
      if(params['id']!=undefined){
        this.auth.getUser(params['id']).subscribe(resp=>{
          if(resp!=undefined){
            this.usuario=resp;
            this.valor=true;
            if(this.usuario.photoURL.length!=0){
              this.perfil=true;
            }else{
              this.perfil=false;
            }
            if(this.usuario.credencial.length!=0){
              
              this.creden=true;    
            }else{
              this.creden=false;
            }
            this.llenar(this.usuario);
          }
         
        })
      };
  
    })
      this.crearFormulario();
      this.crearPassword();
      this.reingresar()
     }

  ngOnInit(): void {
  }
  crearFormulario(){
    this.forma=this.fb.group({
        nombre  :['',[Validators.required,Validators.pattern('[a-zA-Z ]{0,20}')] ],
        apellido:['',[Validators.required,Validators.pattern('[a-zA-Z ]{0,20}')]],
        genero:  ['',Validators.required],
        carrera:['',Validators.required],
        fechanacimiento:['',[Validators.required]],
      }
      );
  }
  crearPassword(){
    this.forma2=this.fb.group({
        password:['',[Validators.required, Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
        password1:['', [Validators.required]]
    },
    {
      validators: this.validaciones.passwordsIguales('password', 'password1'),
    })
  }

  reingresar(){
    this.formaingresar=this.fb.group({
      ingresar:['',[Validators.required]]
      
  })
}


onUpload(forma:FormGroup){
  this.cleanValidatorCarrera(this.usuario,forma);
    if(this.forma.invalid){
      
      return Object.values(this.forma.controls).forEach(control=>{
        if (control instanceof FormGroup){
          Object.values(control.controls).forEach(control=>control.markAsTouched()) ;
          }else{
            control.markAsTouched();
          }
        });
    }else{  
       this.datosPost(this.forma);
       
       this.auth.actuliazarCuentaUsuario(this.userc).then(()=>{
        this.toastr.success('Tu cuenta se ha modificado con exito', 'Tus datos se han modificado', {
          closeButton:true,
          progressBar:true,
          positionClass:'toast-bottom-left',
          timeOut: 3000,
        });
       });
    }
  }
  resetPassword(forma:FormGroup){
      if(this.forma2.invalid){
        return Object.values(this.forma2.controls).forEach(control=>{
          if (control instanceof FormGroup){
            Object.values(control.controls).forEach(control=>control.markAsTouched()) ;
            }else{
              control.markAsTouched();
            }
          });
      }else{  
        this.datosPassword(this.forma2);
        this.auth.changePassword(this.userc.password).then(()=>{
          this.toastr.success('Tu contraseña se ha cambiado con exito', 'Tus datos se han modificado', {
            closeButton:true,
            progressBar:true,
            positionClass:'toast-bottom-left',
            timeOut: 3000,
          });
        });
      }
    }

    ingresar(forma:FormGroup){
      if(this.formaingresar.invalid){
       
         return Object.values(this.forma.controls).forEach(control=>{
           if (control instanceof FormGroup){
             Object.values(control.controls).forEach(control=>control.markAsTouched()) ;
             }else{
               control.markAsTouched();
             }
           });
       }else{  
          this.auth.AFauth.signInWithEmailAndPassword(this.usuario.email, this.formaingresar.get('ingresar').value).then(()=>{
            this.contrasenia=true;
          }).catch(err=>{
            
            this.incorrecta=true;
          });
       }
    }

  decline(){
    
  }
  confirm(){
    this.enviarNotificacion(this.usuario);
    this.childconfirm.hide();
    this.toastr.success('Tu cuenta se a enviado a verficar', 'Este proceso puede tardar', {
      closeButton:true,
      progressBar:true,
      positionClass:'toast-bottom-left',
      timeOut: 3000,
    });
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
   enviarNotificacion(usuario:Usuario){
    this.llenarNotify(usuario);
     var $noti=this.auth.getUsuariosNotificarAcAdmin().subscribe(resp=>{
       let i=0;
       let tamanio=resp.length;
       for(let us of resp){
         i++;
         this.noti.guardarNoti(us.uid,this.notificacion);
         this.message.sendPostRequest(this.notificacion.mensaje, us.token).toPromise().then(()=>{}).catch(err=>{});
         if(i==tamanio){
          $noti.unsubscribe();
         }
        }
     })

  }
 
  cuerpo($event:FileItem[]) {
    this.filesImagenCuerpo = $event;
    }
  credencial($event:FileItem[]) {
    this.filesImagenCreden = $event;
  }

    guardarPerfil(){
      
      this.auth.updateUserwithImg(this.filesImagenCuerpo, this.usuario.uid).then(()=>{
        this.filesImagenCuerpo=[];
        this.hijo.toArray()[0].borrar();
        this.childModal.hide();
      });
    }
    guardarCreden(){
     
      this.auth.updateUserwithCre(this.filesImagenCreden, this.usuario.uid).then(()=>{
        this.filesImagenCreden=[];
        this.hijo.toArray()[1].borrar();
        this.childCred.hide();
      });
    
    }
    llenar(user:Usuario){
      var pasar="";
      if(user.fechanacimiento!=null){
        var j=parseInt(user.fechanacimiento['seconds']);
        var k=new Date(j*1000);
        user.fechanacimiento=k;
      }
      if(user.usuarioVerificado!=null){
        if(user.usuarioVerificado==true){
            pasar="2";
        }else{
            pasar="1";
        }
      }
      this.forma.reset({
        nombre  : user.nombre,
        apellido: user.apellido,
        genero:   user.genero,
        fechanacimiento: user.fechanacimiento,
        carrera:user.carrera
      });
    }
    cleanValidatorCarrera(user:Usuario,forma:FormGroup){
      if(user.rol=='secretaria'){
        forma.get('carrera').clearValidators()
        forma.get('carrera').updateValueAndValidity();
        this.userc.carrera=user.carrera;
      }if(user.rol=='aeesfot'){
         this.userc.carrera=forma.get('carrera').value;
      }else if(user.rol=='estudiante'){
        this.userc.carrera=forma.get('carrera').value;
      }else if(user.rol=='administrador'){
        forma.get('carrera').clearValidators()
        forma.get('carrera').updateValueAndValidity();
        this.userc.carrera=user.carrera;
      }else if(user.rol=='docente'){
        this.userc.carrera=forma.get('carrera').value;
      }else if(user.rol=='invitado'){
        forma.get('carrera').clearValidators()
        forma.get('carrera').updateValueAndValidity();
        this.userc.carrera=user.carrera;
      }
     }
    datosPost(forma:FormGroup){
      this.userc.uid=this.usuario.uid;
      this.userc.nombre=forma.get('nombre').value;
      this.userc.apellido=forma.get('apellido').value;
      this.userc.genero=forma.get('genero').value;
      this.userc.fechanacimiento=forma.get('fechanacimiento').value;
      
    }

    datosPassword(forma:FormGroup){
      this.userc.password1=forma.get('password1').value;
      this.userc.password=forma.get('password').value;
    }
    setStep(index: number) {
      this.step = index;
    }
  
    nextStep() {
      this.step++;
    }
  
    prevStep() {
      this.step--;
    }
}
