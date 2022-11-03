import { baseUrl } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  headers= {"authorization":"Bearer "+(localStorage.getItem('token')??'')}
  constructor(private http:HttpClient ) { }

  ping(data: any):Observable<any>{
    return this.http.post(`${baseUrl}/tests/ping`,data, {headers: this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  getTests():Observable<any>{
    return this.http.get(`${baseUrl}/tests`, {headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  getTestsByUser(user_id: any):Observable<any>{
    return this.http.get(`${baseUrl}/tests/by-user/${user_id}`, {headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  getTestsToItem(item_id: any):Observable<any>{
    console.log('aca');
    return this.http.get(`${baseUrl}/tests/to-item/${item_id}`, {headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  getGeneralReport():Observable<any>{
    return this.http.get(`${baseUrl}/tests/general-report`, {headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  getTestsByUsers():Observable<any>{
    return this.http.get(`${baseUrl}/tests/by-users`, {headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  getTestsToItems():Observable<any>{
    return this.http.get(`${baseUrl}/tests/to-items`, {headers:this.headers}).pipe(
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
