import { Component } from '@angular/core';

import { IProductTableViewModel } from 'src/app/products/products-table-view-model.interface';
import productsData from 'src/app/products/products.data';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass'],
})
export class ShopComponent {
  private products: IProductTableViewModel[] = productsData;

  constructor() {
  }
}
