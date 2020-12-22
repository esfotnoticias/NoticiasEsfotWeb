import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ClaveComponent } from './clave/clave.component';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from './../app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { EmailverificationComponent } from './emailverification/emailverification.component'
import { AdminModule } from '../admin/admin.module';

@NgModule({
  declarations: [LoginComponent, RegistroComponent, ClaveComponent, EmailverificationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,


  ],
  exports:[
    LoginComponent,
    RegistroComponent,
    ClaveComponent
  ],
  providers:[
    
  ]
})
export class AuthModule { }
