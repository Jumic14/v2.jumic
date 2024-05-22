import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxTypedWriterModule } from 'ngx-typed-writer';

import { LanguageService } from './../../../services/language.service';
import { ThemeService } from './../../../services/theme.service';
import { WorksDash } from './works-dash/works-dash.component';
import { CategoriesDashComponent } from './categories-dash/categories-dash.component';
import { StacksDashComponent } from './stacks-dash/stacks-dash.component';
import { ContactDashComponent } from './contact-dash/contact-dash.component';
import { CurriculumsDashComponent } from './curriculums-dash/curriculums-dash.component';
import { ImagesDashComponent } from './images-dash/images-dash.component';
import { WorksStacksDashComponent } from './works-stacks-dash/works-stacks-dash.component';

@NgModule({
  declarations: [
    DashboardComponent,
    WorksDash,
    CategoriesDashComponent,
    StacksDashComponent,
    ContactDashComponent,
    CurriculumsDashComponent,
    ImagesDashComponent,
    WorksStacksDashComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxTypedWriterModule,
  ],
  providers: [LanguageService, ThemeService],
})
export class DashboardModule {}
