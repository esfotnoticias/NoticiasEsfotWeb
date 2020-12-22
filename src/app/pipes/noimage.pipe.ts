import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(images: any[] , valor?:string, args?: any): any {
      //console.log(images)
    if ( !images ) {
      if (args != null){
        console.log('si entra')
      }else{
        console.log('si entra');
        if(valor=="usuario"){
            return '/assets/no_usuario.png';
        }else if(valor=="credencial"){
            return '/assets/credencial.png';
        }

      }

    }

    if ( images.length > 0 ) {
      return images;

    } else {
      return '/assets/no_usuario.png';
    }

    }


}
