import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { RoleGuard } from './_guards/role.guard';
import { AlertifyService } from './_services/alertify.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { BookAddComponent } from './book/book-add/book-add.component';
import { MyBorrowsComponent } from './users/my-borrows/my-borrows-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookService } from './_services/book.service';
import { JwtInterceptor } from './_services/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './_services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './users/welcome/welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    BookListComponent,
    BookEditComponent,
    BookAddComponent,
    MyBorrowsComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule 
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    RoleGuard,
    BookService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
