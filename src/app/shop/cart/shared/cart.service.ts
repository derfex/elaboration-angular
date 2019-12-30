import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
} from 'rxjs';

import { IProductTableViewModel } from 'src/app/shop/products/shared/product-table-view.model';

interface ItemsState {
  items: IProductTableViewModel[];
  keys: Set<number>;
}

const defaultState: ItemsState = {
  items: [],
  keys: new Set(),
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private subject = new BehaviorSubject<ItemsState>(defaultState);

  public get state() {
    return this.subject.asObservable();
  }

  public addProducts(products: IProductTableViewModel[]) {
    const value = this.subject.getValue();
    const items = value.items.concat(products);
    const keys = value.keys;
    products.forEach(product => keys.add(product.id));
    this.subject.next({
      items,
      keys,
    });
  }

  public deleteProductByID(id) {
    const value = this.subject.getValue();
    const items = value.items.filter(item => item.id !== id);
    const keys = value.keys;
    keys.delete(id);
    this.subject.next({
      items,
      keys,
    });
  }
}
