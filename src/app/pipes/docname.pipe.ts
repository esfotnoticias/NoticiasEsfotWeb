import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'docname'
})
export class DocnamePipe implements PipeTransform {

  transform(texto: string): string {
    var f=texto.length;
    if(texto.length>15){
      return texto.substr(0,12) +"--.pdf";
    }else{
      return texto;
    }

  }

}
