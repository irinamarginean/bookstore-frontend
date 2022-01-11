import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookAddComponent } from './book/book-add/book-add.component';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { MyBorrowsComponent } from './users/my-borrows/my-borrows-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { RoleGuard } from './_guards/role.guard';
import { WelcomeComponent } from './users/welcome/welcome.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { 
      path: 'home', 
      component: HomeComponent,
      canActivate: [AuthGuard], 
    },
    { 
      path: 'books',
      component: BookListComponent,
      canActivate: [AuthGuard],
    },
    { 
      path: 'books/add',
      component: BookAddComponent,
      canActivate: [AuthGuard, RoleGuard],
      data: {
          expectedRole: 'ADMIN'
      }
    },
    { 
      path: 'books/edit/:name',
      component: BookEditComponent,
      canActivate: [AuthGuard, RoleGuard],
      data: {
          expectedRole: 'ADMIN'
      }
    },
    { 
      path: 'my-borrows',
      component: MyBorrowsComponent,
      canActivate: [AuthGuard, RoleGuard],
      data: {
          expectedRole: 'BASIC'
    }},
    { path: '**', redirectTo: '', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
