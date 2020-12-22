import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechas'
})
export class FechasPipe implements PipeTransform {

  transform(fecha: any,valor?:string, args?: any): any {
    if(fecha!=undefined){
      var mes=['En','Feb','Mar','Abr','May','Jun','Jul','Agto','Sept','Oct','Nov','Dic']
      var d =parseInt(fecha['seconds']);
      var s =new Date(d*1000);
      console.log(fecha+'es un valor');
      if(valor=='day'){
        return s.getDate();
        //console.log(s.getDate())
        //return '25';
      }else if(valor=='month'){
        var m= s.getMonth();-1;
         return mes[m];
        // return 'En';
      }else if(valor=='total'){  
      return null;
      }else{

      }
    }else{
      return "";
    }
  }
}
