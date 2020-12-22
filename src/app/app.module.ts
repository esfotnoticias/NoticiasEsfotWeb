import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import {ReactiveFormsModule} from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { environment } from 'src/environments/environment';
import { AdminModule } from './admin/admin.module';
import { SecretariaModule } from './secretaria/secretaria.module';
import { DocenteModule } from './docente/docente.module';
import { AeesfotModule } from './aeesfot/aeesfot.module';

import { ToastrModule } from 'ngx-toastr';
import { CanEditGuard } from './auth/guards/can-edit.guard';
import { CanAeesfotGuard } from './auth/guards/can-aeesfot.guard';
import { CanSecretariaGuard } from './auth/guards/can-secretaria.guard';
import { CanDocenteGuard } from './auth/guards/can-docente.guard';
import { CanLoggedGuard } from './auth/guards/can-logged.guard';
import { CanFirstGuard } from './auth/guards/can-firstl.guard';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    SharedModule,
    AdminModule,
    AuthModule,
    SecretariaModule,
    DocenteModule,
    AeesfotModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    ReactiveFormsModule,
    ClipboardModule,
    ToastrModule.forRoot(),
    
  

  ],
  providers: [
    {provide: BUCKET, useValue:'gs://noticias-esfot.appspot.com'},

    CanEditGuard,CanAeesfotGuard,CanSecretariaGuard,CanDocenteGuard,CanLoggedGuard,CanFirstGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
