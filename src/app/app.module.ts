import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxTypedWriterModule } from 'ngx-typed-writer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme.service';
import { LoginComponent } from './components/control/login/login.component';
import { HomeModule } from './components/home/home.module';
import { DashboardModule } from './components/control/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxTypedWriterModule,
    HomeModule,
    DashboardModule,
  ],
  providers: [LanguageService, ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
