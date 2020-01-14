import { TestBed } from '@angular/core/testing';

import { ProductsLocalService } from './products-local.service';

describe('ProductsLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsLocalService = TestBed.get(ProductsLocalService);
    expect(service).toBeTruthy();
  });
});
