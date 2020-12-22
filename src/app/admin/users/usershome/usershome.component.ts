import { Component, OnInit, ViewChild ,AfterViewInit, TemplateRef, ViewChildren} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';;
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import {ToastrService} from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { QueryList } from '@angular/core';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { GruposService } from 'src/app/services/grupos.service';
@Component({
  selector: 'app-usershome',
  templateUrl: './usershome.component.html',
  styleUrls: ['./usershome.component.css']
})
export class UsershomeComponent implements OnInit, AfterViewInit {
  valor=false;
  modalRef: BsModalRef;
  userdel:string;
  usuario:Usuario=new Usuario();
  grupoUsuario:Usuario[]=[]
  id:string;
  displayedColumns: string[] = ['nombre', 'apellido', 'email','actions'];
  dataSource: MatTableDataSource<Usuario>= new MatTableDataSource <Usuario>();
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
    //@ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private auth:AuthService, private router: Router,private fns: AngularFireFunctions,private toastr:ToastrService,
    private activatedRoute:ActivatedRoute,private modalService: BsModalService, private publicaser:PublicacionService, private grupo:GruposService) {
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']!=undefined){
        this.auth.getUser(params['id']).subscribe(
          resp=>{
           this.usuario=resp;
           if(resp!=undefined){
             this.id=params['id'];
             this.valor=true;
             this.auth.getUsuarios().subscribe(res=>{
              this.grupoUsuario=res.filter(res=>res.uid!=this.usuario.uid);
              //this.dataSource.data=this.grupoUsuario;
              this.dataSource = new MatTableDataSource<Usuario>(res.filter(res=>res.uid!=this.usuario.uid));
              this.dataSource.paginator = this.paginator.toArray()[0];
            })
           }
         }
       )

       }
    })

   }

  ngOnInit() {
   

 }
 ngAfterViewInit(){
 
      
 }
  applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   eliminarUsuario(url:string){
     this.auth.eliminarUsuario(url);
   }
   eliminarDOs(url:string, template: TemplateRef<any>){
    this.userdel=url;
    if(this.userdel!=null || this.userdel!=undefined){
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
    this.auth.borrarUsuerio(this.userdel);
    this.auth.getUser(this.userdel).subscribe(resp=>{
      if(resp){
        for(let id of resp.grupos){
          if(id=='Global'){

          }else{
             this.grupo.eliminarMienbros(id,this.userdel);
          }
        }
      }
    });
    this.publicaser.getNoticiasToEliminate(this.userdel).subscribe(res=>{
       if(res){
         for(let id of res){
            this.publicaser.eliminarPublicacin(id.idPost)
         }
       }
    })
    const delateUser = this.fns.httpsCallable('delateUser');
    delateUser({uid:this.userdel}).subscribe(result=>{
      this.toastr.success('Se elimino el usuario con exito', '', {
        closeButton:true,
        progressBar:true,
        positionClass:'toast-bottom-left',
        timeOut: 3000,
      });
      this.userdel=null;
   });

   
  }
 
  decline(): void {
    this.modalRef.hide();
    this.toastr.info('Has declinado borrar el usuario', '', {
      closeButton:true,
      progressBar:true,
      positionClass:'toast-bottom-left',
      timeOut: 2000,
    });
    this.userdel=null;
  }
 
}

