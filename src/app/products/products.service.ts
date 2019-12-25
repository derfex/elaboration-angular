import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { APIService } from 'src/app/shared/services/api.service';

function transformProduct(product) {
  if (!product.parent) {
    product.parent = {
      id: null,
      name: '—',
    };
  }
  return product;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: APIService) {
  }

  getAll() {
    return this.apiService
      .get('assets/products.json')
      .pipe(map((products: []) => products.map(transformProduct)));
  }
}
