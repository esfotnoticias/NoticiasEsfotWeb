import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidadoresService } from 'src/app/services/validadores.service';
import { MyErrorStateMatcher, errorMessages } from 'src/app/models/MyErrorStateMatcher';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  entra=false;
  color=false;
  hide = false;
  checked = false;
  forma: FormGroup;
  usuario: Usuario = new Usuario();
  errors = errorMessages;
  matcher = new MyErrorStateMatcher();
  constructor(private auth:AuthService,private fb:FormBuilder,
              private router:Router,
              private validaciones:ValidadoresService) {
    this.crearFormulario()
   }

  ngOnInit(): void {
  }
  get nombreNoValido(){
  return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoNoValido(){
  return this.forma.get('nombre').invalid && this.forma.get('apellido').touched
  }
  get emailNoValido(){
  return this.forma.get('email').invalid && this.forma.get('email').touched
  }
  get generoNoValido(){
  return this.forma.get('genero').invalid && this.forma.get('genero').touched
  }
  get fechanacimientoNoValido(){
  return this.forma.get('fechanacimiento').invalid && this.forma.get('fechanacimiento').touched
  }
  get   passwordNoValido(){
  return this.forma.get('password').invalid && this.forma.get('password').touched
  }
  get   rolNoValido(){
  return this.forma.get('rol').invalid && this.forma.get('rol').touched
  }


  get password1Novalido(){
      const password=this.forma.get('password').value;
      const password1=this.forma.get('password1').value;
      return (password==password1)? false: true;
  }

  crearFormulario(){
    this.forma=this.fb.group({
      nombre  :['',[Validators.required, Validators.pattern('[a-zA-Z ]{0,20}')]],
      apellido:['',[Validators.required,Validators.pattern('[a-zA-Z ]{0,20}')]],
      email  :['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      genero: ['',Validators.required],
      fechanacimiento:['',[Validators.required]],
      rol:['',Validators.required],
      password   :['',[Validators.required, Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
      password1  :['', [Validators.required]],
   },
  {
    validators: this.validaciones.passwordsIguales('password','password1'),
  }
 );}



 async register(forma:FormGroup){



  if(this.forma.invalid){
  

    return Object.values(this.forma.controls).forEach(control=>{
      if (control instanceof FormGroup){
        Object.values(control.controls).forEach(control=>control.markAsTouched()) ;
        }else{
          control.markAsTouched();
        }
      });

    }else{
      try{
      
        
          this.usuario.estado="nuevo";
          if(this.usuario.rol==="docente"||this.usuario.rol==="secretaria"){
            this.usuario.usuarioVerificado=false;
          }else{
            this.usuario.usuarioVerificado=false;
          }
        
          const user= await this.auth.register(this.usuario);
           if(user){
          
            this.router.navigate(['/emailverification']);
           }
      }catch(err){
        if(err.code=="auth/email-already-in-use"){
          this.checked=true;
          setTimeout(() => {
            this.checked=false;
          }, 3000);
        }
      }
    }
 }

}
