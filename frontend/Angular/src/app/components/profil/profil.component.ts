import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProfilService} from "../../services/profil.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user: any = {}; // initialize user as an empty object

  constructor(private userService: ProfilService, private router: Router,private authService : AuthService, private cd: ChangeDetectorRef ) {
  }

  ngOnInit() {
    this.userService.getProfil().subscribe(
      response => {
        if (response.status === 'ok') {
          this.user = response.data[0]; // prenez note que data est un tableau, donc vous devez accéder au premier élément
        } else {
          console.error('Erreur lors de la récupération du profil utilisateur: ', response);
        }
      },
      error => {
        console.error('Erreur lors de la récupération du profil utilisateur: ', error);
      }
    );
  }

  logout(): void {
    this.userService.logout().subscribe(
    );

    this.authService.setLoggedIn(false); // après une déconnexion réussie
    this.router.navigateByUrl('');
  }

}
