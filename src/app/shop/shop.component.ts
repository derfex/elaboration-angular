// External modules.
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

// Internal modules.
import { CartService } from './cart/shared/cart.service';
import { ProductsHTTPService } from 'src/app/shop/products/services-implementation/products-http/products-http.service';
import { IProductTableViewModel } from './products/shared/product-table-view.model';

// Definitions.
type Products = IProductTableViewModel[];


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass'],
})
export class ShopComponent implements OnInit, OnDestroy {
  // region ## Properties
  private products: Products = [];
  private productsInList: Products = [];
  private productsInCart: Products = [];
  private keysInCart: Set<number> = new Set();
  private subscriptionToCart: Subscription;

  // endregion ## Properties

  constructor(
    private cartService: CartService,
    private productsService: ProductsHTTPService,
  ) {
  }

  // region ## Lifecycle hooks
  public ngOnInit() {
    this.productsService.getAll()
      .subscribe(
        (data: Products) => {
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

  public ngOnDestroy() {
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
