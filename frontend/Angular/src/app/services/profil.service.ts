import { Injectable } from '@angular/core';
import {MessageService} from "./message.service";
import {catchError, from, Observable, of, throwError} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  constructor(private messageService: MessageService) { }

  getProfil(): Observable<any> {
    return this.messageService.sendMessage('isLoggedIn', {}).pipe(
      map(response => {
        if (response.status === 'error' ) {
          // Si une erreur est retournée par le serveur, renvoyer une erreur Observable
          throw new Error(response.message);
        } else {
          // Sinon, renvoyer les données de l'utilisateur
          return response;
        }
      }),
      catchError(error => {
        // Gérer les erreurs réseau ou autres erreurs non gérées
        return throwError(error.message);
      })
    );
  }

  logout(): Observable<any> {
    return this.messageService.sendMessage('logout', {});
  }

  getRole(): Observable<string | null> {
    return this.getProfil().pipe(
      map(response => {
        if (response.data && response.data.length > 0) {
          const user = response.data[0];
          return user.role;
        } else {
          throw new Error('User object not found in response');
        }
      }),
      catchError(error => {
        console.error('Error getting role:', error);
        return of(null);
      })
    );
  }





}
