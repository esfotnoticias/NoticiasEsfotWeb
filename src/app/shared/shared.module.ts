import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { CalendarComponent } from './calendar/calendar.component';
import {MaterialModule} from './../material.module';
import {AppRoutingModule} from './../app-routing.module'
import { HomeModule } from '../home/home.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FirstLoginComponent } from './first-login/first-login.component';
import { PipeModule } from '../pipes/pipe.module';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { NgImagenDirective } from './directive/ng-imagen.directive';
import { NgDocumentoDirective } from './directive/ng-documento.directive';
import { DocumentosComponent } from './documentos/documentos.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { PublicacionComponent } from './publicaciones/publicacion/publicacion.component';
import { ManageimagesComponent } from './manageimages/manageimages.component';
import { VistapublicacionComponent } from './publicaciones/vistapublicacion/vistapublicacion.component';
import { CreategroupsComponent } from './groups/creategroups/creategroups.component';
import { HomegroupsComponent } from './groups/homegroups/homegroups.component';
import { ClipboardModule } from 'ngx-clipboard';
import { ViewgroupsComponent } from './groups/viewgroups/viewgroups.component';
import { ModifygroupsComponent } from './groups/modifygroups/modifygroups.component';
import { UsergroupsComponent } from './groups/usergroups/usergroups.component';
import { ModifypublicacionComponent } from './publicaciones/modifypublicacion/modifypublicacion.component';
import { HomepublicationComponent } from './publicaciones/homepublication/homepublication.component';
import { NotificacionComponent } from './notify/notificacion/notificacion.component';
import { NotificacionesComponent } from './notify/notificaciones/notificaciones.component';
import { SeePerfilComponent } from './perfil/see-perfil/see-perfil.component';
import { ModyPerfilComponent } from './perfil/mody-perfil/mody-perfil.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SeeestadisticasComponent } from './estadisticas/seeestadisticas/seeestadisticas.component';
import { NotiestadisticaComponent } from './estadisticas/notiestadistica/notiestadistica.component';
import { EventestadisticaComponent } from './estadisticas/eventestadistica/eventestadistica.component';
import { SoliestadisticaComponent } from './estadisticas/soliestadistica/soliestadistica.component';


@NgModule({
  declarations: [MenuComponent, CalendarComponent,
    SidenavComponent, FirstLoginComponent,
    ImagenesComponent, NgImagenDirective, NgDocumentoDirective, DocumentosComponent, PublicacionComponent, ManageimagesComponent, VistapublicacionComponent, CreategroupsComponent, HomegroupsComponent, ViewgroupsComponent, ModifygroupsComponent, UsergroupsComponent, ModifypublicacionComponent, HomepublicationComponent, NotificacionComponent, NotificacionesComponent, SeePerfilComponent, ModyPerfilComponent, SeeestadisticasComponent, NotiestadisticaComponent, EventestadisticaComponent, SoliestadisticaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    PipeModule,
    HomeModule,
    YouTubePlayerModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
  
  ],
  exports:[
    MenuComponent,
    CalendarComponent,
    SidenavComponent,
    ImagenesComponent,
    DocumentosComponent ,
    YouTubePlayerModule,
    ManageimagesComponent,
    PublicacionComponent,
    VistapublicacionComponent,
    CreategroupsComponent, 
    HomegroupsComponent,
    ClipboardModule,
    ViewgroupsComponent, 
    ModifygroupsComponent,
    UsergroupsComponent, 
    ModifypublicacionComponent,
    HomepublicationComponent,
    NotificacionComponent, 
    NotificacionesComponent,
    SeePerfilComponent, 
    ModyPerfilComponent,
    ModalModule,
    SeeestadisticasComponent,
    NotiestadisticaComponent, 
    EventestadisticaComponent, 
    SoliestadisticaComponent
  ]
})
export class SharedModule { }
