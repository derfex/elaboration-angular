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
        (response: any[]) => {
          response.forEach(item => {
            if (!item.parent) {
              item.parent = {
                id: null,
                name: '—',
              };
            }
          });
          this.products = response;
        },
        error => {
          throw error;
        },
      );
  }
}
