import {Component} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export const errorMessages: { [key: string]: string } = {
  maxEstudent:' Número maximo de estudiantes es 20',
  llenar:'El campo no puede estar vacío',
  links:'El link que ingreso es incorrecto',
  opcion:'Seleccione una opción el campo no puede estar vacío',
  perfilPost:'Seleccione un perfil',
  categoriaPost:'Seleccione una categoria de ',
  titulopost:'Ingrese el título de ',
  descripcionPost:'Ingrese una descripción para ',
  fechaPost:'Seleccion la fecha de inicio de',
  numeroPost:'Formato de número telefónico incorrecto',
  comenta: 'Agrega un comentario a',
  name: 'El nombre es necesario',
  solotexto:'Solo letras mayúsculas y minúsculas',
  apellido: 'El apellido es necesario',
  email:'El email es requerido',
  emailmal:'El email es erroneo',
  fecnac:'La fecha de nacimiento es requerida',
  genero: 'El genero es necesario',
  password:'La contraseña es requerida',
  password3:'La confirmación de contraseña es requerida',
  password2:'Las contraseñas no coinciden',
  passwordmal:'Mínimo 8 caracteres incluyendo al menos una mayúscula una minúscula y un número '

};