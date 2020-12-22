import { Component, OnInit, ViewChild ,AfterViewInit,QueryList,ViewChildren, Input , TemplateRef } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';;
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { Usuario } from 'src/app/models/usuario.model';
import {Publicacion} from 'src/app/models/publicaciones'
import {MatDialog} from '@angular/material/dialog';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
//import {ConfirmationDialog} from './confirmation-dialog.component';
@Component({
  selector: 'app-homepublication',
  templateUrl: './homepublication.component.html',
  styleUrls: ['./homepublication.component.css']
})
export class HomepublicationComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  @Input()tipo:string;
  @Input()user:Usuario;
  modalRef: BsModalRef;
  mensajeTitulo="";
  mensajeTitulo2="";
  mensajeTitulo3="";
  displayedColumns: string[] = ['titulo','tipo','grupo','estado','actions'];
  displayedColumns1: string[] =  ['titulo','tipo','grupo','estado','actions'];
  displayedColumns2: string[] =  ['titulo','tipo','estado','actions'];
  dataSource: MatTableDataSource<any>= new MatTableDataSource <any>();
  dataSource1: MatTableDataSource<any>= new MatTableDataSource <any>();
  dataSource2: MatTableDataSource<any>= new MatTableDataSource <any>();
  usuario:Usuario=new Usuario();
  postEliminarid:string;
  constructor(private auth:AuthService, private router: Router,private activatedRoute:ActivatedRoute,private modalService: BsModalService,
    private publicacion: PublicacionService, public dialog: MatDialog,private toastr:ToastrService) { 
       
     
    }

  ngOnInit(): void {
    
    this.llenarMensaje();
    if(this.user.rol=='administrador'){
      
      this.llenarArrays(this.user);
    }else if(this.user.rol=='secretaria'){
      
      this.llenarArrays(this.user);
    }else if(this.user.rol=='aeesfot'){
      
      this.llenarArrays(this.user);
    }else if(this.user.rol=='docente'){
      
      this.llenarArrays(this.user);
    }

  }
  llenarMensaje(){
   
    var parte1=this.user.rol;
    var parte2=parte1.toUpperCase();
    if(this.tipo=="noticia"){  
      this.mensajeTitulo='NOTICIAS '+parte2;
      this.mensajeTitulo2='NOTICIAS DE MIS GRUPOS';
      this.mensajeTitulo3='NOTICIAS GLOBALES';
    }else if(this.tipo=="evento"){
      this.mensajeTitulo='EVENTOS '+parte2;
      this.mensajeTitulo2='EVENTOS DE MIS GRUPOS';
      this.mensajeTitulo3='EVENTOS GLOBALES';
    }else if(this.tipo=="solicitud"){
      this.mensajeTitulo='SOLICITUDES '+parte2;
      this.mensajeTitulo2='SOLICITUDES DE MIS GRUPOS';
      this.mensajeTitulo3='SOLICITIDES GLOBALES';
    }
  }
  llenarArrays(usuario: Usuario){
    if(this.tipo=="noticia"){ 
      this.publicacion.getnoticias(usuario.uid).subscribe(resp=>{
        
        this.dataSource = new MatTableDataSource<any>(resp);
        this.dataSource.paginator = this.paginator.toArray()[0];
        this.dataSource.sort = this.sort.toArray()[0];
      });
      this.publicacion.getnoticiasGrupos(usuario.uid, usuario.grupos).subscribe(respt=>{
       
        this.dataSource1 = new MatTableDataSource<any>(respt.filter(respt=>respt.idGrupoPost!='Global'));
        this.dataSource1.paginator = this.paginator.toArray()[1];
        this.dataSource1.sort = this.sort.toArray()[1];
      });  
   
      this.publicacion.getnoticiasGlobales(usuario.uid).subscribe(res=>{
      
        this.dataSource2 = new MatTableDataSource<any>(res);
        this.dataSource2.paginator = this.paginator.toArray()[2];
        this.dataSource2.sort = this.sort.toArray()[2];
      });               
    
    }else if(this.tipo=="evento"){
      this.publicacion.geteventos(usuario.uid).subscribe(resp=>{
        
        this.dataSource = new MatTableDataSource<any>(resp);
        this.dataSource.paginator = this.paginator.toArray()[0];
        this.dataSource.sort = this.sort.toArray()[0];
      });
      this.publicacion.geteventosGrupos(usuario.uid, usuario.grupos).subscribe(respt=>{
        
        this.dataSource1 = new MatTableDataSource<any>(respt.filter(respt=>respt.idGrupoPost!='Global'));
        this.dataSource1.paginator = this.paginator.toArray()[1];
        this.dataSource1.sort = this.sort.toArray()[1];
      })  
    
      this.publicacion.geteventosGlobales(usuario.uid).subscribe(res=>{
       
        this.dataSource2 = new MatTableDataSource<any>(res);
        this.dataSource2.paginator = this.paginator.toArray()[1];
        this.dataSource2.sort = this.sort.toArray()[1];
      });   

    }else if(this.tipo=="solicitud"){
      this.publicacion.getsolicitudes(usuario.uid).subscribe(resp=>{
        
        this.dataSource = new MatTableDataSource<any>(resp);
        this.dataSource.paginator = this.paginator.toArray()[0];
        this.dataSource.sort = this.sort.toArray()[0];
      });
      this.publicacion.getsolicitudesGrupos(usuario.uid, usuario.grupos).subscribe(respt=>{
        this.dataSource1 = new MatTableDataSource<any>(respt.filter(respt=>respt.idGrupoPost!='Global'));
        this.dataSource1.paginator = this.paginator.toArray()[1];
        this.dataSource1.sort = this.sort.toArray()[1];
      });  
     
      this.publicacion.getsolicitudesGlobales(usuario.uid).subscribe(res=>{
        this.dataSource2 = new MatTableDataSource<any>(res);
        this.dataSource2.paginator = this.paginator.toArray()[2];
        this.dataSource2.sort = this.sort.toArray()[2];
      });   
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter1(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  eliminarDOs(id:string,template: TemplateRef<any>){
    this.postEliminarid=id;
    if(this.postEliminarid!=null || this.postEliminarid!=undefined){
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered' 
      });
      }
    
  }
  confirm(): void {
   
    this.publicacion.eliminarPublicacin(this.postEliminarid).then(resp=>{
      this.modalRef.hide();
      this.toastr.success('Se eliminó la publicación', '', {
      closeButton:true,
      progressBar:true,
      positionClass:'toast-bottom-left',
      timeOut: 2000,
    });
    this.postEliminarid=null;
    });

   
  }
 
  decline(): void {
    this.modalRef.hide();
    this.toastr.info('Has declinado borrar la publicación', '', {
      closeButton:true,
      progressBar:true,
      positionClass:'toast-bottom-left',
      timeOut: 2000,
    });
    this.postEliminarid=null;
  }
 
}
