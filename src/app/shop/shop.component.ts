import { Component } from '@angular/core';

import { ProductsService } from 'src/app/products/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass'],
})
export class ShopComponent {
  private products = [];

  constructor(private productsService: ProductsService) {
    setTimeout(() => {
      this.products = this.productsService.getAll();
      debugger;
    }, 2000);
  }

  addToCart(selected) {
  }
}
