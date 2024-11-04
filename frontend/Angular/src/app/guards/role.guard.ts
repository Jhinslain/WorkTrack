import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ProfilService} from "../services/profil.service";


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private userService: ProfilService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.userService.getRole().pipe(
      map(role => {
        // Vérifier le rôle de l'utilisateur
        if (role !== 'desamianteur') {
          // this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}

