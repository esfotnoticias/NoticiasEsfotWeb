import { Routes } from '@angular/router';
import { NoticiasComponent } from '../home/noticias/noticias.component';
import { NewsAeesfotCrudComponent } from './newsaeesfot/news-aeesfot-crud/news-aeesfot-crud.component';
import { EventAeesfotCrudComponent } from './eventaeesfot/event-aeesfot-crud/event-aeesfot-crud.component';
import { ProblemAeesfotCrudComponent } from './problemaeesfot/problem-aeesfot-crud/problem-aeesfot-crud.component';
import { VistapublicacionComponent } from '../shared/publicaciones/vistapublicacion/vistapublicacion.component';
import { CreategroupsComponent } from '../shared/groups/creategroups/creategroups.component'
import { HomegroupsComponent } from '../shared/groups/homegroups/homegroups.component';
import { ViewgroupsComponent } from '../shared/groups/viewgroups/viewgroups.component';
import { ModifygroupsComponent } from '../shared/groups/modifygroups/modifygroups.component';
import { UsergroupsComponent} from '../shared/groups/usergroups/usergroups.component';
import { NewsAeesfotHomeComponent } from  './newsaeesfot/news-aeesfot-home/news-aeesfot-home.component';
import { EventAeesfotHomeComponent } from './eventaeesfot/event-aeesfot-home/event-aeesfot-home.component';
import { ProblemAeesfotHomeComponent } from './problemaeesfot/problem-aeesfot-home/problem-aeesfot-home.component';
import { NewsAeesfotModifyComponent } from './newsaeesfot/news-aeesfot-modify/news-aeesfot-modify.component';
import { EventAeesfotModifyComponent } from './eventaeesfot/event-aeesfot-modify/event-aeesfot-modify.component';
import { ProblemAeesfotModifyComponent } from './problemaeesfot/problem-aeesfot-modify/problem-aeesfot-modify.component';
import { ModyPerfilComponent } from '../shared/perfil/mody-perfil/mody-perfil.component';
import { SeePerfilComponent } from '../shared/perfil/see-perfil/see-perfil.component';
import { NotiestadisticaComponent } from '../shared/estadisticas/notiestadistica/notiestadistica.component';
import { EventestadisticaComponent } from '../shared/estadisticas/eventestadistica/eventestadistica.component';
import { SoliestadisticaComponent } from '../shared/estadisticas/soliestadistica/soliestadistica.component';
export const AEESFOT_ROUTES: Routes = [
    {path: 'noticias', component:NoticiasComponent },
    {path: 'crearnoticias/:id', component:NewsAeesfotCrudComponent },
    {path: 'eventos/:id', component: EventAeesfotCrudComponent},
    {path: 'solicitud/:id', component: ProblemAeesfotCrudComponent},
    {path: 'vistapublicacion/:id', component:VistapublicacionComponent },
    {path: 'creategroup/:id', component:CreategroupsComponent },
    {path: 'homegroup/:id', component:HomegroupsComponent },
    {path: 'viewgroup/:id', component: ViewgroupsComponent },
    {path: 'modifygroup/:id', component: ModifygroupsComponent },
    {path: 'usersgroup/:id', component: UsergroupsComponent },
    {path: 'newshome/:id', component:NewsAeesfotHomeComponent },
    {path: 'eventshome/:id', component:EventAeesfotHomeComponent },
    {path: 'solicitudhome/:id', component:ProblemAeesfotHomeComponent },
    {path: 'modifynoticias/:id/:idp/:gp', component:NewsAeesfotModifyComponent},
    {path: 'modifyeventos/:id/:idp/:gp', component:EventAeesfotModifyComponent},
    {path: 'modifysolicitud/:id/:idp/:gp', component:ProblemAeesfotModifyComponent},
    {path: 'perfil/:id', component:ModyPerfilComponent},
    {path: 'seeperfil/:id', component:SeePerfilComponent},
    {path: 'notistatistics/:id', component:NotiestadisticaComponent},
    {path: 'eventstatistics/:id', component:EventestadisticaComponent},
    {path: 'solistatistics/:id', component:SoliestadisticaComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'noticias' }];
