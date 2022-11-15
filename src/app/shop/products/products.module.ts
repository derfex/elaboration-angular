import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatCheckboxModule, MatSortModule, MatTableModule } from '@angular/material'

import { EmptinessModule } from 'src/app/shop/shared/components/emptiness/emptiness.module'
import { ProductsComponent } from './products.component'

@NgModule({
  declarations: [ProductsComponent],
  exports: [ProductsComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,

    // For the app.
    EmptinessModule,
  ],
})
export class ProductsModule {}
