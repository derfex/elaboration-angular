// External modules.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Internal modules.
import { ShopModule } from './shop/shop.module';

// Main component.
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ShopModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
