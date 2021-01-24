import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [ProductComponent, ListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
  ]
})
export class ProductModule { }
