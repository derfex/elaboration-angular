import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { APIService } from 'src/app/shared/services/api.service';
import { IProductsService, ObservableProducts } from 'src/app/shop/products/services-implementation/products-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsHTTPService implements IProductsService {
  constructor(private readonly apiService: APIService) {}

  public getAll(): ObservableProducts {
    return this.apiService
      .get(environment.API.products.getAll)
      .pipe(map((products: []) => products.map(transformProduct)));
  }
}

function transformProduct(product) {
  if (!product.parent) {
    product.parent = {
      id: null,
      name: '—',
    };
  }
  return product;
}
