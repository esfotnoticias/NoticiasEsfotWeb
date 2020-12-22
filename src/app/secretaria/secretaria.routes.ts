import { Routes } from '@angular/router';
import { NoticiasComponent } from '../home/noticias/noticias.component';
import { NewsSecreCrudComponent } from './newssecre/news-secre-crud/news-secre-crud.component';
import { EventSecreCrudComponent } from './secreevent/event-secre-crud/event-secre-crud.component';
import { ProblemSecreCrudComponent } from './problemsecre/problem-secre-crud/problem-secre-crud.component';
import { VistapublicacionComponent } from '../shared/publicaciones/vistapublicacion/vistapublicacion.component';
import { CreategroupsComponent } from '../shared/groups/creategroups/creategroups.component'
import {HomegroupsComponent} from '../shared/groups/homegroups/homegroups.component';
import {ViewgroupsComponent} from '../shared/groups/viewgroups/viewgroups.component';
import {ModifygroupsComponent} from '../shared/groups/modifygroups/modifygroups.component';
import { UsergroupsComponent} from '../shared/groups/usergroups/usergroups.component';
import { NewsSecreHomeComponent } from '../secretaria/newssecre/news-secre-home/news-secre-home.component';
import { EventSecreHomeComponent } from '../secretaria/secreevent/event-secre-home/event-secre-home.component';
import {ProblemSecreHomeComponent} from '../secretaria/problemsecre/problem-secre-home/problem-secre-home.component';
import {NewsSecreModifyComponent} from '../secretaria/newssecre/news-secre-modify/news-secre-modify.component';
import {EventSecreModifyComponent} from '../secretaria/secreevent/event-secre-modify/event-secre-modify.component';
import { ProblemSecreModifyComponent } from '../secretaria/problemsecre/problem-secre-modify/problem-secre-modify.component';
import { ModyPerfilComponent } from '../shared/perfil/mody-perfil/mody-perfil.component';
import { SeePerfilComponent } from '../shared/perfil/see-perfil/see-perfil.component';
import { NotiestadisticaComponent } from '../shared/estadisticas/notiestadistica/notiestadistica.component';
import { EventestadisticaComponent } from '../shared/estadisticas/eventestadistica/eventestadistica.component';
import { SoliestadisticaComponent } from '../shared/estadisticas/soliestadistica/soliestadistica.component';

export const SECRE_ROUTES: Routes = [
    
    {path: 'noticias', component:NoticiasComponent },
    {path: 'crearnoticias/:id', component:NewsSecreCrudComponent },
    {path: 'eventos/:id', component:EventSecreCrudComponent },
    {path: 'solicitud/:id', component:ProblemSecreCrudComponent },
    {path: 'vistapublicacion/:id', component:VistapublicacionComponent },
    {path: 'creategroup/:id', component:CreategroupsComponent },
    {path: 'homegroup/:id', component:HomegroupsComponent },
    {path: 'viewgroup/:id', component: ViewgroupsComponent },
    {path: 'modifygroup/:id', component: ModifygroupsComponent },
    {path: 'usersgroup/:id', component: UsergroupsComponent },
    {path: 'newshome/:id', component:NewsSecreHomeComponent },
    {path: 'eventshome/:id', component:EventSecreHomeComponent },
    {path: 'solicitudhome/:id', component:ProblemSecreHomeComponent },
    {path: 'modifynoticias/:id/:idp/:gp', component:NewsSecreModifyComponent},
    {path: 'modifyeventos/:id/:idp/:gp', component:EventSecreModifyComponent},
    {path: 'modifysolicitud/:id/:idp/:gp', component:ProblemSecreModifyComponent},
    {path: 'perfil/:id', component:ModyPerfilComponent},
    {path: 'seeperfil/:id', component:SeePerfilComponent},
    {path: 'notistatistics/:id', component:NotiestadisticaComponent},
    {path: 'eventstatistics/:id', component:EventestadisticaComponent},
    {path: 'solistatistics/:id', component:SoliestadisticaComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'noticias' }];
