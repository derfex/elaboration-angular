import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule, MatIconModule, MatTableModule } from '@angular/material'

import { EmptinessModule } from '../shared/components/emptiness/emptiness.module'
import { CartComponent } from './cart.component'

@NgModule({
  declarations: [CartComponent],
  exports: [CartComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,

    // For the app.
    EmptinessModule,
  ],
})
export class CartModule {}
