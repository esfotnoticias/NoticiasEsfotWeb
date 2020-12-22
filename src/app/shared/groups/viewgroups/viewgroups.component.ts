import { Component, OnInit,ViewChild ,AfterViewInit, TemplateRef, QueryList, ViewChildren } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';;
import { MatSort } from '@angular/material/sort';
import { Router,ActivatedRoute } from '@angular/router';
import { GruposService } from 'src/app/services/grupos.service';
import { Grupos } from 'src/app/models/grupos';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
@Component({
  selector: 'app-viewgroups',
  templateUrl: './viewgroups.component.html',
  styleUrls: ['./viewgroups.component.css']
})
export class ViewgroupsComponent implements OnInit,AfterViewInit  {
  displayedColumns: string[] = ['codigo', 'nombre', 'mienbros','actions'];
  //dataSource = new MatTableDataSource();
  matrizGroup:Grupos[]=[];
  groupdel:string;
  id:string="";
  modalRef: BsModalRef;
  usuario:Usuario=new Usuario();
  valor=false;
  dataSource: MatTableDataSource<Grupos>= new MatTableDataSource <Grupos>();
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  constructor(private auth:AuthService,private modalService: BsModalService,private router: Router,private grupos:GruposService,private activatedRoute:ActivatedRoute, private toastr:ToastrService) {
    this.activatedRoute.params.subscribe(params=>{
    
      if(params['id']!=undefined){
        this.id=params['id'];
        this.auth.getUser(params['id']).subscribe(resp=>{
            if(resp){
              this.valor=true;
              this.usuario=resp; 
            }
       });
        this.grupos.getGroupsOwner(params['id']).subscribe(resp=>{
          this.matrizGroup=resp;
          this.dataSource = new MatTableDataSource<Grupos>(resp);
          this.dataSource.paginator = this.paginator.toArray()[0];
        })
      }
  })
  }
  ngOnInit(): void {
    
  }
  ngAfterViewInit(){

    
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
eliminarDOs(url:string, template: TemplateRef<any>){
  this.groupdel=url;
  console.log(this.groupdel);
  if(this.groupdel!=null || this.groupdel!=undefined){
  this.modalRef = this.modalService.show(template,
    {
      class: 'modal-dialog-centered' 
    });
    }
 }
confirm(): void {
  this.modalRef.hide();
    this.toastr.info('Este proceso puede tomar varios segundos', '', {
    closeButton:true,
    progressBar:true,
    positionClass:'toast-bottom-left',
    timeOut: 2000,
  });
   
  this.grupos.getGroup(this.groupdel).subscribe(resp=>{
             
    if(resp!=undefined){
      console.log(resp.mienbros);
      this.grupos.eliminarGrupoDefi(resp.mienbros,this.groupdel);
      setTimeout(() => {
        setTimeout(() => {
          this.toastr.success('El grupo se ha borrado con con exito', '', {
            closeButton:true,
            progressBar:true,
            positionClass:'toast-bottom-left',
            timeOut: 3000,
          });
        },2000);
      }, 2000);
      
    }
  
  })

  


 
}

decline(): void {
  this.modalRef.hide();
  this.toastr.info('Has declinado borrar el usuario', '', {
    closeButton:true,
    progressBar:true,
    positionClass:'toast-bottom-left',
    timeOut: 2000,
  });
  this.groupdel=null;
}

}
