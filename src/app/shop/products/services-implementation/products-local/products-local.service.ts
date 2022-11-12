import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { IProductsService, ObservableProducts } from 'src/app/shop/products/services-implementation/products-service';
import productsData from './products.data';

@Injectable({
  providedIn: 'root',
})
export class ProductsLocalService implements IProductsService {
  private readonly observable: ObservableProducts;

  constructor() {
    this.observable = of(productsData);
  }

  public getAll(): ObservableProducts {
    return this.observable;
  }
}
