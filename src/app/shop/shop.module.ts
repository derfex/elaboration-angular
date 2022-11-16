import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { CartModule } from './cart/cart.module'
import { ProductsModule } from './products/products.module'
import { CategoriesSelectModule } from './shared/components/categories-select/categories-select.module'
import { ShopComponent } from './shop.component'

@NgModule({
  declarations: [ShopComponent],
  exports: [ShopComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,

    // For the app.
    CartModule,
    CategoriesSelectModule,
    ProductsModule,
  ],
  providers: [],
})
export class ShopModule {}
