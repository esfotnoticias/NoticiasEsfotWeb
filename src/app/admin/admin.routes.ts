import { Routes } from '@angular/router';
import { CrudusersComponent } from './users/crudusers/crudusers.component';
import { UsershomeComponent } from './users/usershome/usershome.component';
import { NoticiasComponent } from '../home/noticias/noticias.component';
import { EventAdminCrudComponent } from './eventadmin/event-admin-crud/event-admin-crud.component';
import { NewsAdminCrudComponent } from './newsadmin/news-admin-crud/news-admin-crud.component';
import { NewsAdminHomeComponent } from './newsadmin/news-admin-home/news-admin-home.component';
import { VistapublicacionComponent } from '../shared/publicaciones/vistapublicacion/vistapublicacion.component';
import { EventAdminHomeComponent } from './eventadmin/event-admin-home/event-admin-home.component';
import { NewsAdminModifyComponent } from './newsadmin/news-admin-modify/news-admin-modify.component';
import { EvenAdminModifyComponent } from './eventadmin/even-admin-modify/even-admin-modify.component';
import { ModifyuserComponent } from './users/modifyuser/modifyuser.component';
import { ModyPerfilComponent } from '../shared/perfil/mody-perfil/mody-perfil.component';
import { SeePerfilComponent } from '../shared/perfil/see-perfil/see-perfil.component';
import { UserestadisticaComponent } from './estadisticas/userestadistica/userestadistica.component';
import { NotiestadisticaComponent } from '../shared/estadisticas/notiestadistica/notiestadistica.component';
import { EventestadisticaComponent } from '../shared/estadisticas/eventestadistica/eventestadistica.component';
export const ADMIN_ROUTES: Routes = [
    {path: 'noticias', component:NoticiasComponent },
    {path: 'nuevo/:id', component:CrudusersComponent },
    {path: 'usermodify/:id/:ad', component:ModifyuserComponent },
    {path: 'eventos/:id', component:EventAdminCrudComponent },
    {path: 'crearnoticias/:id', component:NewsAdminCrudComponent },
    {path: 'vistapublicacion/:id', component:VistapublicacionComponent },
    {path: 'modificar/:id', component:UsershomeComponent},
    {path: 'newshome/:id', component:NewsAdminHomeComponent },
    {path: 'eventshome/:id', component:EventAdminHomeComponent },
    {path: 'modifynoticias/:id/:idp/:gp', component:NewsAdminModifyComponent},
    {path: 'modifyeventos/:id/:idp/:gp', component:EvenAdminModifyComponent},
    {path: 'perfil/:id', component:ModyPerfilComponent},
    {path: 'seeperfil/:id', component:SeePerfilComponent},
    {path: 'userstatistics/:id', component:UserestadisticaComponent}, 
    {path: 'notistatistics/:id', component:NotiestadisticaComponent},
    {path: 'eventstatistics/:id', component:EventestadisticaComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'noticias' }];
    
