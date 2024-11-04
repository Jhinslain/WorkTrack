import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private messageService: MessageService) {}

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  // une méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): Observable<boolean> {
    // Send a message to check if the user is logged in, then set the result in loggedIn
    this.messageService.sendMessage('isLoggedIn', {}).pipe(
      tap(value => this.setLoggedIn(value.status !== 'error')),  // set the value in loggedIn
      catchError(error => of(false))
    ).subscribe();  // subscribe to start the Observable

    // Return the Observable of loggedIn
    return this.isLoggedIn$;
  }
}
