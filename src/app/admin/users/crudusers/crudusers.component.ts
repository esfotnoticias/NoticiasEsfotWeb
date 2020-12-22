import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidadoresService } from 'src/app/services/validadores.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import {ToastrService} from 'ngx-toastr';
import { MyErrorStateMatcher, errorMessages } from 'src/app/models/MyErrorStateMatcher';
@Component({
  selector: 'app-crudusers',
  templateUrl: './crudusers.component.html',
  styleUrls: ['./crudusers.component.css']
})
export class CrudusersComponent implements OnInit {
  checked = false;
  hide = false;
  id = false;
  forma: FormGroup;
  usuario: Usuario = new Usuario();
  user: Usuario = new Usuario();
  valor=false;
  errors = errorMessages;
  matcher = new MyErrorStateMatcher();
  constructor(private auth: AuthService, private fb: FormBuilder,
              private router: Router,
              private toastr:ToastrService,
              private validaciones: ValidadoresService,
              private activatedRoute: ActivatedRoute,
              private fns: AngularFireFunctions) {
      this.crearFormulario()
      this.activatedRoute.params.subscribe(params => {
        if (params['id'] != undefined) {
          this.id = params['id'];
          this.auth.getUser(params['id']).subscribe(
            resp=>{
             this.user=resp;
             if(resp!=undefined){
               this.valor=true;
             }
           }
         )
    
        }
      })
      this.usuario.usuarioVerificado = false;
  }

  ngOnInit(): void {
  }
  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('apellido').touched
  }
  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }
  get generoNoValido() {
    return this.forma.get('genero').invalid && this.forma.get('genero').touched
  }
  get fechanacimientoNoValido() {
    return this.forma.get('fechanacimiento').invalid && this.forma.get('fechanacimiento').touched
  }
  get passwordNoValido() {
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }
  get rolNoValido() {
    return this.forma.get('rol').invalid && this.forma.get('rol').touched
  }
  get usuarioVerificado() {
    return this.forma.get('usuarioVerificado').invalid && this.forma.get('usuarioVerificado').touched
  }


  get password1Novalido() {
    const password = this.forma.get('password').value;
    const password1 = this.forma.get('password1').value;
    return (password == password1) ? false : true;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{0,254}')]],
      apellido: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{0,254}')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      genero: ['', Validators.required],
      fechanacimiento: ['', [Validators.required]],
      rol: ['', Validators.required],
      usuarioVerificado: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
      password1: ['', [Validators.required]],
    },
      {
        validators: this.validaciones.passwordsIguales('password', 'password1'),
      }
    );
  }
  async register(forma: FormGroup) {
    
    if (this.forma.invalid) {
      console.log('es invalido');
      console.log(forma);
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    } else {
      try {
         
         var $crea=this.auth.getUsuariosCorreo(this.usuario.email).subscribe(res=>{
          if(res){
            
            if(res.length==0){
              this.auth.guardarUserAdmin(this.usuario).then(resp => {
                this.auth.actuliazarUidUser(resp.id);
                const createUser = this.fns.httpsCallable('createUser');
                createUser({ email: this.usuario.email, password: this.usuario.password, uid: resp.id }).subscribe(result => {
                  this.toastr.success('EL proceso ha finalizado con exito', 'El usuario se ha creado', {
                    closeButton:true,
                    progressBar:true,
                    positionClass:'toast-bottom-left',
                    timeOut: 3000,
                  });
                   $crea.unsubscribe();
                });
               
                this.router.navigate(['admin/modificar', this.id]);
              })
            }else{
              this.checked = true;
                $crea.unsubscribe();
                setTimeout(() => {
                  this.checked=false;
                },3000);
            }
          }
        })

      } catch (err) {
        if (err.code == "auth/email-already-in-use") {
          this.checked = true;
        }
      }
    }
  }
}
