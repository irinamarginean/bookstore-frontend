import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Borrow } from 'src/app/_models/borrow';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-my-borrows-list',
  templateUrl: './my-borrows-list.component.html',
  styleUrls: ['./my-borrows-list.component.css']
})
export class MyBorrowsComponent implements OnInit {

  borrows: Borrow[] = [];
  currentEmail: string = "";

  constructor(public userService: UserService, private authService: AuthService, private aleritify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentEmail = this.authService.getDecodedToken()?.sub;
    this.loadMyBorrows(this.currentEmail);
  }

  async loadMyBorrows(email: string) {
    this.borrows = await this.userService.getMyBorrows(email);
  }

  returnBook(book: any) {
    this.userService.returnBook(this.currentEmail, book).subscribe();
    location.reload();
  }
}
