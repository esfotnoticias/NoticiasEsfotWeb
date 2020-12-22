import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroComponent ],
      imports:[FormsModule,ReactiveFormsModule,AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,RouterTestingModule.withRoutes([]),MaterialModule,BrowserAnimationsModule ],
        providers:[FormBuilder,AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia validar que el nombre solo puede contener letras', ()=>{
    let titulo=component.forma.controls['nombre'];
    let errors={};
    errors=titulo.errors || {};
    titulo.setValue('Jonathan');  
    errors=titulo.errors || {};
    expect(errors['pattern']).toBeFalsy();
  })  

  it('Deberia validar que el email ingresado sea correcto', ()=>{
    let titulo=component.forma.controls['email'];
    let errors={};
    errors=titulo.errors || {};
    titulo.setValue('jonathanjavimaiza@gmail.com');  
    errors=titulo.errors || {};
    expect(errors['pattern']).toBeFalsy();
  })  

  it('Deberia validar que el apellido solo puede contener letras', ()=>{
    let titulo=component.forma.controls['apellido'];
    let errors={};   
    errors=titulo.errors || {};
    titulo.setValue('Mejia');  
    errors=titulo.errors || {};
    expect(errors['pattern']).toBeFalsy();
  })  

  it('Deberia validar que el rol es un campo requerido', ()=>{
    let titulo=component.forma.controls['rol'];
    let errors={};   
    errors=titulo.errors || {};
    titulo.setValue('docente'); 
    errors=titulo.errors || {};
    expect(errors['required']).toBeFalsy();
  }) 

  it('Deberia validar que el password debe contener mínimo 8 caracteres incluyendo al menos una mayúscula una minúscula y un número', 
  ()=>{
    let titulo=component.forma.controls['password'];
    let errors={};
    errors=titulo.errors || {};
    titulo.setValue('jonathanMaiza123'); 
    errors=titulo.errors || {};
    expect(errors['pattern']).toBeFalsy();
  }) 
});
