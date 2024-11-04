import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {PhpData} from "../models/php-data";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private urlPrefix = 'http://34.163.235.31/';

  constructor(private http: HttpClient) { }

  sendMessage(url: string, data: any): Observable<any> {
    let fullUrl = this.urlPrefix + url + '.php';
    let formData = new FormData();

    if (data !== null && data !== undefined) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }

    return this.http.post<PhpData>(fullUrl, formData, {withCredentials: true}).pipe(
      catchError(error => {
        // This will return an Observable that emits a single value: an object with `error` and `message`
        if (error instanceof HttpErrorResponse && error.error instanceof ErrorEvent) {
          // A client-side or network error occurred.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          console.log('Response body:', error.error);
        }
        return throwError({error: true, message: error.message});
      })
    );
  }


}
