import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'

import { ProductTableViewModel } from 'src/app/shop/products/shared/product-table-view.model'
import { CartService, ItemsState } from './shared/cart.service'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CartService],
  selector: 'app-cart',
  styleUrls: ['./cart.component.sass'],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnDestroy, OnInit {
  public dataSource: MatTableDataSource<ProductTableViewModel> = new MatTableDataSource<ProductTableViewModel>([])
  public displayedColumns: string[] = ['delete', 'number', 'name', 'parent', 'price']

  private itemsPrivate: ProductTableViewModel[] = []
  private subscriptionToCart: Subscription

  constructor(
    private readonly cartService: CartService,
    private readonly cdr: ChangeDetectorRef,
    ) {}

  @Input()
  public get items(): ProductTableViewModel[] {
    return this.itemsPrivate
  }

  public set items(items: ProductTableViewModel[]) {
    this.itemsPrivate = items
    this.dataSource = new MatTableDataSource<ProductTableViewModel>(items)
  }

  // region ## Lifecycle hooks
  public ngOnInit() {
    this.subscriptionToCart = this.cartService.state
      .subscribe((payload: ItemsState): void => {
        this.items = payload.items
        this.cdr.markForCheck()
      })
  }

  public ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks.
    this.subscriptionToCart.unsubscribe()
  }

  // endregion ## Lifecycle hooks

  // region ## Methods
  public deleteItem(id): void {
    this.cartService.deleteProductByID(id)
  }

  public hasDisplayedData(): boolean {
    return !!this.dataSource.filteredData.length
  }

  // endregion ## Methods
}
