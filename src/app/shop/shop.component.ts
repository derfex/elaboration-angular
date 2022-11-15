import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { ProductsHTTPService } from 'src/app/shop/products/services-implementation/products-http/products-http.service'
import { CartService, ItemsState } from './cart/shared/cart.service'
import { ProductTableViewModel } from './products/shared/product-table-view.model'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CartService,
    ProductsHTTPService,
  ],
  selector: 'app-shop',
  styleUrls: ['./shop.component.sass'],
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnDestroy, OnInit {
  public productsInCart: ProductTableViewModel[] = []
  public productsInList: ProductTableViewModel[] = []

  private keysInCart: Set<number> = new Set()
  private products: ProductTableViewModel[] = []

  private readonly destroy$ = new Subject<void>()

  constructor(
    private readonly cartService: CartService,
    private readonly cdr: ChangeDetectorRef,
    private readonly productsService: ProductsHTTPService,
  ) {}

  // region ## Lifecycle hooks
  public ngOnInit(): void {
    this.productsService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: ProductTableViewModel[]): void => {
          this.products = data
          this.productsInList = data.filter(this.needInList, this)
          this.cdr.markForCheck()
        },
        (error): never => {
          throw error
        },
      )

    this.cartService.state
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (payload: ItemsState): void => {
          this.productsInCart = payload.items
          this.keysInCart = payload.keys
          this.productsInList = this.products.filter(this.needInList, this)
          this.cdr.markForCheck()
        },
        (error): never => {
          throw error
        },
      )
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  // endregion ## Lifecycle hooks

  // region ## Methods
  public addToCart(productsComponent): void {
    this.cartService.addProducts(productsComponent.selected)
    productsComponent.clearSelection()
  }

  private needInList(product): boolean {
    return !this.keysInCart.has(product.id)
  }

  // endregion ## Methods
}
