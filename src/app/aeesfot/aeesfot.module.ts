import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsAeesfotCrudComponent } from './newsaeesfot/news-aeesfot-crud/news-aeesfot-crud.component';
import { NewsAeesfotHomeComponent } from './newsaeesfot/news-aeesfot-home/news-aeesfot-home.component';
import { EventAeesfotCrudComponent } from './eventaeesfot/event-aeesfot-crud/event-aeesfot-crud.component';
import { EventAeesfotHomeComponent } from './eventaeesfot/event-aeesfot-home/event-aeesfot-home.component';
import { AeesfothomeComponent } from './aeesfothome/aeesfothome.component';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from '../home/home.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ProblemAeesfotCrudComponent } from './problemaeesfot/problem-aeesfot-crud/problem-aeesfot-crud.component';
import { ProblemAeesfotHomeComponent } from './problemaeesfot/problem-aeesfot-home/problem-aeesfot-home.component';
import { NewsAeesfotModifyComponent } from './newsaeesfot/news-aeesfot-modify/news-aeesfot-modify.component';
import { EventAeesfotModifyComponent } from './eventaeesfot/event-aeesfot-modify/event-aeesfot-modify.component';
import { ProblemAeesfotModifyComponent } from './problemaeesfot/problem-aeesfot-modify/problem-aeesfot-modify.component';



@NgModule({
  declarations: [NewsAeesfotCrudComponent, NewsAeesfotHomeComponent, EventAeesfotCrudComponent, EventAeesfotHomeComponent, AeesfothomeComponent, ProblemAeesfotCrudComponent, ProblemAeesfotHomeComponent, NewsAeesfotModifyComponent, EventAeesfotModifyComponent, ProblemAeesfotModifyComponent],
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
export class AeesfotModule { }
