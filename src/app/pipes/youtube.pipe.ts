import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtube'
})
export class YoutubePipe implements PipeTransform {

  transform(url: string): string {
    var size=url.length;

    if(this.busquedaString('?v=',url)!=-1){
        var i=this.busquedaString('?v=',url) +3;
        if(this.busquedaString('&ab_channel=',url)!=-1){
          var num=this.busquedaString('&ab_channel=',url);
          var substr=url.substring(i,num);
          return substr;
        }else{
          var substr=url.substring(i,size);
          return substr;
        }
    }else if(this.busquedaString('youtu.be/',url)!=-1){
      var i=this.busquedaString('youtu.be/',url)+9;
      var substr= url.substring(i, size);
      return substr;
    }else{
      return "";
    }

  }

  busquedaString(re:string, str:string) {
    var valor:number;
    if (str.indexOf(re) != -1) {
      valor=str.indexOf(re);
    } else {
      valor=-1;
    }
    return valor;
  }

    
}
