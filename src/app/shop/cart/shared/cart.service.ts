// External modules.
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

// Internal modules.
import {
  ProductModels,
} from 'src/app/shop/products/shared/product-table-view.model';

// Definitions.
interface IItemsState {
  items: ProductModels;
  keys: Set<number>;
}

const defaultState: IItemsState = {
  items: [],
  keys: new Set(),
};


@Injectable({
  providedIn: 'root',
})
export class CartService {
  // region ## Properties
  private subject = new BehaviorSubject<IItemsState>(defaultState);

  public get state(): Observable<IItemsState> {
    return this.subject.asObservable();
  }

  // endregion ## Properties

  // region ## Methods
  public addProducts(products: ProductModels): void {
    const value = this.subject.getValue();
    const items = value.items.concat(products);
    const keys = value.keys;
    products.forEach(product => keys.add(product.id));
    this.subject.next({
      items,
      keys,
    });
  }

  public deleteProductByID(id): void {
    const value = this.subject.getValue();
    const items = value.items.filter(item => item.id !== id);
    const keys = value.keys;
    keys.delete(id);
    this.subject.next({
      items,
      keys,
    });
  }

  // endregion ## Methods
}
