import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { IProductTableViewModel } from './products-table-view-model.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent {
  private itemsPrivate: IProductTableViewModel[] = [];
  private dataSource: MatTableDataSource<IProductTableViewModel> = new MatTableDataSource<IProductTableViewModel>([]);
  private displayedColumns: string[] = ['select', 'number', 'name', 'parent', 'price'];
  private selection = new SelectionModel<IProductTableViewModel>(true, []);

  @Input()
  set items(items: IProductTableViewModel[]) {
    this.itemsPrivate = items;
    this.dataSource = new MatTableDataSource<IProductTableViewModel>(items);
  }

  get items(): IProductTableViewModel[] {
    return this.itemsPrivate;
  }

  constructor(private http: HttpClient) {
  }

  // Whether the number of selected elements matches the total number of rows.
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  // The label for the checkbox on the passed row.
  checkboxLabel(row?: IProductTableViewModel): string {
    if (!row) {
      return `${ this.isAllSelected() ? 'select' : 'deselect' } all`;
    }
    return `${ this.selection.isSelected(row) ? 'deselect' : 'select' } row ${ row.id + 1 }`;
  }

  // Public methods.
  get selected() {
    return this.selection.selected;
  }
}
