import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.model.userRole = "BASIC";
    this.authService.register(this.model).subscribe(next => {
        this.alertify.success('Registered successfully!');
        this.router.navigate(['home']);
      },
      error => {
        this.alertify.error('Could not create user.');
      });
  }

}
