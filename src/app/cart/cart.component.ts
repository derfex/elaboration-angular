import {
  Component,
  Input,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { IProductTableViewModel } from 'src/app/products/products-table-view-model.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent {
  // region ## Properties
  private itemsPrivate: IProductTableViewModel[] = [];
  private dataSource: MatTableDataSource<IProductTableViewModel> = new MatTableDataSource<IProductTableViewModel>([]);
  private displayedColumns: string[] = ['number', 'name', 'parent', 'price'];

  @Input()
  set items(items: IProductTableViewModel[]) {
    this.itemsPrivate = items;
    this.dataSource = new MatTableDataSource<IProductTableViewModel>(items);
  }

  get items(): IProductTableViewModel[] {
    return this.itemsPrivate;
  }

  // endregion ## Properties
}
