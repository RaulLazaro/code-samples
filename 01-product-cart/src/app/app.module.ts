import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataService } from "./services/data.service";
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ProductComponent } from './components/product/product.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    OrderSummaryComponent,
    ProductComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
