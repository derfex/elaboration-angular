import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { IProductTableViewModel, ProductModels } from 'src/app/shop/products/shared/product-table-view.model';
import { CartService } from './shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnDestroy, OnInit {
  public dataSource: MatTableDataSource<IProductTableViewModel> = new MatTableDataSource<IProductTableViewModel>([]);
  public displayedColumns: string[] = ['delete', 'number', 'name', 'parent', 'price'];

  private itemsPrivate: ProductModels = [];
  private subscriptionToCart: Subscription;

  constructor(private readonly cartService: CartService) {}

  @Input()
  public get items(): ProductModels {
    return this.itemsPrivate;
  }

  public set items(items: ProductModels) {
    this.itemsPrivate = items;
    this.dataSource = new MatTableDataSource<IProductTableViewModel>(items);
  }

  // region ## Lifecycle hooks
  public ngOnInit() {
    this.subscriptionToCart = this.cartService.state.subscribe(payload => {
      this.items = payload.items;
    });
  }

  public ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks.
    this.subscriptionToCart.unsubscribe();
  }

  // endregion ## Lifecycle hooks

  // region ## Methods
  public deleteItem(id): void {
    this.cartService.deleteProductByID(id);
  }

  public hasDisplayedData(): boolean {
    return !!this.dataSource.filteredData.length;
  }

  // endregion ## Methods
}
