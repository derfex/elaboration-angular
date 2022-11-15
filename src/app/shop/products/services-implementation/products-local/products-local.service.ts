import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ProductsService } from 'src/app/shop/products/services-implementation/products-service';
import { ProductTableViewModel } from 'src/app/shop/products/shared/product-table-view.model';
import productsData from './products.data';

@Injectable({
  providedIn: 'root',
})
export class ProductsLocalService implements ProductsService {
  private readonly observable: Observable<ProductTableViewModel[]>;

  constructor() {
    this.observable = of(productsData);
  }

  public getAll(): Observable<ProductTableViewModel[]> {
    return this.observable;
  }
}
