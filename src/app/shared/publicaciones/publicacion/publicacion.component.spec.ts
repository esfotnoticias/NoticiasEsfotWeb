import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { PublicacionComponent } from './publicacion.component';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
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
import { environment } from 'src/environments/environment';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PublicacionComponent', () => {
  let component: PublicacionComponent;
  let fixture: ComponentFixture<PublicacionComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacionComponent ],
      imports:[FormsModule,ReactiveFormsModule,AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,HttpClientModule,ModalModule.forRoot(),MaterialModule,BrowserAnimationsModule,  ToastrModule.forRoot(),RouterTestingModule.withRoutes([])],
      providers:[FormBuilder,AuthService,GruposService,ToastrService],
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionComponent);
    component = fixture.componentInstance;
    const user:Usuario={
      uid:'fsfdfsafasdfasfasf',
      email: 'jonathanjavimaiza@gmail.com',
      nombre: 'Jonathan',
      rol:'secretaria',
      estado:'activo',
      usuarioVerificado:true,
      emailVerified:true,
    
    };
    component.user=user;
    component.tipo='evento';
    component.publicar.push('Global');
    const val=['Global'];
    const secretaria:  string[] = ['Dirección ESFOT','Subdirección ESFOT'];
    

    fixture.detectChanges();
    
    
  });

  it('should create', () => {
    component.user.rol='secretaria';
    expect(component).toBeTruthy();
  });
  
  it('Deberia validar que ingrese un titulo ya que es un campo requerido', ()=>{
    let titulo=component.firstFormGroup.controls['tituloPost'];
    let errors={};
    errors=titulo.errors || {};
    titulo.setValue('Publicacion prueba');
    errors=titulo.errors || {};
    expect(errors['required']).toBeFalsy();
});

it('Deberia validar que ingrese una descripción ya que es un campo requerido', ()=>{  
  let titulo=component.firstFormGroup.controls['descripcionPost'];
  let errors={};
  errors=titulo.errors || {};
  titulo.setValue('es una prueba de descripción de un campo requerido, pruebas unitarias');
  errors=titulo.errors || {};
  expect(errors['required']).toBeFalsy();
})  

it('Deberia validar que ingrese la categoria  que es un campo requerido', ()=>{  
  let titulo=component.firstFormGroup.controls['categoriaPost'];
  let errors={};
  errors=titulo.errors || {};
  titulo.setValue('Oferta laboral');
  errors=titulo.errors || {};
  expect(errors['required']).toBeFalsy();
})  

it('Deberia validar que ingrese una fecha de evento ya que es un campo obligatorio', ()=>{
  let titulo=component.firstFormGroup.controls['fechaInicioPost'];
  let errors={};
  errors=titulo.errors || {};
  let d=new Date();
  titulo.setValue(d);
  errors=titulo.errors || {};
  expect(errors['required']).toBeFalsy();
})  



});
