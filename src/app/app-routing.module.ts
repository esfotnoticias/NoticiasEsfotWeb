import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ClaveComponent } from './auth/clave/clave.component';
import { NoticiaComponent } from './home/noticia/noticia.component';
import { EmailverificationComponent } from './auth/emailverification/emailverification.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { FirstLoginComponent } from './shared/first-login/first-login.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';

import { ADMIN_ROUTES } from './admin/admin.routes';
import { SecretariahomeComponent } from './secretaria/secretariahome/secretariahome.component';
import { SECRE_ROUTES } from './secretaria/secretaria.routes';
import { ImagenesComponent } from './shared/imagenes/imagenes.component';
import { PublicacionComponent } from './shared/publicaciones/publicacion/publicacion.component';
import { ManageimagesComponent } from './shared/manageimages/manageimages.component';
import { DOCENTE_ROUTES } from './docente/docente.routes';
import { AEESFOT_ROUTES } from './aeesfot/aeesfot.routes';
import { CanEditGuard } from './auth/guards/can-edit.guard';
import { CanSecretariaGuard } from './auth/guards/can-secretaria.guard';
import { CanDocenteGuard } from './auth/guards/can-docente.guard';
import { CanAeesfotGuard } from './auth/guards/can-aeesfot.guard';
import { CanLoggedGuard } from './auth/guards/can-logged.guard';
import { CanNoLoggedGuard } from './auth/guards/can-nologged.guard';
import { CanFirstGuard } from './auth/guards/can-firstl.guard';


const routes: Routes = [

  { path: 'registro', component: RegistroComponent,canActivate:[CanNoLoggedGuard]},
  { path: 'login'   , component: LoginComponent, canActivate:[CanNoLoggedGuard]},
  { path: 'clave'   , component: ClaveComponent, canActivate:[CanNoLoggedGuard]},
  { path: 'admin'   , component: AdminhomeComponent, children:ADMIN_ROUTES, canActivate:[CanEditGuard]},
  { path: 'secretaria'   , component: SecretariahomeComponent, children:SECRE_ROUTES , canActivate:[CanSecretariaGuard] },
  { path: 'aeesfot'   , component: AdminhomeComponent, children:AEESFOT_ROUTES, canActivate:[CanAeesfotGuard]},
  { path: 'docente'   , component: AdminhomeComponent, children:DOCENTE_ROUTES , canActivate:[CanDocenteGuard]},
  { path: 'emailverification', component: EmailverificationComponent, canActivate:[CanFirstGuard] },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

