import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Cabecera } from '../models/cabecera';
import { Observable } from 'rxjs';
//import * as firebase from 'firebase';
import { map } from 'rxjs/internal/operators/map';
import { Publicacion } from '../models/publicaciones';


@Injectable({
  providedIn: 'root'
})
export class CargarCabeceraService {
  post: Observable<Publicacion>;
  publicacion:Publicacion=new Publicacion();
  constructor(private db: AngularFirestore) { }
  
  getCabeceras(){
    return this.db.collection('cabecera', ref=>{
      return ref
      .orderBy('fecha_pub_cabecera','desc')
    }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Cabecera;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ))
  }
  
  getPost(group:string[]){
    return this.db.collection('publicaciones', ref=>{
      return ref .where('idGrupoPost','in',group)
                 .where('estadoPost','==','aprobado')
                 .orderBy('fechaPost','desc')
    }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Publicacion;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ))
  }
  getPostCategoria(group:string[], tipo:string){
    return this.db.collection('publicaciones', ref=>{
      return ref .where('idGrupoPost','in',group)
                 .where('categoriaPost','==',tipo)
                 .where('estadoPost','==','aprobado')
                 .orderBy('fechaPost','desc')
    }).snapshotChanges().pipe(map(resp=>resp.map(a=>{
      const data= a.payload.doc.data() as Publicacion;
      const  id = a.payload.doc.id;
      return { id, ...data};
    })
    ))
  }

  getPostBusqueda(busqueda:string, tipo:string, group:string[]){
    let resultado:Publicacion[]=[];
    let bus=busqueda.toLocaleLowerCase();
    return new Promise<Publicacion[]>((resolve)=>{
      if(tipo=='Todos'){
        this.getPost(group).subscribe(res=>{
          for(let post of res){
            let valor=post.tituloPost.toLocaleLowerCase();
            let valor1=post.nameGroupPost.toLocaleLowerCase();
            if(valor.indexOf(bus)>=0 ||valor1.indexOf(bus)>=0){
              resultado.push(post);
            }
          }
          
          resolve(resultado)
       }
       )
      }else if(tipo!='Todos'){
        
        this.getPostCategoria(group,tipo).subscribe(res=>{
          for(let post of res){
            let valor=post.tituloPost.toLocaleLowerCase();
            let valor1=post.nameGroupPost.toLocaleLowerCase();
            if(valor.indexOf(bus)>=0 ||valor1.indexOf(bus)>=0){
              resultado.push(post);
            }
          }
         
          resolve(resultado);
       }
       )
      }
    })
  }

  getPublicacion(id:string){

    const userRef : AngularFirestoreDocument<Publicacion> = this.db.doc(`publicaciones/${id}`);
      this.post=userRef.snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as Publicacion;
      if(data){
        this.publicacion=data;
        
        const id=a.payload.id;
        return {id, ...data};
      }else{
        return null;
      }

    }))
  return this.post;
  }
  
  noticiasEstdisticasGlobal(id:string, inicio:Date, fin:Date){
    
    
    let retornar=[]
    if(inicio.getDate()==fin.getDate()){
      let f1=new Date(inicio.getTime());
      f1.setHours(23,59,59);
      return this.db.collection('publicaciones', ref=>{
        return ref .where('idGrupoPost','==','Global')
                   .where('tipoPost','==','Noticias')
                   .where('autorIdPost','==',id)
                   .where('fechaPost','>=', inicio)
                   .where('fechaPost','<=', f1)
      }).snapshotChanges().pipe(map(resp=>{
        let val=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Oferta laboral').length; 
        let val1=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Oferta de pasantias').length; 
        let val2=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Actividad academica').length; 
        let val3=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Actividad cultural').length; 
        let val4=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Comunicados oficiales').length; 
        let val5=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Otros').length;
        retornar.splice(0,1,val);
        retornar.splice(1,1,val1);
        retornar.splice(2,1,val2);
        retornar.splice(3,1,val3);
        retornar.splice(4,1,val4);
        retornar.splice(5,1,val5);
        return retornar;
      }
      ))
    }else{
      return this.db.collection('publicaciones', ref=>{
        return ref .where('idGrupoPost','==','Global')
                   .where('tipoPost','==','Noticias')
                   .where('autorIdPost','==',id)
                   .where('fechaPost','>=', inicio)
                   .where('fechaPost','<=', fin)
      }).snapshotChanges().pipe(map(resp=>{
        let val=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Oferta laboral').length; 
        let val1=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Oferta de pasantias').length; 
        let val2=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Actividad academica').length; 
        let val3=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Actividad cultural').length; 
        let val4=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Comunicados oficiales').length; 
        let val5=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Otros').length;
        retornar.splice(0,1,val);
        retornar.splice(1,1,val1);
        retornar.splice(2,1,val2);
        retornar.splice(3,1,val3);
        retornar.splice(4,1,val4);
        retornar.splice(5,1,val5);
        return retornar;
      }
      ))
    }
 
  }
  noticiasEstdisticasAprobRech(id:string, inicio:Date, fin:Date){
    
    let retornar=[]
    if(inicio.getDate()==fin.getDate()){
      let f1=new Date(inicio.getTime());
      f1.setHours(23,59,59);
      return this.db.collection('publicaciones', ref=>{
        return ref .where('idGrupoPost','==','Global')
                   .where('tipoPost','==','Noticias')
                   .where('idUserAprobRech','==',id)
                   .where('fechaPost','>=', inicio)
                   .where('fechaPost','<=', f1)
                   
      }).snapshotChanges().pipe(map(resp=>{
        let val=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Oferta laboral').length; 
        let val1=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Oferta de pasantias').length; 
        let val2=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Actividad academica').length; 
        let val3=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Actividad cultural').length; 
        let val4=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Comunicados oficiales').length; 
        let val5=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Otros').length;
        retornar.splice(0,1,val);
        retornar.splice(1,1,val1);
        retornar.splice(2,1,val2);
        retornar.splice(3,1,val3);
        retornar.splice(4,1,val4);
        retornar.splice(5,1,val5);
        return retornar;
      }
      ))
    }else{
      return this.db.collection('publicaciones', ref=>{
        return ref .where('idGrupoPost','==','Global')
                   .where('tipoPost','==','Noticias')
                   .where('idUserAprobRech','==',id)
                   .where('fechaPost','>=', inicio)
                   .where('fechaPost','<=', fin)
                   
      }).snapshotChanges().pipe(map(resp=>{
        let val=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Oferta laboral').length; 
        let val1=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Oferta de pasantias').length; 
        let val2=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Actividad academica').length; 
        let val3=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Actividad cultural').length; 
        let val4=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Comunicados oficiales').length; 
        let val5=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Otros').length;
        retornar.splice(0,1,val);
        retornar.splice(1,1,val1);
        retornar.splice(2,1,val2);
        retornar.splice(3,1,val3);
        retornar.splice(4,1,val4);
        retornar.splice(5,1,val5);
        return retornar;
      }
      ))
    }
 
  }




  problemasEstdisticasGlobal(id:string, inicio:Date, fin:Date){
    let retornar=[];
    if(inicio.getDate()==fin.getDate()){ 
      let f1=new Date(inicio.getTime());
      f1.setHours(23,59,59);
      return this.db.collection('publicaciones', ref=>{
        return ref .where('idGrupoPost','==','Global')
                   .where('tipoPost','==','Solicitudes')
                   .where('autorIdPost','==',id)
                   .where('fechaPost','>=', inicio)
                   .where('fechaPost','<=', f1)
      }).snapshotChanges().pipe(map(resp=>{
        let val=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Problema').length; 
        let val1=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Emergencia').length; 
        retornar.splice(0,1,val);
        retornar.splice(1,1,val1);
        return retornar;
      }
      ))
    }else{
      return this.db.collection('publicaciones', ref=>{
        return ref .where('idGrupoPost','==','Global')
                   .where('tipoPost','==','Solicitudes')
                   .where('autorIdPost','==',id)
                   .where('fechaPost','>=', inicio)
                   .where('fechaPost','<=', fin)
      }).snapshotChanges().pipe(map(resp=>{
        let val=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Problema').length; 
        let val1=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Emergencia').length; 
        retornar.splice(0,1,val);
        retornar.splice(1,1,val1);
        return retornar;
      }
      ))
    }

  }
  EventosEstdisticasGlobal(id:string, inicio:Date, fin:Date){
    let retornar=[];
    if(inicio.getDate()==fin.getDate()){ 
      let f1=new Date(inicio.getTime());
      f1.setHours(23,59,59);
      return this.db.collection('publicaciones', ref=>{
        return ref .where('idGrupoPost','==','Global')
                   .where('tipoPost','==','Eventos')
                   .where('autorIdPost','==',id)
                   .where('fechaPost','>=', inicio)
                   .where('fechaPost','<=', f1)
      }).snapshotChanges().pipe(map(resp=>{
        let val=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Eventos').length; 
        retornar.splice(0,1,val);
        return retornar;
      }
      ))
    }else{
      return this.db.collection('publicaciones', ref=>{
        return ref .where('idGrupoPost','==','Global')
                   .where('tipoPost','==','Eventos')
                   .where('autorIdPost','==',id)
                   .where('fechaPost','>=', inicio)
                   .where('fechaPost','<=', fin)
      }).snapshotChanges().pipe(map(resp=>{
        let val=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Eventos').length; 
        retornar.splice(0,1,val);
        return retornar;
      }
      ))
    }

  }
  problemasEstdisticasAprobRech(id:string, inicio:Date, fin:Date){
    let retornar=[];
    if(inicio.getDate()==fin.getDate()){ 
      let f1=new Date(inicio.getTime());
      f1.setHours(23,59,59);
      return this.db.collection('publicaciones', ref=>{
        return ref .where('idGrupoPost','==','Global')
                   .where('tipoPost','==','Solicitudes')
                   .where('idUserAprobRech','==',id)
                   .where('fechaPost','>=', inicio)
                   .where('fechaPost','<=', f1)
                   
      }).snapshotChanges().pipe(map(resp=>{
        let val=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Problema').length; 
        let val1=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Emergencia').length; 
        retornar.splice(0,1,val);
        retornar.splice(1,1,val1);
        return retornar;
      }
      ))
    }else{
      return this.db.collection('publicaciones', ref=>{
        return ref .where('idGrupoPost','==','Global')
                   .where('tipoPost','==','Solicitudes')
                   .where('idUserAprobRech','==',id)
                   .where('fechaPost','>=', inicio)
                   .where('fechaPost','<=', fin)
                   
      }).snapshotChanges().pipe(map(resp=>{
        let val=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Problema').length; 
        let val1=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Emergencia').length; 
        retornar.splice(0,1,val);
        retornar.splice(1,1,val1);
        return retornar;
      }
      ))
    }

  }

  EventosEstdisticasAprobRech(id:string, inicio:Date, fin:Date){
    let retornar=[];
    if(inicio.getDate()==fin.getDate()){ 
      let f1=new Date(inicio.getTime());
      f1.setHours(23,59,59);
      return this.db.collection('publicaciones', ref=>{
        return ref .where('idGrupoPost','==','Global')
                   .where('tipoPost','==','Eventos')
                   .where('idUserAprobRech','==',id)
                   .where('fechaPost','>=', inicio)
                   .where('fechaPost','<=', f1)
                   
      }).snapshotChanges().pipe(map(resp=>{
        let val=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Eventos').length; 
        
        retornar.splice(0,1,val);
      
        return retornar;
      }
      ))
    }else{
      return this.db.collection('publicaciones', ref=>{
        return ref .where('idGrupoPost','==','Global')
                   .where('tipoPost','==','Eventos')
                   .where('idUserAprobRech','==',id)
                   .where('fechaPost','>=', inicio)
                   .where('fechaPost','<=', fin)
                   
      }).snapshotChanges().pipe(map(resp=>{
        let val=resp.filter(resp=>(resp.payload.doc.data() as Publicacion).categoriaPost=='Eventos').length; 
        retornar.splice(0,1,val);
        return retornar;
      }
      ))
    }

  }
  
}

