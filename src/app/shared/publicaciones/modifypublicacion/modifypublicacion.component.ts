import { Component, OnInit, Input, AfterViewInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileItem } from 'src/app/models/file-item';
import { UrlyoutubeService } from 'src/app/services/urlyoutube.service';
import { Publicacion } from 'src/app/models/publicaciones';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { GruposService } from 'src/app/services/grupos.service';
import  { Grupos } from 'src/app/models/grupos';
import { MyErrorStateMatcher, errorMessages } from 'src/app/models/MyErrorStateMatcher';
import {ManageimagesComponent} from 'src/app/shared/manageimages/manageimages.component';
import {DocumentosComponent} from 'src/app/shared/documentos/documentos.component';
import { MatStepper } from '@angular/material/stepper';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { Notificacion } from 'src/app/models/notificacion';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ValidadoresService } from 'src/app/services/validadores.service';
@Component({
  selector: 'app-modifypublicacion',
  templateUrl: './modifypublicacion.component.html',
  styleUrls: ['./modifypublicacion.component.css']
})
export class ModifypublicacionComponent implements OnInit , AfterViewInit{
   @Input()tipo:string;
   @Input()user:Usuario;
   @Input()publication:Publicacion;
   @Input()group:string;
   @ViewChild(ManageimagesComponent) hijo: ManageimagesComponent;
   @ViewChild(DocumentosComponent) hijo2: DocumentosComponent;
   @ViewChild('stepper') private myStepper: MatStepper;
   @ViewChild('lgModal') public childModal:ModalDirective;
   usuarioActual:Usuario=new Usuario();
   public user$:Observable<any>= this.auth.AFauth.user;
   firstFormGroup: FormGroup;
   usuario:Usuario=new Usuario();
   posteo:Publicacion=new Publicacion();
   nombregrupo:string="";
   errors = errorMessages;
   imagenes=false;
   documentos=false;
   probar=false;
   linkerror=false;
   step = -1;
   categorias:  string[] = ['Oferta laboral','Oferta de pasantias','Actividad académica','Actividad cultural','Comunicados oficiales','Otros'];
   secretaria:  string[] = ['Dirección ESFOT','Subdirección ESFOT'];
   solicitudes: string[] = ['Problema','Emergencia'];
   filesDocuments: FileItem[]=[];
   filesImagenCuerpo: FileItem[]=[];
   conjuntoGrupos:Grupos[]=[];
   conjuntoGrupuosId:string[]=[];
   notificacion:Notificacion=new Notificacion();
   notificacionAproDene:Notificacion=new Notificacion();
   url: string[]=[];
   publicar   : string[] = [];
   matcher = new MyErrorStateMatcher();
   valor1=0;
   valor2=0;
  constructor(private fb: FormBuilder,
              private _youtube:UrlyoutubeService,
               private publicacion:PublicacionService,
               private grupos:GruposService,
               private  noti:NotificacionService,
               private auth:AuthService,
               private toastr:ToastrService,
               private validaciones: ValidadoresService,
               private message:MessagingService,
               private router: Router
               ) { 
              this.crearFormulario();
              this.user$.subscribe(resp=>{
                this.auth.getUser(resp.uid).subscribe(resp=>{;
                  if(resp){
                    this.usuarioActual=resp;
                  }
                })
              })
               }

  ngOnInit(): void {
    if(this.group=="gpowltswc1"){
        
    }else if(this.group=="gpmbltswm1"){
        
    }else if(this.group=="gpglltsww1"){
      
    }
    if(this.publication!=undefined && this.user!=undefined){
      this.probar=true;
      this.valor1=5-this.publication.imagenPost.length;
      this.valor2=3-this.publication.docsPost.length;
      if(this.group=="gpowltswc1"){
        this.llenarGrupos( this.user,this.publication);
      }else if(this.group=="gpmbltswm1"){
        this.llenarGrupos2( this.user,this.publication);
      }else if(this.group=="gpglltsww1"){
        this.llenarGrupos3( this.user,this.publication);
      }
      
      if(this.publication.imagenPost.length!=0){
        this.imagenes=true;
      }else{
        this.imagenes=false;
      }
      
      if(this.publication.docsPost.length!=0){
        console.log(this.publication.docsPost[0]);
        this.documentos=true;
      }else{
        this.documentos=false;
      }
  }
    setTimeout(() => {
      this.grupos.getGroup(this.publication.idGrupoPost).subscribe(resp=>{       
          if(resp!=undefined){
            this.nombregrupo=resp.nameGroup;
            
          }
        })
    }, 1000);
    this.user
  }
  ngAfterViewInit(){

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
       comentarioPost: ['',[Validators.required]],
       estadoPost:['',[Validators.required]],
       nyoutubelinks: this.fb.array([
       ])
     },{
      validators: [this.validaciones.fechaMayor2('fechaInicioPost', 'fechaFinPost'),this.validaciones.horaMayor('horainicioPost','horafinPost')]
     });
     this.matcher = new MyErrorStateMatcher();
    }
    onUpload(forma:FormGroup){
    
      this.validarRol(forma);
      this.validartipo(forma);
      
      if(this.firstFormGroup.invalid){
        return Object.values(this.firstFormGroup.controls).forEach(control=>{
          if (control instanceof FormGroup){
            Object.values(control.controls).forEach(control=>control.markAsTouched()) ;
            }else{  
              this.myStepper.previous();
              this.myStepper.previous();
              control.markAsTouched();
              return;
            }
          });
    }else{
      this.datosPost(forma);
      this.datosGroup(forma);
      this.childModal.show();
      this.publicacion.actualizarPublicacion(this.posteo,this.filesImagenCuerpo,this.filesDocuments).then(resp=>{
       this.notificaciones(this.usuarioActual,this.user, this.posteo);       
        this.toastr.success('Has modificado la publicación con exito', 'Los datos se han modificado', {
          closeButton:true,
          progressBar:true,
          positionClass:'toast-bottom-left',
          timeOut: 3000,
        });
        this.childModal.hide();
        this.navegacion(this.tipo, this.usuarioActual);
      }); 
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
        forma.get('fechaFinPost').clearValidators()
        forma.get('fechaFinPost').updateValueAndValidity();
      }
    }
  
    validarRol(forma:FormGroup){
      
      if(this.user.rol=='secretaria'){
        console.log('entra al secre');
        this.posteo.autorNamePost=forma.get('autorNamePost').value;
        this.posteo.autorIdPost=this.user.uid;
        this.posteo.autorImagenPost='https://firebasestorage.googleapis.com/v0/b/noticias-esfot.appspot.com/o/default%2F09102020esfot01.jpg?alt=media&token=090239b5-ccae-4094-86cf-1af382854385';
      }if(this.user.rol=='aeesfot'){
        console.log('entra al aessfor');
        forma.get('autorNamePost').setValue('AEESFOT');
        this.posteo.autorIdPost=this.user.uid;
        this.posteo.autorImagenPost='https://firebasestorage.googleapis.com/v0/b/noticias-esfot.appspot.com/o/default%2F09102020aeesfot01.png?alt=media&token=bf86ade7-868c-4b6e-a1de-1791b064b6e4';
      }else if(this.user.rol=='estudiante'){
        console.log('entra al estudiante');
        forma.get('autorNamePost').setValue(this.user.nombre+" "+this.user.apellido);
        this.posteo.autorIdPost=this.user.uid;
        this.posteo.autorImagenPost=this.imagenUsuario(this.user);;
       
      }else if(this.user.rol=='administrador' || this.user.rol=='docente'){
        console.log('entra al admin docen');
        forma.get('autorNamePost').setValue(this.user.nombre+" "+this.user.apellido);
        this.posteo.autorIdPost=this.user.uid;
        this.posteo.autorImagenPost=this.imagenUsuario(this.user);;
      }
      console.log(this.posteo);
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
    this.posteo.comentarioPost=forma.get('comentarioPost').value;
    this.posteo.docsPost=this.publication.docsPost;
    this.posteo.imagenPost=this.publication.imagenPost;
    this.posteo.idPost=this.publication.idPost;
    this.posteo.viewsPost=0;
    this.posteo.tipoPost=this.datos(this.tipo);
    this.posteo.estadoPost=forma.get('estadoPost').value;
    this.posteo.idUserAprobRech=this.usuarioActual.uid;
    //this.posteo.autorIdPost=this.usuario.uid;
    }

    datosGroup(forma:FormGroup){
      if(this.group=="gpowltswc1"){
        this.posteo.nameGroupPost=this.publicar[forma.get('nameGroupPost').value];
        this.posteo.idGrupoPost=this.conjuntoGrupuosId[forma.get('nameGroupPost').value];
      }else if(this.group=="gpmbltswm1"){
        this.posteo.nameGroupPost=this.publication.nameGroupPost;
        this.posteo.idGrupoPost=this.publication.idGrupoPost;
      }else if(this.group=="gpglltsww1"){
        this.posteo.nameGroupPost="Global";
        this.posteo.idGrupoPost="Global";
      }
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
        valor='Eventos';
      }else if(tip=='solicitud'){
        valor='Solicitudes';
      }
      return valor;
    }
  notificaciones(userActual:Usuario, userCreator:Usuario, publica:Publicacion){
    this.llenarNotifyAproDeg(publica);
        if(publica.estadoPost=='aprobado'){
          if(this.group=="gpowltswc1"){
    
          }else{
            //console.log(this.notificacionAproDene);
            this.noti.guardarNoti(userCreator.uid,this.notificacionAproDene);
            this.message.sendPostRequest(this.notificacionAproDene.mensaje, userCreator.token).toPromise().then((val)=>{}).catch(err=>{});
          }
          this.llenarNotify(publica);
          console.log(this.notificacion);
          if(publica.idGrupoPost=='Global'){
            
            let $noti=this.auth.getUsuariosNotificarAll2().subscribe( rest=>{
              
              console.log(rest);
              setTimeout(() => {
                let tamanio=rest.filter((resp)=>resp.uid!=userCreator.uid && resp.uid!=this.usuarioActual.uid).length;
                var i=0;
         
                for(let us of rest.filter((resp)=>resp.uid!=userCreator.uid && resp.uid!=this.usuarioActual
                .uid)){
                  i++;
                 
                  this.noti.guardarNoti(us.uid,this.notificacion);
                  this.message.sendPostRequest(this.notificacion.mensaje, us.token).toPromise().then((res)=>{}).catch(err=>{});
                     if(i==tamanio){
                      
                     $noti.unsubscribe();   
                   }else{
                     continue;
                   } 
                }
              },800);
              //console.log(resp.filter((resp)=>resp.uid!=userCreator.uid));
            
             
            });
            
          }else{
            let $suscription=this.grupos.getGroup(publica.idGrupoPost).subscribe(res=>{
               let $suscription1=this.auth.getUsuariosNotificarGroup(res.mienbros).subscribe(resp=>{
                
                var i=0;
                let tamanio=(resp.filter(re=>res.mienbros.includes(re.uid)&& re.uid!=userCreator.uid)).length;
                for(let us of resp.filter(re=>res.mienbros.includes(re.uid)&& re.uid!=userCreator.uid)){ 
                  i++;
                  this.noti.guardarNoti(us.uid,this.notificacion);
                  this.message.sendPostRequest(this.notificacion.mensaje, us.token).toPromise().then((r)=>{}).catch(err=>{}); 
                    if(i==tamanio){
                      console.log('se desuscribe');
                      $suscription.unsubscribe();  
                      $suscription1.unsubscribe(); 
                   }else{
                     continue;
                   }  
                }
              })
            })   
          }     
    }else if(publica.estadoPost=='rechazado'){
      
      if(this.group=="gpowltswc1"){
    
      }else{
        this.noti.guardarNoti(userCreator.uid,this.notificacionAproDene);
        this.message.sendPostRequest(this.notificacionAproDene.mensaje, userCreator.token).toPromise().then(res=>{}).catch(err=>{}); 
      }

    }
  }
  llenarNotify( publica:Publicacion){
    console.log(this.posteo);
    this.notificacion.iduc=this.posteo.autorIdPost;
    this.notificacion.tipo=this.posteo.tipoPost;
    this.notificacion.acceso="vis";
    this.notificacion.idp=publica.idPost;
    
    this.notificacion.codigo=this.llenarCodigoNotify(publica);
    this.notificacion.mensaje=this.llenarMensajeNotifyPub(this.tipo,publica);
    this.validarRolNoti2(this.user);
    
   }
   llenarMensajeNotifyPub(tip:string, pst:Publicacion){
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
   llenarNotifyAproDeg( publica:Publicacion){
    this.notificacionAproDene.iduc=this.posteo.autorIdPost;
    this.notificacionAproDene.tipo=this.posteo.tipoPost;
    this.notificacionAproDene.acceso="come";
    this.notificacionAproDene.idp=publica.idPost;
    this.notificacionAproDene.autorimagenNot=this.imagenUsuario(this.usuarioActual);
    this.notificacionAproDene.codigo=this.llenarCodigoNotify(publica);
    this.notificacionAproDene.mensaje=this.llenarMensajeNotiUserNot(publica,this.tipo,this.usuarioActual);
    this.validarRolNoti(this.usuarioActual);
   }
   validarRolNoti(user:Usuario){
    if(user.rol=='secretaria'){  
      this.notificacionAproDene.autorimagenNot='https://firebasestorage.googleapis.com/v0/b/noticias-esfot.appspot.com/o/default%2F09102020esfot01.jpg?alt=media&token=090239b5-ccae-4094-86cf-1af382854385';
    }if(user.rol=='aeesfot'){
      this.notificacionAproDene.autorimagenNot='https://firebasestorage.googleapis.com/v0/b/noticias-esfot.appspot.com/o/default%2F09102020aeesfot01.png?alt=media&token=bf86ade7-868c-4b6e-a1de-1791b064b6e4';   
    }else if(user.rol=='estudiante'){
      this.notificacionAproDene.autorimagenNot=this.imagenUsuario(this.user);
    }else if(user.rol=='administrador' || this.user.rol=='docente'){
      this.notificacionAproDene.autorimagenNot=this.imagenUsuario(this.user);  
    }
    
  }
  validarRolNoti2(user:Usuario){
    if(user.rol=='secretaria'){  
      this.notificacion.autorimagenNot='https://firebasestorage.googleapis.com/v0/b/noticias-esfot.appspot.com/o/default%2F09102020esfot01.jpg?alt=media&token=090239b5-ccae-4094-86cf-1af382854385';
    }if(user.rol=='aeesfot'){
      this.notificacion.autorimagenNot='https://firebasestorage.googleapis.com/v0/b/noticias-esfot.appspot.com/o/default%2F09102020aeesfot01.png?alt=media&token=bf86ade7-868c-4b6e-a1de-1791b064b6e4';   
    }else if(user.rol=='estudiante'){
      this.notificacion.autorimagenNot=this.imagenUsuario(this.user);
    }else if(user.rol=='administrador' || this.user.rol=='docente'){
      this.notificacion.autorimagenNot=this.imagenUsuario(this.user);  
    }
    
  }
  llenarMensajeNotiUserNot(pst:Publicacion, tip:string, userAc:Usuario){
    var message:string;
    if(pst.estadoPost=='aprobado'){
      return message=this.mensajeAproDene(tip,pst,'aprobo',userAc);
    }else if(pst.estadoPost=='rechazado'){
      return message=this.mensajeAproDene(tip,pst,'rechazo',userAc);
    }
  }

  mensajeAproDene(tip:string, pst:Publicacion, val:string,userAc:Usuario){
    var message:string;
    if(pst.idGrupoPost=='Global'){
       if(tip=='noticia'){
         return message=this.UsuarioAprobo(userAc)+" "+val+" tu noticia"; 
       }else if(tip=='evento'){
         return message=this.UsuarioAprobo(userAc)+" "+val+" tu evento";
       }else if(tip=='solicitud'){
           if(pst.categoriaPost=='Problema'){
             return message=this.UsuarioAprobo(userAc)+" "+val+" tu problema"; 
           }else{
             return message=this.UsuarioAprobo(userAc)+" "+val+" tu emergencia"; 
           }  
       } 
   }else{
       if(tip=='noticia'){
         return message=this.UsuarioAprobo(userAc)+" "+val+" tu noticia al grupo "+pst.nameGroupPost; 
       }else if(tip=='evento'){
         return message=this.UsuarioAprobo(userAc)+" "+val+" tu evento al grupo "+pst.nameGroupPost;
       }else if(tip=='solicitud'){
           if(pst.categoriaPost=='Problema'){
             return message=this.UsuarioAprobo(userAc)+" "+val+" tu problema al grupo"+pst.nameGroupPost; 
           }else{
             return message=this.UsuarioAprobo(userAc)+" "+val+" tu emergencia al grupo"+pst.nameGroupPost; 
           }
       } 
   }
  }
  UsuarioAprobo(userActual:Usuario){
    let usermen="";
    if(userActual.rol=='secretaria'){  
        return usermen="Dirección ESFOT";
    }if(userActual.rol=='aeesfot'){
        return usermen="AEESFOT";
    }else if(userActual.rol=='administrador'){
        return usermen="El administrador";
    }else if(userActual.rol=='docente' || userActual.rol=='estudiante'){
        return usermen= userActual.nombre+" "+userActual.apellido;
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
   async llenarDatos(publi:Publicacion){
      var numb=this.publicar.indexOf(publi.nameGroupPost);
    
      if(this.tipo=='evento'){
        if(publi.fechaInicioPost!=null){
          var d =parseInt(publi.fechaInicioPost['seconds']);
          var s:Date = new Date(d*1000);
          publi.fechaInicioPost=s
        }else{
          
        }
        if(publi.fechaFinPost!=null){
          var j=parseInt(publi.fechaFinPost['seconds']);
          var k=new Date(j*1000);
          publi.fechaFinPost=k
        }

      }
      
      this.firstFormGroup.reset({
        "tituloPost": publi.tituloPost,
        "descripcionPost": publi.descripcionPost,
        "fechaInicioPost": publi.fechaInicioPost,
        "fechaFinPost":publi.fechaFinPost,
        "categoriaPost":publi.categoriaPost,
        "autorNamePost":publi.autorNamePost,
        "horainicioPost":publi.horainicioPost,
        "horafinPost":publi.horafinPost,
        "telPost":publi.telPost,
        "lugarPost":publi.lugarPost,
        "comentarioPost":publi.comentarioPost,
        "nameGroupPost":numb,
        "estadoPost":publi.estadoPost
      });
      publi.ytUrlPost.forEach(valor => this.nyoutubelinks.push(this.fb.control(valor, 
         [Validators.required, Validators.pattern('^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+')])));
      
    }
    async llenarDatos2(publi:Publicacion){
       if(this.tipo=='evento'){
        if(publi.fechaInicioPost!=null){
          var d =parseInt(publi.fechaInicioPost['seconds']);
          var s:Date = new Date(d*1000);
          publi.fechaInicioPost=s
        }else{
          
        }
        if(publi.fechaFinPost!=null){
          var j=parseInt(publi.fechaFinPost['seconds']);
          var k=new Date(j*1000);
          publi.fechaFinPost=k
        }

      }
       this.firstFormGroup.reset({
         "tituloPost": publi.tituloPost,
         "descripcionPost": publi.descripcionPost,
         "fechaInicioPost": publi.fechaInicioPost,
         "fechaFinPost":publi.fechaFinPost,
         "categoriaPost":publi.categoriaPost,
         "autorNamePost":publi.autorNamePost,
         "horainicioPost":publi.horainicioPost,
         "horafinPost":publi.horafinPost,
         "telPost":publi.telPost,
         "lugarPost":publi.lugarPost,
         "comentarioPost":publi.comentarioPost,
         "nameGroupPost":publi.nameGroupPost,
         "estadoPost":publi.estadoPost
       });
       publi.ytUrlPost.forEach(valor => this.nyoutubelinks.push(this.fb.control(valor, 
          [Validators.required, Validators.pattern('^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+')])));
       
     }
  eliminar(i:number){
      var par=this.valor1;
      this.publicacion.eliminarImagenes(this.publication.idPost,this.publication.imagenPost[i]);
      this.valor1=par +1;
      this.hijo.cantidad=this.valor1.toString();
  }
  eliminarDoc(i:number){
    var par2=this.valor2;
    this.publicacion.eliminarDocumentos(this.publication.idPost,this.publication.docsPost[i]);
    this.valor2=par2 +1;
    this.hijo2.cantidad=this.valor2.toString();
  }

  async llenarGrupos(user:Usuario, publi:Publicacion){
    
       var subscriotion$=this.grupos.getGroupsOwner(user.uid).subscribe(res=>{
            this.conjuntoGrupos=res;
            if(res.length==0){
                this.publicar.splice(0,1,'Global');
                this.conjuntoGrupuosId.splice(0,1,'Global')
                subscriotion$.unsubscribe();
            }else{
              this.publicar.splice(0,1,'Global');
              this.conjuntoGrupuosId.splice(0,1,'Global')
              var i=1;
              for(let item of  this.conjuntoGrupos){
                 this.publicar.splice(i,0,item.nameGroup);
                 this.conjuntoGrupuosId.splice(i,0,item.idg);
                 i=i+1;
              } 
              subscriotion$.unsubscribe();
            };
            this.llenarDatos(publi);
            this.valor1=5-publi.imagenPost.length;
            this.valor2=3-publi.docsPost.length;
      });
  }

  llenarGrupos2(user:Usuario, publi:Publicacion){
    this.publicar.splice(0,1,publi.nameGroupPost);
    this.conjuntoGrupuosId.splice(0,1,publi.idGrupoPost);
    this.llenarDatos2(publi);
    this.valor1=5-publi.imagenPost.length;
    this.valor2=3-publi.docsPost.length;
  }
  llenarGrupos3(user:Usuario, publi:Publicacion){
    this.publicar.splice(0,1,'Global');
    this.conjuntoGrupuosId.splice(0,1,'Global')
    this.llenarDatos2(publi);
    this.valor1=5-publi.imagenPost.length;
    this.valor2=3-publi.docsPost.length;
  }

  navegacion(tip:string, user:Usuario){
    var ruta:string="";
    if(tip=='evento'){
      ruta=this.rutaUser(user)+"/eventshome";
      this.router.navigate([ruta, this.usuarioActual.uid])
    }else if(tip=='noticia'){
      ruta=this.rutaUser(user)+"/newshome";
      this.router.navigate([ruta, this.usuarioActual.uid])
    }else if(tip=='solicitud'){
      ruta=this.rutaUser(user)+"/solicitudhome";
      this.router.navigate([ruta, this.usuarioActual.uid])
      
    }
  }

  rutaUser(user:Usuario){
    if(user.rol=='administrador'){
       return 'admin';
    }else if(user.rol=='secretaria'){
       return 'secretaria';
    }else if(user.rol=='docente'){
       return 'docente';
    }else if(user.rol=='aeesfot'){
      return 'aeesfot';
    }
  }
}
