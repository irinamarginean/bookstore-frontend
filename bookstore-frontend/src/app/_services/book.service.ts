import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../_models/book';
import { Injectable } from '@angular/core';


@Injectable()
export class BookService {

  baseUrl = environment.apiUrl + 'book';
  constructor(private httpClient: HttpClient) { }

  async getBooks(): Promise<Book[]> {
    return this.httpClient.get<Book[]>(this.baseUrl).toPromise();
  }

  getBook(name: any): Observable<Book> {
    return this.httpClient.get<Book>(this.baseUrl + '/' + name);
  }

  addBook(book: any): Observable<Book> {
    return this.httpClient.post<Book>(this.baseUrl, book);
  }

  updateBook(name: any, book: any): Observable<Book> {
    return this.httpClient.put<Book>(this.baseUrl + '/' + name, book);
  }

  removeBook(name: any): Observable<any> {
    return this.httpClient.delete<Book>(this.baseUrl + '/' + name);
  }
}
