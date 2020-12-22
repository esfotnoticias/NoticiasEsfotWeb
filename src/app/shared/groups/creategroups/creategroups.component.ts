import { Component, OnInit, ViewChild ,AfterViewInit,ElementRef,Renderer2, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Grupos } from 'src/app/models/grupos';
import { MyErrorStateMatcher,errorMessages } from 'src/app/models/MyErrorStateMatcher';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { GruposService } from 'src/app/services/grupos.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-creategroups',
  templateUrl: './creategroups.component.html',
  styleUrls: ['./creategroups.component.css']
})
export class CreategroupsComponent implements OnInit, AfterViewInit {
  
  firstFormGroup: FormGroup;
  errors = errorMessages;
  matcher = new MyErrorStateMatcher();
  group:Grupos=new Grupos;
  mienbros:string[]=[];
  userGroup:Usuario[]=[];
  usuario:Usuario=new Usuario();
  idGroup:string;
  ruta:string;
  valor=false;
  tamanioError=false;
  constructor(private fb: FormBuilder, private auth:AuthService,private renderer: Renderer2,
    private activatedRoute:ActivatedRoute,private grupos: GruposService,private router:Router) {
    this.activatedRoute.params.subscribe(params=>{
    
      if(params['id']!=undefined){
        
        this.auth.getUser(params['id']).subscribe(
           resp=>{
             if(resp){
               this.valor=true;
              this.usuario=resp; 
              //this.ruta=resp.rol;
              this.crearFormulario();

             }
            
        }
      )}
  }) 
   
   }
   ngAfterViewInit(){
    
  }

  ngOnInit(): void {

  }

  crearFormulario(){
    this.firstFormGroup = this.fb.group({
      nameGroup: ['', [Validators.required,Validators.maxLength(15)]],
      detalleGroup:['', [Validators.required,Validators.maxLength(25)]],
      maxmienbrosGroup: ['', [Validators.required, Validators.max(20), Validators.min(1)]],
   });
   this.matcher = new MyErrorStateMatcher();
  }

  async onUpload(forma:FormGroup){
    if(this.firstFormGroup.invalid){
      return Object.values(this.firstFormGroup.controls).forEach(control=>{
        if (control instanceof FormGroup){
          Object.values(control.controls).forEach(control=>control.markAsTouched()) ;
          }else{
            control.markAsTouched();
          }
        });
  }else{
    if(this.usuario.grupos.length>8){
      this.tamanioError=true;
      setTimeout(()=>{                           
        this.tamanioError=false;
    }, 3000);
    }else{
     
      this.llenar(forma);
      
      this.grupos.guardarGrupo(this.group).then(rep=>{
        this.idGroup=rep.id;
        this.auth.agregarGrupo(this.usuario.uid, rep.id);
        this.grupos.agregarMiembros(rep.id,this.usuario.uid);
        this.grupos.actualizarIdgGrupo(rep.id, this.idGroup);
     
        this.router.navigate(['../../usersgroup',rep.id], {relativeTo: this.activatedRoute});
       
      })
    }
   
  }
  }
  llenar(forma:FormGroup){
    this.group.nameGroup=forma.get('nameGroup').value;
    this.group.maxmienbrosGroup=forma.get('maxmienbrosGroup').value+1;
    this.group.detalleGroup=forma.get('detalleGroup').value;
    this.group.idownerGroup=this.usuario.uid;
    this.group.idGroup=this.grupos.makeid();
  }

}
