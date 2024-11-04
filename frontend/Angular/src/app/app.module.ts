import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "./services/message.service";
import {HttpClientModule} from "@angular/common/http";
import { FichesAmianteComponent } from './components/fiches-amiante/fiches-amiante.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import { CreateScheduleDialogComponent } from './components/create-schedule-dialog/create-schedule-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ProfilComponent } from './components/profil/profil.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import { ScheduleDayDialogComponent } from './components/schedule-day-dialog/schedule-day-dialog.component';
import { ModifyScheduleComponent } from './components/modify-schedule/modify-schedule.component';
import {DatePipe} from "@angular/common";

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    LoginComponent,
    FichesAmianteComponent,
    ScheduleComponent,
    CreateScheduleDialogComponent,
    ProfilComponent,
    ScheduleDayDialogComponent,
    ModifyScheduleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  providers: [MessageService, DatePipe, {provide: LOCALE_ID, useValue: 'fr'}],
  exports: [
    NavbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
