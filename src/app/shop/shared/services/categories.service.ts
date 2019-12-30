import { Injectable } from '@angular/core';

import { APIService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private apiService: APIService) {
  }

  getAll() {
    return this.apiService
      .get(environment.API.categories.getAll);
  }
}
