import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: any = [];

  constructor(private apiService: ApiService) {
  }

  getAll() {
    this.apiService.get(environment.API.products.getAll)
      .subscribe(
        response => {
          this.products = response;
        },
        error => {
          throw error;
        },
      );
  }
}
