import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/_models/book';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { BookService } from '../../_services/book.service';
import { Router } from '@angular/router';
import { BOOK_GENRES } from 'src/app/_models/constants';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  @Input() model: Book = {} as Book;
  allGenres: string[] = BOOK_GENRES;

  constructor(private bookService: BookService,
              private alertify: AlertifyService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loadBook();
  }

  loadBook() {
    this.bookService.getBook(this.route.snapshot.params.name).subscribe(book => {
      this.model = book;
    });
  }

  editBook(editBookForm: any) {
    let name = decodeURI(this.route.snapshot.params.name);
    this.bookService.updateBook(name, this.model).subscribe(book => {
      this.alertify.success(this.route.snapshot.params.name + ' was edited successfully!');
      this.router.navigate(['/books']);
    }, error => {
      console.log(error);
      this.alertify.error(error);
    });
  }
}
