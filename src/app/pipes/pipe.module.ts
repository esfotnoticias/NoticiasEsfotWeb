import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoimagePipe } from './noimage.pipe';
import {DomseguroPipe} from './domseguro.pipe';
import { YoutubePipe } from './youtube.pipe';
import { ViewtimePipe } from './viewtime.pipe';
import { FechasPipe } from './fechas.pipe';
import { FechalastPipe } from './fechalast.pipe';
import { TextoPortadaPipe } from './texto-portada.pipe';
import { DocnamePipe } from './docname.pipe';
import { CarrerasPipe } from './carreras.pipe';


@NgModule({
  declarations: [NoimagePipe,DomseguroPipe, YoutubePipe, ViewtimePipe, FechasPipe, FechalastPipe, TextoPortadaPipe, DocnamePipe, CarrerasPipe],
  imports: [
    CommonModule
  ],
  exports:[
    NoimagePipe,
    DomseguroPipe,
    YoutubePipe,
    ViewtimePipe,
    FechasPipe,
    FechalastPipe,
    TextoPortadaPipe,
    DocnamePipe,
    CarrerasPipe

  ]
})
export class PipeModule { }
