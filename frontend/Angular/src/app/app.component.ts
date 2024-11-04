import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'frontend';
  isLoggedInval$!: Observable<boolean>;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.isLoggedInval$ = this.authService.isLoggedIn$;

  }
}
