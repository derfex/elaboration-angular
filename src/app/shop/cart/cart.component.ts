// External modules.
import {
  Component,
  OnDestroy,
  OnInit,
  Input,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

// Internal modules.
import { CartService } from './shared/cart.service';
import {
  IProductTableViewModel,
  ProductModels,
} from 'src/app/shop/products/shared/product-table-view.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit, OnDestroy {
  // region ## Properties
  private itemsPrivate: ProductModels = [];
  private dataSource: MatTableDataSource<IProductTableViewModel> = new MatTableDataSource<IProductTableViewModel>([]);
  private displayedColumns: string[] = ['delete', 'number', 'name', 'parent', 'price'];
  private subscriptionToCart: Subscription;

  @Input()
  set items(items: ProductModels) {
    this.itemsPrivate = items;
    this.dataSource = new MatTableDataSource<IProductTableViewModel>(items);
  }

  get items(): ProductModels {
    return this.itemsPrivate;
  }

  // endregion ## Properties

  constructor(
    private cartService: CartService,
  ) {
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
  private hasDisplayedData(): boolean {
    return !!this.dataSource.filteredData.length;
  }

  private deleteItem(id): void {
    this.cartService.deleteProductByID(id);
  }

  // endregion ## Methods
}
