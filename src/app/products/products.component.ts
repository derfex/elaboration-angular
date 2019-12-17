import { Component, OnInit } from '@angular/core';
import products from './products.data';

interface IProductGridViewModel {
  id: number;
  name: string;
  group: string;
  price: number;
  selected: boolean;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent implements OnInit {
  products: IProductGridViewModel[] = [];

  constructor() {
  }

  ngOnInit() {
    this.products = products
      .map(item => ({
        ...item,
        selected: false,
      }));
  }

  getProducts() {
    return this.products;
  }
}
