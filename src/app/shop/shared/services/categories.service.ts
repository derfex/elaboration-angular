import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { APIService } from 'src/app/shared/services/api.service'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private readonly apiService: APIService) {}

  public getAll(): Observable<Category[]> {
    return this.apiService
      .get(environment.API.categories.getAll)
  }
}

export interface Category {
  readonly id: number
  readonly name: string
}
