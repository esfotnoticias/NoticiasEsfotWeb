import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { UsershomeComponent } from './users/usershome/usershome.component';
import { CrudusersComponent } from './users/crudusers/crudusers.component';
import { EventAdminHomeComponent } from './eventadmin/event-admin-home/event-admin-home.component';
import { NewsAdminHomeComponent } from './newsadmin/news-admin-home/news-admin-home.component';
import { NewsAdminCrudComponent } from './newsadmin/news-admin-crud/news-admin-crud.component';
import { EventAdminCrudComponent } from './eventadmin/event-admin-crud/event-admin-crud.component';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from '../home/home.module';
import { MaterialModule } from '../material.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NewsAdminModifyComponent } from './newsadmin/news-admin-modify/news-admin-modify.component';
import { EvenAdminModifyComponent } from './eventadmin/even-admin-modify/even-admin-modify.component';
import { ModifyuserComponent } from './users/modifyuser/modifyuser.component';
import { UserestadisticaComponent } from './estadisticas/userestadistica/userestadistica.component';
//import { YouTubePlayerModule } from "@angular/youtube-player";
//import  serviceAccount from "src\app\admin\adminhome\noticias-esfot-firebase-adminsdk-if8sb-652b4373ae.json";


@NgModule({
  declarations: [AdminhomeComponent, UsershomeComponent, CrudusersComponent, EventAdminHomeComponent, NewsAdminHomeComponent, NewsAdminCrudComponent,
     EventAdminCrudComponent,
     NewsAdminModifyComponent,
     EvenAdminModifyComponent,
     ModifyuserComponent,
     UserestadisticaComponent
   ],
  imports: [
    CommonModule,
    SharedModule,
    HomeModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    //ModalModule.forRoot(),

  //  YouTubePlayerModule

  ]
})
export class AdminModule { }
