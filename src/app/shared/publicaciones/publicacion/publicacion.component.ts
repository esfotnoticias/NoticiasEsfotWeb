import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileItem } from 'src/app/models/file-item';
import { UrlyoutubeService } from 'src/app/services/urlyoutube.service';
import { Publicacion } from 'src/app/models/publicaciones';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { MyErrorStateMatcher, errorMessages } from 'src/app/models/MyErrorStateMatcher';
import { GruposService } from 'src/app/services/grupos.service';
import  { Grupos } from 'src/app/models/grupos';
import {ManageimagesComponent} from 'src/app/shared/manageimages/manageimages.component';
import {DocumentosComponent} from 'src/app/shared/documentos/documentos.component';
import { MatStepper } from '@angular/material/stepper';
import { MessagingService } from 'src/app/services/messaging.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { Notificacion } from 'src/app/models/notificacion';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ValidadoresService } from 'src/app/services/validadores.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit, AfterViewInit {
   @Input()tipo:string;
   @Input()user:Usuario;
   @ViewChild(ManageimagesComponent) hijo: ManageimagesComponent;
   @ViewChild(DocumentosComponent) hijo2: DocumentosComponent;
   @ViewChild('stepper') private myStepper: MatStepper;
   @ViewChild('lgModal') public childModal:ModalDirective;
   firstFormGroup: FormGroup;
   errors = errorMessages;
   usuario:Usuario=new Usuario();
   posteo:Publicacion=new Publicacion();
   notificacion:Notificacion=new Notificacion();
   conjuntoGrupos:Grupos[]=[];
   conjuntoGrupuosId:string[]=[];
   mensajeNotify:string;
   linkerror=false;
   guardar=false;
   fail=false;
   step = -1;
   categorias:  string[] = ['Oferta laboral','Oferta de pasantias','Actividad académica','Actividad cultural','Comunicados oficiales','Otros'];
   secretaria:  string[] = ['Dirección ESFOT','Subdirección ESFOT'];
   solicitudes: string[] = ['Problema','Emergencia'];
   publicar   : string[] = [];
   filesDocuments: FileItem[]=[];
   filesImagenCuerpo: FileItem[]=[];
   matcher = new MyErrorStateMatcher();
    private all:any=Subscription;
  constructor(private fb: FormBuilder,
              
              private publicacion:PublicacionService,
              private grupos:GruposService,
               private message:MessagingService,
               private auth:AuthService,
               private toastr:ToastrService,
               private validaciones: ValidadoresService,
               private  noti:NotificacionService) {
                this.crearFormulario(); 
   }

  ngOnInit(): void {
  
 
  }
  ngAfterViewInit(){
    setTimeout(() => {
     this.llenarGrupos(this.user);
    }, 1000);
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
  get tituloPost(){
  return this.firstFormGroup.get('tituloPost').invalid && this.firstFormGroup.get('tituloPost').touched;
  }
  get descripcionPost(){
  return this.firstFormGroup.get('descripcionPost').invalid && this.firstFormGroup.get('descripcionPost').touched;
  }

  get fechaInicioPost(){
  return this.firstFormGroup.get('fechaInicioPost').invalid && this.firstFormGroup.get('fechaInicioPost').touched;
  }
  get fechaFinPost(){
  return this.firstFormGroup.get('fechaFinPost').invalid && this.firstFormGroup.get('fechaFinPost').touched;
  }
  get categoriaPost(){
  return this.firstFormGroup.get('categoriaPost').invalid && this.firstFormGroup.get('categoriaPost').touched;
  }
  get autorNamePost(){
  return this.firstFormGroup.get('autorNamePost').invalid && this.firstFormGroup.get('autorNamePost').touched;
  }
  get telPost(){
    return this.firstFormGroup.get('telPost').invalid && this.firstFormGroup.get('telPost').touched;
  }
  get nyoutubelinks(){
    return this.firstFormGroup.get('nyoutubelinks') as FormArray;
  }
  crearFormulario(){
    this.firstFormGroup = this.fb.group({
     tituloPost: ['', [Validators.required,Validators.maxLength(40)]],
     descripcionPost:['', Validators.required],
     fechaInicioPost: ['', Validators.required],
     fechaFinPost: [''],
     categoriaPost: ['', Validators.required],
     autorNamePost: ['', Validators.required],
     horainicioPost: [''],
     horafinPost: [''],
     telPost: ['', [Validators.pattern('^[0-9]+'),Validators.maxLength(10)]],
     lugarPost: [''],
     nameGroupPost: ['',[Validators.required]],
     nyoutubelinks: this.fb.array([
     ])
   },{
    validators: [this.validaciones.fechaMayor2('fechaInicioPost', 'fechaFinPost'),this.validaciones.horaMayor('horainicioPost','horafinPost')]
   });
   this.matcher = new MyErrorStateMatcher()
  }
  onUpload(forma:FormGroup){
  
    this.validarRol(forma);
    this.validartipo(forma);
    if(this.firstFormGroup.invalid){
      if(this.nyoutubelinks.length==0){
      }else{
        for(var i=0; i<this.nyoutubelinks.length;i++){
          this.nyoutubelinks.get(i.toString()).markAsTouched;
          if(this.nyoutubelinks.get(i.toString()).invalid){
            this.nyoutubelinks.get(i.toString()).setErrors;
          }
        }
      }
      
    return Object.values(this.firstFormGroup.controls).forEach(control=>{
      if (control instanceof FormGroup){
        Object.values(control.controls).forEach(control=>control.markAsTouched()) ;
        }else{
          control.markAsTouched();
          this.myStepper.previous();
          this.myStepper.previous();
          return;
        }
      });
  }else{
    this.datosPost(forma);
    this.childModal.show();
    this.publicacion.savePublicacion(this.posteo, this.filesImagenCuerpo, this.filesDocuments).then(resp=>{
      if(resp!="error"){
        this.guardar=true;
      }else{
        this.guardar=false;
      }
      this.toastr.success('Tu publicación ha sido subida con exito', '', {
        closeButton:true,
        progressBar:true,
        positionClass:'toast-bottom-left',
        timeOut: 3000,
      });
      this.notificaciones(this.user ,this.posteo, resp.id);
      this.llenarDatos(this.user);
      this.childModal.hide();
      setTimeout(() => {
        this.guardar=false;
      }, 5000);

    }).catch(()=>{
        this.fail=true;
        setTimeout(() => {
          this.fail=false;
        }, 5000);
    });
    return;
  }

  }
  notificaciones(user:Usuario, publica:Publicacion, idp:string){
    this.llenarNotify(publica, idp);
    this.validarRolNoti(user);
   
    if(publica.idGrupoPost=='Global'){
        let $suscription=this.auth.getUsuariosNotificarAll().subscribe( resp=>{
        
        let tamanio=resp.filter((resp)=>resp.uid!=user.uid).length;
        var i=0;
        for(let us of resp.filter((resp)=>resp.uid!=user.uid)){
          i++;
          this.noti.guardarNoti(us.uid,this.notificacion);
          this.message.sendPostRequest(this.notificacion.mensaje, us.token).toPromise().then((data)=>{}).catch(err=>{});
          if(i==tamanio){
             
             $suscription.unsubscribe();   
          }else{
            continue;
          }
        }
  
      })
    }else{

   

      let $suscription=this.grupos.getGroup(publica.idGrupoPost).subscribe( res=>{
        let $suscription1=this.auth.getUsuariosNotificarGroup(res.mienbros).subscribe(resp=>{
          var i=0;
          let tamanio=(resp.filter(re=>res.mienbros.includes(re.uid) && re.uid!=user.uid)).length;
          for(let us of resp.filter(re=>res.mienbros.includes(re.uid) && re.uid!=user.uid)){
            i++;
            this.noti.guardarNoti(us.uid,this.notificacion);
              this.message.sendPostRequest(this.notificacion.mensaje, us.token).toPromise().then((data)=>{}).catch(err=>{});
              if(i==tamanio){
                
                $suscription1.unsubscribe(); 
                $suscription.unsubscribe();  
                
             }else{
               continue;
             }
          }
           
            
        })
      })
     
    }

  }
  agregarLinkYoutube(){
      let valor=this.nyoutubelinks.length;
      if(valor==0){
        this.nyoutubelinks.push(this.fb.control(
        '', [Validators.required, Validators.pattern('^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+')]
        ));
      }else if(valor<=2){
        this.linkerror=false;
        let refe= valor-1;
        this.nyoutubelinks.get(refe.toString()).markAsTouched;
        if(this.nyoutubelinks.get(refe.toString()).invalid){
            this.nyoutubelinks.get(refe.toString()).setErrors;
            this.linkerror=true;
        }else{
          this.nyoutubelinks.push(this.fb.control(
         '', [Validators.required, Validators.pattern('^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+')]
          ));
        }
      }else if(valor>2){
      }
  }

  borrarLinkYoutube(i:number){
    this.nyoutubelinks.removeAt(i);
  }
  documents($event:FileItem[]) {
    this.filesDocuments = $event;
  }
  cuerpo($event:FileItem[]) {
  this.filesImagenCuerpo = $event;
  }

  validartipo(forma:FormGroup){
    if(this.tipo=='noticia'){
       
       forma.get('fechaFinPost').clearValidators()
       forma.get('fechaFinPost').updateValueAndValidity();
       forma.get('fechaInicioPost').clearValidators();
       forma.get('fechaInicioPost').updateValueAndValidity();
    }else if(this.tipo=='evento'){
       forma.get('categoriaPost').setValue('Eventos');
    }else if(this.tipo=='solicitud'){
      forma.get('fechaInicioPost').clearValidators();
      forma.get('fechaInicioPost').updateValueAndValidity();
      forma.get('fechaFinPost').clearValidators();
      forma.get('fechaFinPost').updateValueAndValidity();
    }
  }

  validarRol(forma:FormGroup){
    if(this.user.rol=='secretaria'){
      this.posteo.autorNamePost=forma.get('autorNamePost').value;
      this.posteo.autorIdPost=this.user.uid;
      this.posteo.autorImagenPost='https://firebasestorage.googleapis.com/v0/b/noticias-esfot.appspot.com/o/default%2F09102020esfot01.jpg?alt=media&token=090239b5-ccae-4094-86cf-1af382854385';
      this.posteo.estadoPost='aprobado';
    }if(this.user.rol=='aeesfot'){
      forma.get('autorNamePost').setValue('AEESFOT');
      this.posteo.autorIdPost=this.user.uid;
      this.posteo.autorImagenPost='https://firebasestorage.googleapis.com/v0/b/noticias-esfot.appspot.com/o/default%2F09102020aeesfot01.png?alt=media&token=bf86ade7-868c-4b6e-a1de-1791b064b6e4';
      this.posteo.estadoPost='aprobado';
    }else if(this.user.rol=='estudiante'){
      forma.get('autorNamePost').setValue(this.user.nombre+" "+this.user.apellido);
      this.posteo.autorIdPost=this.user.uid;
      this.posteo.autorImagenPost=this.imagenUsuario(this.user);
      this.posteo.estadoPost='pendiente';
    }else if(this.user.rol=='administrador' || this.user.rol=='docente'){
      forma.get('autorNamePost').setValue(this.user.nombre+" "+this.user.apellido);
      this.posteo.autorIdPost=this.user.uid;
      this.posteo.autorImagenPost=this.imagenUsuario(this.user);
      this.posteo.estadoPost='aprobado';
    }
  }


  datosPost(forma:FormGroup){
    this.posteo.tituloPost=forma.get('tituloPost').value;
    this.posteo.descripcionPost=forma.get('descripcionPost').value;
    this.posteo.fechaInicioPost=forma.get('fechaInicioPost').value;
    this.posteo.fechaFinPost=forma.get('fechaFinPost').value;
    this.posteo.autorNamePost=forma.get('autorNamePost').value;
    this.posteo.ytUrlPost=forma.get('nyoutubelinks').value;
    this.posteo.categoriaPost=forma.get('categoriaPost').value;
    this.posteo.horainicioPost=forma.get('horainicioPost').value;
    this.posteo.horafinPost=forma.get('horafinPost').value;
    this.posteo.lugarPost=forma.get('lugarPost').value;
    this.posteo.telPost=forma.get('telPost').value;
    this.posteo.nameGroupPost=this.publicar[forma.get('nameGroupPost').value];
    this.posteo.idGrupoPost=this.conjuntoGrupuosId[forma.get('nameGroupPost').value];
    this.posteo.comentarioPost="";
    this.posteo.docsPost=[];
    this.posteo.imagenPost=[];
    this.posteo.viewsPost=0;
    this.posteo.tipoPost=this.datos(this.tipo);   
  }
  imagenUsuario(user:Usuario):string{
    if(user.photoURL.length!=0){
      return user.photoURL[0].url;
    }else{
      return "";
    }
  }
  datos(tip:string):string{
    var valor:string;
    if(tip=='noticia'){
      valor='Noticias';

    }else if(tip=='evento'){
      valor='Eventos'
    }else if(tip=='solicitud'){
      valor='Solicitudes'
    }
    return valor;
  }
  llenarNotify( publica:Publicacion, idp:string){
   this.notificacion.iduc=this.posteo.autorIdPost;
   this.notificacion.tipo=this.posteo.tipoPost;
   this.notificacion.acceso="vis";
   this.notificacion.idp=idp;
   this.notificacion.codigo=this.llenarCodigoNotify(publica);
   this.notificacion.mensaje=this.llenarMensajeNotify(this.tipo, publica);
  }
  validarRolNoti(user:Usuario){
    if(user.rol=='secretaria'){  
      this.notificacion.autorimagenNot='https://firebasestorage.googleapis.com/v0/b/noticias-esfot.appspot.com/o/default%2F09102020esfot01.jpg?alt=media&token=090239b5-ccae-4094-86cf-1af382854385';
    }if(user.rol=='aeesfot'){
      this.notificacion.autorimagenNot='https://firebasestorage.googleapis.com/v0/b/noticias-esfot.appspot.com/o/default%2F09102020aeesfot01.png?alt=media&token=bf86ade7-868c-4b6e-a1de-1791b064b6e4';   
    }else if(user.rol=='estudiante'){
      this.notificacion.autorimagenNot=this.imagenUsuario(user);
    }else if(user.rol=='administrador' || user.rol=='docente'){
      this.notificacion.autorimagenNot=this.imagenUsuario(user);  
    }
  }
  
  llenarMensajeNotify(tip:string, pst:Publicacion){
    var message:string;
    if(pst.idGrupoPost=='Global'){
       if(tip=='noticia'){
         return message=pst.autorNamePost+"  publico una noticia"; 
       }else if(tip=='evento'){
         return message=pst.autorNamePost+"  publico un evento";
       }else if(tip=='solicitud'){
         if(pst.categoriaPost=='Problema'){
           return message=pst.autorNamePost+"  publico un problema"; 
         }else{
           return message=pst.autorNamePost+"  publico una emergencia "; 
         }
         
       } 
   }else{
       if(tip=='noticia'){
         return message=pst.autorNamePost+"  publico una noticia al grupo "+pst.nameGroupPost; 
       }else if(tip=='evento'){
         return message=pst.autorNamePost+"  publico un evento al grupo "+pst.nameGroupPost;
       }else if(tip=='solicitud'){
         if(pst.categoriaPost=='Problema'){
           return message=pst.autorNamePost+"  publico un problema al grupo"+pst.nameGroupPost; 
         }else{
           return message=pst.autorNamePost+"  publico una emergencia al grupo"+pst.nameGroupPost; 
         }
       } 
   }
  }

  llenarCodigoNotify(pst:Publicacion){
    var codi:string;
    if(pst.idGrupoPost=='Global'){
      return codi="gpglltsww1";
    }else{
      return codi="gpmbltswm1";
    }
  }
  llenarGrupos(user:Usuario){
    var subscriotion$=this.grupos.getGroupsOwner(user.uid).subscribe(res=>{
          this.conjuntoGrupos=res;
          if(res.length==0){
              this.publicar.splice(0,1,'Global');
              this.conjuntoGrupuosId.splice(0,1,'Global')
              subscriotion$.unsubscribe;
          }else{
            this.publicar.splice(0,1,'Global');
            this.conjuntoGrupuosId.splice(0,1,'Global')
            var i=1;
            for(let item of  this.conjuntoGrupos){
               this.publicar.splice(i,1,item.nameGroup);
               this.conjuntoGrupuosId.splice(i,1,item.idg);
               i=i+1
            }
            subscriotion$.unsubscribe();
          }
    })
  }
  llenarDatos(user:Usuario){
    this.publicar=[];
    this.conjuntoGrupuosId=[];
    this.conjuntoGrupos=[];
    this.firstFormGroup.reset({
      tituloPost:"",
      descripcionPost:"",
      fechaInicioPost: "",
      fechaFinPost: "",
      horainicioPost: "",
      horafinPost: "",
      telPost: "",
      lugarPost: "",
      nameGroupPost: this.llenarGrupos(user),
      nyoutubelinks:[], 
    });
     this.filesDocuments=[];
     this.filesImagenCuerpo=[];
     this.hijo.borrar();
     this.hijo2.borrar();
     this.reset();
  }
  reset(){
    this.myStepper.reset();
  }
  reseteo(){
    this.llenarDatos(this.user);
  }
}
