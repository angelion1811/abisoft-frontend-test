import { baseUrl } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  headers= {"authorization":"Bearer "+(localStorage.getItem('token')??'')}
  constructor(private http:HttpClient ) { }

  getIteams():Observable<any>{
    return this.http.get(`${baseUrl}/items`, {headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  getIteamsAll():Observable<any>{
    return this.http.get(`${baseUrl}/items/all`, {headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  getIteam(id:any):Observable<any>{
    return this.http.get(`${baseUrl}/items/${id}`, {headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  addItem(data:any):Observable<any>{
    return this.http.post(`${baseUrl}/items`, data,{headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  editItem(id:any, data:any):Observable<any>{
    return this.http.put(`${baseUrl}/items/${id}`, data,{headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  deleteItem(id:any):Observable<any>{
    return this.http.delete(`${baseUrl}/items/${id}`,{headers:this.headers}).pipe(
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
