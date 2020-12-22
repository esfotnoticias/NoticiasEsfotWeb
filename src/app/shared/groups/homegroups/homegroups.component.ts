import { Component, OnInit,ViewChild ,AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Grupos } from 'src/app/models/grupos';
import { GruposService } from 'src/app/services/grupos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-homegroups',
  templateUrl: './homegroups.component.html',
  styleUrls: ['./homegroups.component.css']
})
export class HomegroupsComponent implements OnInit, AfterViewInit  {
  group:Grupos=new Grupos();
  matrizGroup:Grupos[]=[];
  usuario:Usuario=new Usuario();
  mensaje=false;
  mensaje2=false;
  valor:string="";
  dataSource2 = new MatTableDataSource();
  displayedColumns: string[] = ['nombre','actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private grupos:GruposService, private activatedRoute:ActivatedRoute, private auth:AuthService) {
    this.group.idGroup="";
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']!=undefined){
        
        this.auth.getUser(params['id']).subscribe(
           resp=>{
            this.usuario=resp;
          
            this.grupos.getGroups(this.usuario.uid).subscribe(res=>{
             
              this.matrizGroup=res.filter((res)=>res.mienbros.includes(this.usuario.uid));
              this.dataSource2.data=this.matrizGroup;

            })
        }
      )
      }
  })
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(){

    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
}
applyFilter2(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource2.filter = filterValue.trim().toLowerCase();
}
  join(form: NgForm){
  

      if(form.invalid){
        
        if(form.invalid){
          Object.values(form.controls).forEach(control=>{
            
            control.markAsTouched();
          })
          return
        }
      }else{
            
            
             var respues$=this.grupos.probar(this.group.idGroup).subscribe(resp=>{
            
              var valor=resp.length;
              if(valor!=0){
                
                var leng=resp[0].mienbros.length;
                
                if(leng<=resp[0].maxmienbrosGroup){
                  var i=resp[0].mienbros.indexOf(this.usuario.uid);
                  if(i==-1){
                    
                    this.mensaje2=true;
                    
                    respues$.unsubscribe();
                    this.grupos.agregarMiembros(resp[0].id,this.usuario.uid);
                    this.auth.agregarGrupo(this.usuario.uid,resp[0].id);
                    this.group.idGroup="";
                    
                    return;
                  }else{
                
                    respues$.unsubscribe();
                    this.mensaje=true;
                    this.valor="Usted ya esta registrado";
                  }
                 
                }else{
                }
              }else{
               this.mensaje=true;
               this.valor="Código no válido";
               respues$.unsubscribe();
              }
              

             });
        
      }

}
devolverUser(index:number){
  
  this.grupos.eliminarMienbros(this.matrizGroup[index].idg,this.usuario.uid);
  this.auth.eliminarGrupo(this.usuario.uid,this.matrizGroup[index].idg);
}
saludo(){
  
  setTimeout(()=>{                           
    this.mensaje = false;
    this.mensaje2=false;
}, 3000);
}


}
