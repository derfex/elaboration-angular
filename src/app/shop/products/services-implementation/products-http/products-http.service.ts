import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { APIService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

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
export class ProductsHTTPService {
  constructor(private apiService: APIService) {
  }

  getAll() {
    return this.apiService
      .get(environment.API.products.getAll)
      .pipe(map((products: []) => products.map(transformProduct)));
  }
}
