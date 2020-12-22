import { Component, OnInit, ViewChild ,AfterViewInit, ElementRef,Renderer2 } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { GruposService } from 'src/app/services/grupos.service';
import { MyErrorStateMatcher,errorMessages} from 'src/app/models/MyErrorStateMatcher';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Grupos } from 'src/app/models/grupos';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
@Component({
  selector: 'app-modifygroups',
  templateUrl: './modifygroups.component.html',
  styleUrls: ['./modifygroups.component.css']
})
export class ModifygroupsComponent implements OnInit,AfterViewInit {
    @ViewChild('inputTarget') inputElement: ElementRef;
    firstFormGroup: FormGroup;
    matcher = new MyErrorStateMatcher();
    group:Grupos=new Grupos;
    errors = errorMessages;
    usuario:Usuario=new Usuario();
    ruta:string;
    id:string;
    changeGroup:Grupos=new Grupos;
    valor=false;
  constructor(private fb: FormBuilder,private renderer: Renderer2,private auth:AuthService,
    private router:Router, private grupos:GruposService,private activatedRoute:ActivatedRoute) { 
    this.activatedRoute.params.subscribe(params=>{
    
      if(params['id']!=undefined){
        this.grupos.getGroup(params['id']).subscribe(resp=>{
            this.group=resp;
            this.id=resp.idg;
            this.auth.getUser(resp.idownerGroup).subscribe(
              resp=>{
                this.usuario=resp; 
              
           }
         );
            if(resp){
              this.valor=true;
              this.crearFormulario();
              this.cargarData(this.group);
            }   
           
        }
      )
      }
     
  })
  }
  ngAfterViewInit(){
    
  }

  ngOnInit(): void {
 
  }
  get nameGroupNoValido(){
    return this.firstFormGroup.get('nameGroup').invalid && this.firstFormGroup.get('nameGroup').touched
    }
    get  detalleGroupNoValido(){
    return this.firstFormGroup.get('detalleGroup').invalid && this.firstFormGroup.get('detalleGroup').touched
    }
    get  maxmienbrosGroupNoValido(){
    return this.firstFormGroup.get('maxmienbrosGroup').invalid && this.firstFormGroup.get('maxmienbrosGroup').touched
    }
    get   idGroupNoValido(){
    return this.firstFormGroup.get('idGroup').invalid && this.firstFormGroup.get('idGroup').touched
    }
  
  crearFormulario(){
   
    var tan=this.group.maxmienbrosGroup -1;
    this.firstFormGroup = this.fb.group({
      nameGroup: ['', [Validators.required,Validators.maxLength(15)]],
      detalleGroup:['', [Validators.required,Validators.maxLength(25)]],
      maxmienbrosGroup: ['', [Validators.required, Validators.max(20), Validators.min(tan)]],
      idGroup: ['', Validators.required],
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
          return;
        }
      });
 
      
  }else{
   
    this.llenar(forma);
    this.grupos.actualizarGrupo(this.group.idg, this.changeGroup).then(rep=>{
      var nav=this.usuario.rol+"/usersgroup";
     
      this.router.navigate([nav,this.group.idg]);
    
    });
    
  }
  }

  cargarData(grupos:Grupos){
  this.firstFormGroup.reset({
    "nameGroup": grupos.nameGroup,
    "detalleGroup": grupos.detalleGroup,
    "maxmienbrosGroup": grupos.maxmienbrosGroup-1,
    "idGroup":grupos.idGroup
  });
  
}
llenar(forma:FormGroup){
  this.changeGroup.nameGroup=forma.get('nameGroup').value;
  this.changeGroup.maxmienbrosGroup=forma.get('maxmienbrosGroup').value+1;
  this.changeGroup.detalleGroup=forma.get('detalleGroup').value;
  this.changeGroup.idGroup=forma.get('idGroup').value;
}
generar(){
  this.firstFormGroup.get('idGroup').setValue(this.grupos.makeid());
}
}
