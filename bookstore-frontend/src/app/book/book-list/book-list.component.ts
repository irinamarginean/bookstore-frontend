import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/_models/book';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { BookService } from '../../_services/book.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Borrow } from 'src/app/_models/borrow';
import { BookBorrow } from 'src/app/_models/bookBorrow';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  borrowedBooks: Book[] = [];
  borrows: Borrow[] = [];
  allBooks: BookBorrow[] = [];
  currentEmail: string = "";

  constructor(
    private bookService: BookService, 
    private alertify: AlertifyService, 
    private route: ActivatedRoute, 
    private authService: AuthService, 
    private userService: UserService) { }

  async ngOnInit() {
    this.currentEmail = this.authService.getDecodedToken()?.sub;
    await this.loadBooks();
    await this.loadBorrows();
    await this.loadAllBooks();
    console.log(this.allBooks); 
  }

  async loadBooks() {
    this.books = [];
    this.books = await this.bookService.getBooks();
  }

  async loadBorrows() {
    this.borrows = [];
    this.borrows = await this.userService.getMyBorrows(this.currentEmail);
    for (let borrow of this.borrows) {
      let book: Book = {
        name: borrow.book?.name,
        author: borrow.book?.author,
        genre: borrow.book?.bookGenre,
        booksInStock: borrow.book?.booksInStock
      } 
      this.borrowedBooks.push(book);
    }
  }

  async loadAllBooks() {
    this.allBooks = [];
    for (let book of this.books) {
      let bookBorrow: BookBorrow = {
        book: book,
        wasBorrowed: false
      };
      let sameBooks =  this.borrows.filter(x => x.book?.name === book.name && this.wasBookBorrowed(x));
      if (sameBooks.length > 0) {
        bookBorrow.wasBorrowed = true;
        bookBorrow.borrowDate = sameBooks[0].borrowDate;
        bookBorrow.returnDate = sameBooks[0].returnDate;
      }
      this.allBooks.push(bookBorrow);
    }   
    console.log(this.allBooks); 
  }

  wasBookBorrowed(borrow: Borrow) {
    return borrow.borrowDate || borrow.returnDate;
  }

  async borrowBook(book: Book) {
    this.userService.borrowBook(this.currentEmail, book).subscribe(() => {
      this.alertify.success(book.name + ' was borrowed!');
      location.reload();
    });
  }

  removeBook(name: any) {
    this.bookService.removeBook(name).subscribe();
    this.alertify.success(name + ' was removed!');
    location.reload();
  }

  isUserAdmin() {
    return this.authService.isUserAdmin();
  }

  isUserBasic() {
    return this.authService.isUserBasic();
  }
}
