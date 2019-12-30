import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsHTTPService } from 'src/app/shop/products/services-implementation/products-http/products-http.service';
import { IProductTableViewModel } from './products/shared/product-table-view.model';
import productsData from 'src/app/shop/products/services-implementation/products-local/products.data';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass'],
})
export class ShopComponent implements OnInit, OnDestroy {
  // region ## Properties
  // Note: `productsData` will changed to data from the `productsService`.
  private products: IProductTableViewModel[] = productsData;
  private productsInList: IProductTableViewModel[] = productsData;
  private productsInCart: IProductTableViewModel[] = [];
  private keysInCart: Set<number> = new Set();
  private subscriptionToCart: Subscription;

  // endregion ## Properties

  constructor(
    private cartService: CartService,
    private productsService: ProductsHTTPService,
  ) {
  }

  // region ## Lifecycle hooks
  ngOnInit() {
    this.productsService.getAll()
      .subscribe(
        (data: IProductTableViewModel[]) => {
          this.products = data;
          this.productsInList = data.filter(this.needInList, this);
        },
        error => {
          throw error;
        },
      );

    this.subscriptionToCart = this.cartService.state.subscribe(payload => {
      this.productsInCart = payload.items;
      this.keysInCart = payload.keys;
      this.productsInList = this.products.filter(this.needInList, this);
    });
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks.
    this.subscriptionToCart.unsubscribe();
  }

  // endregion ## Lifecycle hooks

  // region ## Methods
  private needInList(product) {
    return !this.keysInCart.has(product.id);
  }

  public addToCart(productsComponent) {
    this.cartService.addProducts(productsComponent.selected);
    productsComponent.clearSelection();
  }

  // endregion ## Methods
}
