import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared.module';
import { ProductService } from './product.service';
import { CountryService } from './country.service';

@NgModule({
  declarations: [ProductComponent, ListComponent],
  imports: [CommonModule, ProductRoutingModule, SharedModule, HttpClientModule],
  providers: [ProductService, CountryService],
})
export class ProductModule {}
