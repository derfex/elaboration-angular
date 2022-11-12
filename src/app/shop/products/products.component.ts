import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IProductTableViewModel, ProductModels } from './shared/product-table-view.model';

@Component({
  selector: 'app-products',
  styleUrls: ['./products.component.sass'],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  public dataSource: MatTableDataSource<IProductTableViewModel> = new MatTableDataSource<IProductTableViewModel>([]);
  public displayedColumns: string[] = ['select', 'number', 'name', 'parent', 'price'];
  public selection = new SelectionModel<IProductTableViewModel>(true, []);

  @ViewChild(MatSort, { static: false })
  private sort: MatSort;

  private itemsPrivate: ProductModels = [];
  private filterPrivate: number = null;

  constructor() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => (
      data.parent.id === +filter
    );
  }

  @Input()
  get items(): ProductModels {
    return this.itemsPrivate;
  }

  set items(items: ProductModels) {
    this.itemsPrivate = items;
    this.dataSource.data = items;
  }

  @Input()
  get filter(): number {
    return this.filterPrivate;
  }

  set filter(filter: number) {
    this.filterPrivate = filter;
    this.dataSource.filter = filter ? filter + '' : '';
  }

  public get selected(): ProductModels {
    return this.selection.selected;
  }

  public clearSelection(): void {
    this.selection.clear();
  }

  // region ## Methods
  public sortData(sort: Sort): void {
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

  public hasDisplayedData(): boolean {
    return !!this.dataSource.filteredData.length;
  }

  // region ### Selection
  // Whether the number of selected elements matches the total number of rows.
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  public masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  // The label for the checkbox on the passed row.
  public checkboxLabel(row?: IProductTableViewModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  // endregion ### Selection
  // endregion ## Methods
}

// Extra.
function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
