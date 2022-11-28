import { baseUrl } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  headers= {"authorization":"Bearer "+(localStorage.getItem('token')??'')}
  constructor(private http:HttpClient ) { }

  getPersons():Observable<any>{
    return this.http.get(`${baseUrl}/persons`, {headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  getPersonsAll():Observable<any>{
    return this.http.get(`${baseUrl}/persons/all`, {headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  getPerson(id:any):Observable<any>{
    return this.http.get(`${baseUrl}/persons/${id}`, {headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  addPerson(data:any):Observable<any>{
    return this.http.post(`${baseUrl}/persons`, data,{headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  editPerson(id:any, data:any):Observable<any>{
    return this.http.put(`${baseUrl}/persons/${id}`, data,{headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  deletePerson(id:any):Observable<any>{
    return this.http.delete(`${baseUrl}/persons/${id}`,{headers:this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    let errorMessage = '';
    if (error.status == 0) {
      // Handle client error
      console.log('cayo en esta parte el error');
      errorMessage = error.error.message;
      console.log(errorMessage)
      //this.router.navigate(['/error'])
    } else if(error.status == 422) {
      console.log(error);
      alert(error.error.message);
    } else {
      console.log('cayo en el else el error');
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(errorMessage)

    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
