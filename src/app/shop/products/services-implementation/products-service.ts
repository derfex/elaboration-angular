import { Observable } from 'rxjs';
import { ProductTableViewModel } from 'src/app/shop/products/shared/product-table-view.model';

export interface ProductsService {
  getAll(): Observable<ProductTableViewModel[]>;
}
