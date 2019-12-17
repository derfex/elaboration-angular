import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface IProductGridViewModel {
  id: number;
  name: string;
  parent: {
    id: number;
    name: string;
  };
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

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('assets/products.json')
      .subscribe(
        (data: any[]) => {
          this.products = data
            .map(item => ({
              ...item,
              selected: false,
            }));
        },
        error => {
          throw error;
        },
      );
  }

  getProducts() {
    return this.products;
  }
}
