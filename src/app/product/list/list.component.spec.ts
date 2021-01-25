import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ProductService } from '../product.service';

import { ListComponent } from './list.component';
import { ProductsResponseMock } from '../stub/product-stub';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModule } from '../product.module';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let productService: ProductService;
  const routerStub = {
    navigate: jasmine.createSpy(),
  };
  const activatedRouteStub = {
    snapshot: {
      data: {
        id: '123456',
      },
    },
  };
  const productServicestub = {
    getProducts: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [ProductModule],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ProductService, useValue: productServicestub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return list of products', () => {
    spyOn(productService, 'getProducts').and.returnValue(Promise.resolve(ProductsResponseMock));
    expect(component.products.length).toEqual(6);
   });
});
