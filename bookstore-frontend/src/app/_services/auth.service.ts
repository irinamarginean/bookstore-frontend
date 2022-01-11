import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient, handler: HttpBackend ) {
    this.http = new HttpClient(handler);
  }

  login(model: any) {
    let headers = new HttpHeaders({
      "username": model.email,
      "password": model.password  
    });
    let options = { headers: headers };
    return this.http.post(this.authUrl + 'auth', null, options)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.Authorization);
            this.decodedToken = this.jwtHelper.decodeToken(user.Authorization);
          }
        })
      );
  }

  register(model: any) {
    return this.http.post(this.authUrl + 'user', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.jwt);
            this.decodedToken = this.jwtHelper.decodeToken(user.jwt);
          }
        })
      );
  }

  getUser() {
    let name = this.getDecodedToken()?.sub;
    let headers = new HttpHeaders({
      "Authorization": 'Bearer ' + this.getToken()
    });
    let options = { headers: headers };
    return this.http.get(this.authUrl + 'user/' + name, options)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('userRole', user.userRole);
          }
        })
      );
  }

  loggedIn() {
    const token = this.getToken();
    if (token === null) {
      return false; }
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getDecodedToken() {
    let token: string = localStorage.getItem('token') ?? "";
    return this.jwtHelper.decodeToken(token);
  }

  isUserBasic() {
    let userRole: string = localStorage.getItem('userRole') ?? "";
    return userRole === 'BASIC';
  }

  isUserAdmin() {
    let userRole: string = localStorage.getItem('userRole') ?? "";
    return userRole === 'ADMIN';
  }

  getRole() {
    return localStorage.getItem('userRole') ?? "";
  }
}
