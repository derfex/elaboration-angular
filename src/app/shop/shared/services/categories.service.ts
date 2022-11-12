import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private readonly apiService: APIService) {}

  public getAll(): Observable<CategoryModels> {
    return this.apiService
      .get(environment.API.categories.getAll);
  }
}

interface ICategory {
  id: number;
  name: string;
}

export type CategoryModels = ICategory[];
