import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocentehomeComponent } from './docentehome/docentehome.component';
import { EventDocenteCrudComponent } from './eventdocente/event-docente-crud/event-docente-crud.component';
import { EventDocenteHomeComponent } from './eventdocente/event-docente-home/event-docente-home.component';
import { NewsDocenteHomeComponent } from './newsdocente/news-docente-home/news-docente-home.component';
import { NewsDocenteCrudComponent } from './newsdocente/news-docente-crud/news-docente-crud.component';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from '../home/home.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NewsDocenteModifyComponent } from './newsdocente/news-docente-modify/news-docente-modify.component';
import { EventDocenteModifyComponent } from './eventdocente/event-docente-modify/event-docente-modify.component';
import { GroupDocenteAdminComponent } from './groupdocente/group-docente-admin/group-docente-admin.component';
import { GroupDocenteCrudComponent } from './groupdocente/group-docente-crud/group-docente-crud.component';
import { GroupDocenteHomeComponent } from './groupdocente/group-docente-home/group-docente-home.component';
import { ProblemDocenteCrudComponent } from './problemdocente/problem-docente-crud/problem-docente-crud.component';
import { ProblemDocenteHomeComponent } from './problemdocente/problem-docente-home/problem-docente-home.component';
import { ProblemDocenteModifyComponent } from './problemdocente/problem-docente-modify/problem-docente-modify.component';



@NgModule({
  declarations: [DocentehomeComponent, EventDocenteCrudComponent, EventDocenteHomeComponent, NewsDocenteHomeComponent, NewsDocenteCrudComponent, NewsDocenteModifyComponent, EventDocenteModifyComponent, GroupDocenteAdminComponent, GroupDocenteCrudComponent, GroupDocenteHomeComponent, ProblemDocenteCrudComponent, ProblemDocenteHomeComponent, ProblemDocenteModifyComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ]
})
export class DocenteModule { }
