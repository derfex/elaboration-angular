import {
  Component,
  OnInit,
} from '@angular/core';

import { ProductsService } from 'src/app/products/products.service';
import { IProductTableViewModel } from 'src/app/products/products-table-view-model.interface';
import productsData from 'src/app/products/products.data';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass'],
})
export class ShopComponent implements OnInit {
  // Note: `productsData` will changed to data from the `productsService`.
  private products: IProductTableViewModel[] = productsData;
  private productsInList: IProductTableViewModel[] = productsData;

  constructor(
    private productsService: ProductsService,
  ) {
  }

  ngOnInit() {
    this.productsService.getAll()
      .subscribe(
        (data: IProductTableViewModel[]) => {
          this.products = data;
          this.productsInList = data;
        },
        error => {
          throw error;
        },
      );
  }
}
