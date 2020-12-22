import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { MaterialModule } from '../material.module';
import { PipeModule } from '../pipes/pipe.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [NoticiasComponent, NoticiaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PipeModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  exports:[
    NoticiaComponent,
    NoticiasComponent
  ]
})
export class HomeModule { }
