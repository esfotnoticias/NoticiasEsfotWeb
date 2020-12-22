import { Routes } from '@angular/router';
import { NoticiasComponent } from '../home/noticias/noticias.component';
import { NewsDocenteCrudComponent } from './newsdocente/news-docente-crud/news-docente-crud.component';
import { EventDocenteCrudComponent } from './eventdocente/event-docente-crud/event-docente-crud.component';
import { VistapublicacionComponent } from '../shared/publicaciones/vistapublicacion/vistapublicacion.component';
import { NewsDocenteHomeComponent } from './newsdocente/news-docente-home/news-docente-home.component' ;
import { EventDocenteHomeComponent} from './eventdocente/event-docente-home/event-docente-home.component';
import { NewsDocenteModifyComponent } from './newsdocente/news-docente-modify/news-docente-modify.component';
import { EventDocenteModifyComponent } from './eventdocente/event-docente-modify/event-docente-modify.component';
import { CreategroupsComponent } from '../shared/groups/creategroups/creategroups.component'
import {HomegroupsComponent} from '../shared/groups/homegroups/homegroups.component';
import {ViewgroupsComponent} from '../shared/groups/viewgroups/viewgroups.component';
import {ModifygroupsComponent} from '../shared/groups/modifygroups/modifygroups.component';
import { UsergroupsComponent} from '../shared/groups/usergroups/usergroups.component';
import { ModyPerfilComponent } from '../shared/perfil/mody-perfil/mody-perfil.component';
import { SeePerfilComponent } from '../shared/perfil/see-perfil/see-perfil.component';
import { EventestadisticaComponent } from '../shared/estadisticas/eventestadistica/eventestadistica.component';
import { NotiestadisticaComponent } from '../shared/estadisticas/notiestadistica/notiestadistica.component';
import { FirstLoginComponent } from '../shared/first-login/first-login.component';
import { ProblemDocenteCrudComponent } from './problemdocente/problem-docente-crud/problem-docente-crud.component';
import { ProblemDocenteHomeComponent } from './problemdocente/problem-docente-home/problem-docente-home.component';
import { ProblemDocenteModifyComponent } from './problemdocente/problem-docente-modify/problem-docente-modify.component';
import { SoliestadisticaComponent } from '../shared/estadisticas/soliestadistica/soliestadistica.component';
export const DOCENTE_ROUTES: Routes = [
    {path: 'noticias', component:NoticiasComponent },
    {path: 'crearnoticias/:id', component: NewsDocenteCrudComponent },
    {path: 'eventos/:id', component:EventDocenteCrudComponent},
    {path: 'solicitud/:id', component:ProblemDocenteCrudComponent },
    {path: 'vistapublicacion/:id', component:VistapublicacionComponent },
    {path: 'creategroup/:id', component:CreategroupsComponent },
    {path: 'homegroup/:id', component:HomegroupsComponent },
    {path: 'viewgroup/:id', component: ViewgroupsComponent },
    {path: 'modifygroup/:id', component: ModifygroupsComponent },
    {path: 'usersgroup/:id', component: UsergroupsComponent },
    {path: 'newshome/:id', component:NewsDocenteHomeComponent },
    {path: 'eventshome/:id', component:EventDocenteHomeComponent },
    {path: 'solicitudhome/:id', component:ProblemDocenteHomeComponent },
    {path: 'modifynoticias/:id/:idp/:gp', component:NewsDocenteModifyComponent},
    {path: 'modifyeventos/:id/:idp/:gp', component:EventDocenteModifyComponent},
    {path: 'modifysolicitud/:id/:idp/:gp', component:ProblemDocenteModifyComponent},
    {path: 'perfil/:id', component:ModyPerfilComponent},
    {path: 'seeperfil/:id', component:SeePerfilComponent},
    {path: 'notistatistics/:id', component:NotiestadisticaComponent},
    {path: 'eventstatistics/:id', component:EventestadisticaComponent},
    { path: 'solistatistics/:id', component:  SoliestadisticaComponent},


    { path: '**', pathMatch: 'full', redirectTo: 'noticias' }];
