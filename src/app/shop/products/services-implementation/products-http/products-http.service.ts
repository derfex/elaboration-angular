import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { APIService } from 'src/app/shared/services/api.service'
import { ProductsService } from 'src/app/shop/products/services-implementation/products-service'
import { ProductTableViewModel } from 'src/app/shop/products/shared/product-table-view.model'
import { environment } from 'src/environments/environment'

@Injectable()
export class ProductsHTTPService implements ProductsService {
  constructor(private readonly apiService: APIService) {}

  public getAll(): Observable<ProductTableViewModel[]> {
    return this.apiService
      .get(environment.API.products.getAll)
      .pipe(map<ProductTableViewModel[], ProductTableViewModel[]>(products => products.map(transformProduct)))
  }
}

function transformProduct(product: ProductTableViewModel): ProductTableViewModel {
  if (!product.parent) {
    (product as any).parent = {
      id: null,
      name: '—',
    } as ProductTableViewModel['parent']
  }
  return product
}
