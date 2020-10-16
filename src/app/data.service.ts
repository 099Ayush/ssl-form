import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _url_get: string = "https://cs251-outlab-6.herokuapp.com/initial_values/";
  private _url_post: string = "https://cs251-outlab-6.herokuapp.com/add_new_feedback/";

  constructor(private http: HttpClient) { }

  getData(): Observable<JSON> {
    return this.http.get<JSON>(this._url_get);
  }

  postData(data: JSON) {
    return this.http.post<any>(this._url_post, data);
  }

}
