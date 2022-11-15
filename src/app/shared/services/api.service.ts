import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private readonly httpClient: HttpClient) {}

  public get<T>(url): Observable<T> {
    return this.httpClient.get<T>(url)
  }
}
