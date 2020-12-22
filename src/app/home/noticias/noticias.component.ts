import { Component, OnInit } from '@angular/core';
import { CargarCabeceraService } from 'src/app/services/cargar-cabecera.service';
import { Publicacion } from 'src/app/models/publicaciones';
import { Noticias } from 'src/app/models/noticias.modelo';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
   public user$:Observable<any>= this.auth.AFauth.user;
   publicaciones:Publicacion[]=[];
   temp:any[]=[];
   usuario:Usuario=new Usuario();
   noticia:Noticias=new Noticias();
   categorias:  string[] = ['Todos','Oferta laboral','Oferta de pasantias','Actividad académica','Actividad cultural','Comunicados oficiales','Problema','Emergencia','Otros'];
   selectedCategoria = this.categorias[0];
   categoriaSelect:string;
   busqueda:string="";
   valor=false;
   pasar=false;
   selecTipo:string=this.categorias[0];
   tamanio=false;
   nohay=false;
  constructor(private _carga: CargarCabeceraService,private auth:AuthService ) {
      this.user$.subscribe(resp=>{
        this.auth.getUser(resp.uid).subscribe(resp=>{
         
          if(resp){
            this.usuario=resp;
        
          this.valor=true;
         
          this._carga.getPost(this.usuario.grupos).subscribe(resp=>{
            var i=0;
           
            if(resp){
              
              this.pasar=true;
             
              if(resp.length!=0){
                this.publicaciones=resp;
                this.tamanio=true;
                
              }else{
                this.tamanio=false;
                
              }
            }
           
      
        })
          }
          
        })
      })

  }

  ngOnInit(): void {

  }

selectCar(event:any){
  
  var i=event.target.options.selectedIndex;
  var valor=this.categorias[i];
  this.selecTipo=valor;
 
  if(valor=='Todos'){
    this._carga.getPost(this.usuario.grupos).subscribe(resp=>{
        this.publicaciones=resp;
        var i=0;
        if(this.publicaciones.length!=0){
          this.tamanio=true;
        }else{
          this.tamanio=false;
        }
   
    })
  }else{
    this._carga.getPost(this.usuario.grupos).subscribe(resp=>{
        this.publicaciones=resp.filter((resp)=> resp.categoriaPost==valor);
        this.temp=resp.filter((resp)=> resp.categoriaPost==valor);
        var i=0;
        if(this.publicaciones.length!=0){
          this.tamanio=true;
        }else{
          this.tamanio=false;
        }
 

    })
  }
}
buscar(){
 
  this._carga.getPostBusqueda(this.busqueda, this.selecTipo, this.usuario.grupos).then(res=>{
    this.publicaciones=res;
    if(this.publicaciones.length!=0){
      this.nohay=false;
    }else{
      this.nohay=true;
    }
    this.busqueda="";
  });
  

  }

  imprimir(event:string){
  
    this._carga.getPostBusqueda(event, this.selecTipo, this.usuario.grupos).then(res=>{
      this.publicaciones=res;
      if(this.publicaciones.length!=0){
        this.nohay=false;
      }else{
        this.nohay=true;
      }
     
    });
  }

}
