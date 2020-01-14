// External modules.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Internal modules.
import { APIService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

// Definitions.
interface ICategory {
  id: number;
  name: string;
}

export type CategoryModels = ICategory[];


@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private apiService: APIService) {
  }

  public getAll(): Observable<CategoryModels> {
    return this.apiService
      .get(environment.API.categories.getAll);
  }
}
