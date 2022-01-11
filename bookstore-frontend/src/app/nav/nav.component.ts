import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  logIn() {
    this.authService.login(this.model).subscribe(() => {
        this.alertify.success('Logged in successfully!');
        this.router.navigate(['home']);
      },
      error => {
        this.alertify.error('No such user found! Please re-enter your credentials or register.');
        console.log(error);
      });
      
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logOut() {
    this.authService.logOut();
    this.alertify.message('Logged out!');
    this.router.navigate(['./']);
  }
}
