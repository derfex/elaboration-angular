import { Injectable } from '@angular/core';

import { APIService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: APIService) {
  }

  getAll() {
    return this.apiService.get('assets/products.json');
  }
}
