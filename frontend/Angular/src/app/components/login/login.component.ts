import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {login: '', password: ''};
  errorMessage: string | null = null;

  constructor(private messageService: MessageService, private router: Router, private authService : AuthService ) { }


  ngOnInit(): void {
  }

  login(): void {
    if (!this.user.login && !this.user.password) {
      this.errorMessage = 'Veuillez remplir les champs login et mot de passe';
    } else if (!this.user.login) {
      this.errorMessage = 'Veuillez remplir le champs de login';
    } else if (!this.user.password) {
      this.errorMessage = 'Veuillez remplir le champs de mot de passe';
    } else {
      this.messageService.sendMessage('checkLogin', this.user).subscribe(
        response => {
          if (response.status === 'ok') {
            this.errorMessage = null;

            this.authService.setLoggedIn(true); // après une connexion réussie

            this.router.navigateByUrl('/horaires');

          } else {
            this.errorMessage = response.error || 'Login/Mot de passe invalide.';
          }
        },
        error => {
          this.errorMessage = 'Erreur réseau ou serveur.';
          console.error('Network or server error', error);
        }
      );
    }

  }
}

