import { TestBed } from '@angular/core/testing';

import { ProductsHTTPService } from './products-http.service';

describe('ProductsHTTPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsHTTPService = TestBed.get(ProductsHTTPService);
    expect(service).toBeTruthy();
  });
});
