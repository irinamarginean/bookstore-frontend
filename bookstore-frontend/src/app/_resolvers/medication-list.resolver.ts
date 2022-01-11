// import { Injectable } from '@angular/core';
// import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
// import { AlertifyService } from '../_services/alertify.service';
// import { Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Book } from '../_models/book';
// import { BookService } from '../_services/book.service';

// @Injectable()
// export class MedicationListResolver implements Resolve<Book[]> {

//     constructor(private medicationService: BookService, private router: Router, private alertify: AlertifyService) {}

//     async resolve(route: ActivatedRouteSnapshot): Ori=<any> {
//         return await this.medicationService.getBooks().pipe(
//             catchError(error => {
//                 this.alertify.error('Problem retrieving data!');
//                 this.router.navigate(['/home']);
//                 return of(null);
//             })
//         )
//     }
// }