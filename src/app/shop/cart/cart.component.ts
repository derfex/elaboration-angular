import {
  Component,
  OnDestroy,
  OnInit,
  Input,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { CartService } from 'src/app/shared/services/cart.service';
import { IProductTableViewModel } from 'src/app/products/products-table-view-model.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit, OnDestroy {
  // region ## Properties
  private itemsPrivate: IProductTableViewModel[] = [];
  private dataSource: MatTableDataSource<IProductTableViewModel> = new MatTableDataSource<IProductTableViewModel>([]);
  private displayedColumns: string[] = ['delete', 'number', 'name', 'parent', 'price'];
  private subscriptionToCart: Subscription;

  @Input()
  set items(items: IProductTableViewModel[]) {
    this.itemsPrivate = items;
    this.dataSource = new MatTableDataSource<IProductTableViewModel>(items);
  }

  get items(): IProductTableViewModel[] {
    return this.itemsPrivate;
  }

  // endregion ## Properties

  constructor(
    private cartService: CartService,
  ) {
  }

  // region ## Lifecycle hooks
  ngOnInit() {
    this.subscriptionToCart = this.cartService.state.subscribe(payload => {
      this.items = payload.items;
    });
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks.
    this.subscriptionToCart.unsubscribe();
  }

  // endregion ## Lifecycle hooks

  // region ## Methods
  deleteItem(id) {
    this.cartService.deleteProductByID(id);
  }

  // endregion ## Methods
}
