import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import {
  MatSort,
  Sort,
} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IProductTableViewModel } from './products-table-view-model.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent {
  // region ## Properties
  private itemsPrivate: IProductTableViewModel[] = [];
  private dataSource: MatTableDataSource<IProductTableViewModel> = new MatTableDataSource<IProductTableViewModel>([]);
  private displayedColumns: string[] = ['select', 'number', 'name', 'parent', 'price'];
  private selection = new SelectionModel<IProductTableViewModel>(true, []);
  private filterPrivate: number = null;

  @Input()
  set items(items: IProductTableViewModel[]) {
    this.itemsPrivate = items;
    this.dataSource.data = items;
  }

  get items(): IProductTableViewModel[] {
    return this.itemsPrivate;
  }

  @Input()
  set filter(filter: number) {
    this.filterPrivate = filter;
    this.dataSource.filter = filter ? filter + '' : '';
  }

  get filter(): number {
    return this.filterPrivate;
  }

  @ViewChild(MatSort, {static: false})
  sort: MatSort;

  // endregion ## Properties

  constructor() {
    this.dataSource.filterPredicate = (data, filter) => (
      data.parent.id === +filter
    );
  }

  // region ## Methods
  private sortData(sort: Sort) {
    const data = this.itemsPrivate.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = data;
  }

  // region ### Selection
  // Whether the number of selected elements matches the total number of rows.
  private isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  private masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  // The label for the checkbox on the passed row.
  private checkboxLabel(row?: IProductTableViewModel): string {
    if (!row) {
      return `${ this.isAllSelected() ? 'select' : 'deselect' } all`;
    }
    return `${ this.selection.isSelected(row) ? 'deselect' : 'select' } row ${ row.id + 1 }`;
  }


  public get selected(): IProductTableViewModel[] {
    return this.selection.selected;
  }

  public clearSelection(): void {
    this.selection.clear();
  }

  // endregion ### Selection
  // endregion ## Methods
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
