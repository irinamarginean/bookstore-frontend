import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BookService } from 'src/app/_services/book.service';
import { Book } from 'src/app/_models/book';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BOOK_GENRES } from 'src/app/_models/constants';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  model: Book = {} as Book;
  allGenres: string[] = BOOK_GENRES;

  constructor(private bookService: BookService, private alertify: AlertifyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  addBook(addBookForm: NgForm) {
    this.bookService.addBook(this.model).subscribe(() => {
      this.alertify.success(`${this.model.name} was added successfully!`);
      this.router.navigate(['/books']);
    },
    error => {
      this.alertify.error(error);
    });
  }
}
