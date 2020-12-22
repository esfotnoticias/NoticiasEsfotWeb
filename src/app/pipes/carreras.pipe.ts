import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carreras'
})
export class CarrerasPipe implements PipeTransform {

  transform(texto: string): string {

      if(texto=="tsds"){
        return "T. S. Desarrollo de Sofwate";
      }else if(texto=="tsasa"){
        return "T. S. Aguas y Saneamiento Ambiental";
      }else if(texto=="tsem"){
        return "T. S. Electromecánica";
      }else if(texto=="tset"){
        return "T. S. Electrónica y Telecomunicaciones";
      }else{
         return "No se ha ingresado información"
      }
  }

}
