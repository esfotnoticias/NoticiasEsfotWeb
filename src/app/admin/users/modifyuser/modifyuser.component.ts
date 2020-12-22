import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { MyErrorStateMatcher, errorMessages } from 'src/app/models/MyErrorStateMatcher';
import { MatStepper } from '@angular/material/stepper';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import { Notificacion } from 'src/app/models/notificacion';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { MessagingService } from 'src/app/services/messaging.service';
@Component({
  selector: 'app-modifyuser',
  templateUrl: './modifyuser.component.html',
  styleUrls: ['./modifyuser.component.css']
})
export class ModifyuserComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;
  forma: FormGroup;
  usuario: Usuario = new Usuario();
  userc: Usuario= new Usuario();
  admin:string;
  modificar=false;
  errors = errorMessages;
  matcher = new MyErrorStateMatcher();
  perfil=false;
  creden=false;
  notificacion:Notificacion=new Notificacion();
  constructor(private fb: FormBuilder,
              private auth:AuthService,
              private activatedRoute:ActivatedRoute,
              private toastr:ToastrService,
              private  noti:NotificacionService ,
              private message:MessagingService,
              private router:Router) {                         
                this.activatedRoute.params.subscribe(params=>{
                  if(params['id']!=undefined){
                    this.auth.getUser(params['id']).subscribe(resp=>{
                      if(resp!=undefined){
                        this.usuario=resp;
                    
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
                      }
                      this.llenar(this.usuario);
                    })
                  };
                  if(params['ad']!=undefined){
                    this.admin=params['ad'];
                    }
                })
                this.crearFormulario();

              }
  get   rolNoValido(){
  return this.forma.get('rol').invalid && this.forma.get('rol').touched
  }
  get   usuarioVerificadoNoValido(){
  return this.forma.get('usuarioVerificado').invalid && this.forma.get('usuarioVerificado').touched
  }
  ngOnInit(): void {
  }
  crearFormulario(){
    this.forma=this.fb.group({
      nombre  :['',[Validators.required, Validators.minLength(5)] ],
      apellido:['',[Validators.required]],
      email:   ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      genero:  ['',Validators.required],
      fechanacimiento:['',[Validators.required]],
      carrera:['',[Validators.required]],
      rol:['',Validators.required],
      usuarioVerificado:['',Validators.required],
  });
}
 onUpload(forma:FormGroup){
    this.cleanValidatorCarrera(this.usuario,forma);
  if(this.forma.invalid){
    return Object.values(this.forma.controls).forEach(control=>{
      if (control instanceof FormGroup){
        Object.values(control.controls).forEach(control=>control.markAsTouched()) ;
        }else{
          this.myStepper.previous();
          this.myStepper.previous();
          control.markAsTouched();
          return
        }
      });
  }else{
    this.datosPost(forma);

    this.auth.actualizarUserAdmin(this.userc).then(()=>{
      this.noti.guardarNoti(this.userc.uid,this.notificacion);
      this.message.sendPostRequest(this.notificacion.mensaje, this.userc.token).toPromise().then(()=>{}).catch(err=>{});
    });
    this.toastr.success('Ha guardado los cambios con exito', 'El usuario se ha modificado', {
      closeButton:true,
      progressBar:true,
      positionClass:'toast-bottom-left',
      timeOut: 3000,
    });
    this.router.navigate(['admin/modificar', this.admin]);
  }

 }
 datosPost(forma:FormGroup){
  this.userc.uid=this.usuario.uid;
  this.userc.nombre=forma.get('nombre').value;
  this.userc.apellido=forma.get('apellido').value;
  this.userc.email=forma.get('email').value;
  this.userc.genero=forma.get('genero').value;
  this.userc.rol=forma.get('rol').value;
  this.userc.carrera=forma.get('carrera').value;
  this.userc.fechanacimiento=forma.get('fechanacimiento').value;
  this.userc.usuarioVerificado=this.valorVerificar(forma.get('usuarioVerificado').value);

  this.llenarNotify(this.usuario);
 
  }

 reseteo(){


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
      email:    user.email,
      genero:   user.genero,
      fechanacimiento: user.fechanacimiento,
      rol: user.rol,
      usuarioVerificado:pasar,
      carrera:user.carrera
    });
  }
  valorVerificar(valor:string){
    if(valor=='1'){
      return false;
    }else if(valor=='2'){
      return true;
    }
  }


  llenarNotify(usuario:Usuario){
    this.notificacion.iduc=usuario.uid;
    this.notificacion.tipo="";
    this.notificacion.acceso="uservis";
    this.notificacion.idp=usuario.uid;
    if(usuario.photoURL.length!=0){
      this.notificacion.autorimagenNot=usuario.photoURL[0].url;
    }else{
      this.notificacion.autorimagenNot="";
    }
    
    this.notificacion.codigo="";
    this.notificacion.mensaje="Tu cuenta ha sido evaluada ";

   }
}


