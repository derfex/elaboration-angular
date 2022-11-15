import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { CartComponent } from './cart/cart.component'
import { ProductsComponent } from './products/products.component'
import { CategoriesSelectComponent } from './shared/components/categories-select/categories-select.component'
import { EmptinessComponent } from './shared/components/emptiness/emptiness.component'
import { ShopComponent } from './shop.component'

@NgModule({
  declarations: [
    ShopComponent,

    CartComponent,
    CategoriesSelectComponent,
    EmptinessComponent,
    ProductsComponent,
  ],
  exports: [ShopComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
  ],
  providers: [],
})
export class ShopModule {}
