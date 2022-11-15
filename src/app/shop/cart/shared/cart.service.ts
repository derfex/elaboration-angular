import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { ProductTableViewModel } from 'src/app/shop/products/shared/product-table-view.model'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly subject = new BehaviorSubject<ItemsState>(defaultState)

  public get state(): Observable<ItemsState> {
    return this.subject.asObservable()
  }

  // region ## Methods
  public addProducts(products: ProductTableViewModel[]): void {
    const value = this.subject.getValue()
    const items = value.items.concat(products)
    const keys = value.keys
    products.forEach(product => keys.add(product.id))
    this.subject.next({
      items,
      keys,
    })
  }

  public deleteProductByID(id): void {
    const value = this.subject.getValue()
    const items = value.items.filter(item => item.id !== id)
    const keys = value.keys
    keys.delete(id)
    this.subject.next({
      items,
      keys,
    })
  }

  // endregion ## Methods
}

export interface ItemsState {
  readonly items: ProductTableViewModel[]
  readonly keys: Set<number>
}

const defaultState: ItemsState = {
  items: [],
  keys: new Set(),
}
