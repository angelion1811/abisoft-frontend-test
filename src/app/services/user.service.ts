import { baseUrl } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  headers= {"authorization":"Bearer "+(localStorage.getItem('token')??'')}
  constructor(private http:HttpClient ) { }

  getUsersAll():Observable<any>{
    return this.http.get(`${baseUrl}/users/all`, {headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    let errorMessage = '';
    if (error.status == 0) {
      // Handle client error
      errorMessage = error.error.message;
      console.log(errorMessage)
      //this.router.navigate(['/error'])
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(errorMessage)
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
