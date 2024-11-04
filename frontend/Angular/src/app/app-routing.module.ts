import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {LoginComponent} from "./components/login/login.component";
import {FichesAmianteComponent} from "./components/fiches-amiante/fiches-amiante.component";
import {ScheduleComponent} from "./components/schedule/schedule.component";
import {ProfilComponent} from "./components/profil/profil.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoggedOutGuard} from "./guards/logged-out.guard";
import {RoleGuard} from "./guards/role.guard";



const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },  // protéger la route avec le "Guard"
  {path: 'horaires', component: ScheduleComponent},
  {path: 'fiches-amiante', component: FichesAmianteComponent, canActivate: [RoleGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
