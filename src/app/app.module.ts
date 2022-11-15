import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { ShopModule } from './shop/shop.module'

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // For the app.
    ShopModule,
  ],
  providers: [],
})
export class AppModule {}
