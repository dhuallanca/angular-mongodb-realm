import { RouterTestingModule } from '@angular/router/testing';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ProductService } from '../product.service';

import { ListComponent } from './list.component';
import { ProductsResponseMock } from '../stub/product-stub';
import { ProductModule } from '../product.module';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  let productService: jasmine.SpyObj<ProductService>;
  const productServicesSpy = jasmine.createSpyObj('ProductService', {
    getProducts: new Promise((resolve, reject) => {}),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductModule, RouterTestingModule],
      declarations: [ListComponent],
      providers: [
        { provide: ProductService, useValue: productServicesSpy },
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    }).compileComponents();
    productService = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    productService.getProducts.and.returnValue(
      Promise.resolve(ProductsResponseMock)
    );
    await productService.getProducts();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return first page of products', () => {
    expect(component.products.length).toEqual(2);
  });
});
