import { Observable } from 'rxjs';
import { IProductTableViewModel } from 'src/app/shop/products/shared/product-table-view.model';

export type ObservableProducts = Observable<IProductTableViewModel[]>;

export interface IProductsService {
  getAll(): ObservableProducts;
}
