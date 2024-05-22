import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxTypedWriterModule } from 'ngx-typed-writer';

import { LanguageService } from './../../services/language.service';
import { ThemeService } from './../../services/theme.service';
import { getDataService } from '../../services/database/getData.service';
import { BannerComponent } from './banner/banner.component';
import { AboutComponent } from './about/about.component';
import { WorksComponent } from './works/works.component';
import { ContactComponent } from './contact/contact.component';
import { SkillsComponent } from './skills/skills.component';
import { MeanSystemComponent } from './mean-system/mean-system.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    AboutComponent,
    WorksComponent,
    ContactComponent,
    SkillsComponent,
    MeanSystemComponent,
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
  providers: [LanguageService, ThemeService, getDataService],
})
export class HomeModule {}
