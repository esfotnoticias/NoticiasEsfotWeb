import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
@Component({
  selector: 'app-clave',
  templateUrl: './clave.component.html',
  styleUrls: ['./clave.component.css']
})
export class ClaveComponent implements OnInit {
    usuario: Usuario = new Usuario();
    mensaje=false;
  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit(): void {
  }
  async ResetPass(form: NgForm){

    try{

      if(form.invalid){
       
        Object.values(form.controls).forEach(control=>{
            
            control.markAsTouched();
          })
          return;
      }

       await this.auth.resetPass(this.usuario.email)

      //this.router.navigate(["/login"]);
    }catch(err){
      this.mensaje=true;
      
    }

  }
  regresar(){
    this.router.navigate(["/login"]);
  }
}
