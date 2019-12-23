import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {
  }

  /*
  public post({url, data, resolve, reject}) {
    this.httpClient.post(url, data)
      .toPromise()
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  }
  /**/

  public get<T>(url): Observable<T> {
    return this.httpClient.get<T>(url);
  }
}
