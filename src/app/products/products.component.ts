import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

interface IProductTableViewModel {
  id: number;
  name: string;
  parent: {
    id: number;
    name: string;
  };
  price: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent implements OnInit {
  private dataSourcePrivate: MatTableDataSource<IProductTableViewModel> = new MatTableDataSource<IProductTableViewModel>([]);
  @Input()
  set dataSource(data) {
    this.dataSourcePrivate = new MatTableDataSource<IProductTableViewModel>(data);
  }


  displayedColumns: string[] = ['select', 'number', 'name', 'parent', 'price'];
  selection = new SelectionModel<IProductTableViewModel>(true, []);

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    /*
    this.http.get(environment.API.products.getAll)
      .subscribe(
        (data: IProductTableViewModel[]) => {
          this.dataSource = new MatTableDataSource<IProductTableViewModel>(data);
        },
        error => {
          throw error;
        },
      );
    /**/
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
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

  outputProducts() {
    debugger;
    if (!this.dataSource) {
      return 'Nothing';
    }
    const products = this.dataSource
      .map(item => ({
        name: item.name,
      }));
    return JSON.stringify(products);
  }
}
