import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatOptionModule, MatSelectModule } from '@angular/material'

import { CategoriesSelectComponent } from './categories-select.component'

@NgModule({
  declarations: [CategoriesSelectComponent],
  exports: [CategoriesSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
  ],
})
export class CategoriesSelectModule {}
