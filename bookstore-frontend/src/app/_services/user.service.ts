import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Patient } from '../_models/patient';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl + 'user';

  constructor(private httpClient: HttpClient) { }

  getUser(name: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/' + name);
  }

  async getMyBorrows(name: string): Promise<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl + '/' + name + '/history').toPromise();
  }

  registerUser(caregiver: any): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + '/caregivers/register', caregiver);
  }

  borrowBook(email: any, book: any): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + '/' + email + '/borrowBook', book);
  }

  returnBook(email: any, book: any): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + '/' + email + '/returnBook', book);
  }

}
