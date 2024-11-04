import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  isLoggedInval2$!: Observable<boolean>;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.isLoggedInval2$ = this.authService.isLoggedIn$;

  }
}
