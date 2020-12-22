import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  passwordsIguales(pass1Name:string, pass2Name:string){
   return (formGroup:FormGroup)=>{
     const pass1Control=formGroup.controls[pass1Name];
     const pass2Control=formGroup.controls[pass2Name];
     if (pass1Control.value === pass2Control.value){
       pass2Control.setErrors(null);
     }else{
       pass2Control.setErrors({noEsIgual:true});
     }
   }
}
fechaIgual(date1:string, date2:string){
   return (formGroup:FormGroup)=>{
     const date1C=formGroup.controls[date1];
     const date2C=formGroup.controls[date2];
     if(date1C.value==date2C.value){
      date2C.setErrors({igual:true});
   }else{
    date2C.setErrors(null);
   }
  }
}
fechaMayor(date1:string, date2:string){
  return (formGroup:FormGroup)=>{
    const date1C=formGroup.controls[date1];
    const date2C=formGroup.controls[date2];
    if(date1C.value <=date2C.value){
      date2C.setErrors(null);
   }else {
    date2C.setErrors({mayor:true});
   }
  }
}   
fechaMayor2(date1:string, date2:string){
  return (formGroup:FormGroup)=>{
    const date1C=formGroup.controls[date1];
    const date2C=formGroup.controls[date2];
   
    if(isNullOrUndefined(date2C.value) ){
      date2C.setErrors(null);
    }else{
      if(date1C.value <=date2C.value){
        date2C.setErrors(null);
     }else {
      date2C.setErrors({mayor:true});
     }
    }
  
  }
}  

horaMayor(hora1:string, hora2:string){
  return (formGroup:FormGroup)=>{
    const date1C=formGroup.controls[hora1];
    const date2C=formGroup.controls[hora2];
    if(date2C.value!=""){
      if(date1C.value <=date2C.value){
        date2C.setErrors(null);
     }else {
      date2C.setErrors({horamayor:true});
     }
    }else{
      date2C.setErrors(null);
    }
  }
}

}
