import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from './country.service';
import { Country } from './model/country';
import { Product } from './model/product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  formProduct: FormGroup;
  countries: Country[];
  product: Product;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private countryService: CountryService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.getCountries();
    const id = this.activatedRoute.snapshot.params.id;
    if (id) {
      this.productService.getProduct(id).then((data) => {
        this.product = data;
        this.buildForm();
      });
    } else {
      this.buildForm();
    }
  }

  onSave(): void {
    const product: Product = {
      nombre: this.formProduct.get('productname').value,
      caracteristica: this.formProduct.get('features').value,
      fechaLanzamiento: this.formProduct.get('dateRelease').value.toISOString(),
      email: this.formProduct.get('email').value,
      paisFabricacion: this.formProduct.get('country').value.name,
      precio: this.formProduct.get('price').value,
      unidadesVendidas: this.formProduct.get('unitSold').value,
      unidadesDisponibles: this.formProduct.get('unitAvailable').value,
      imagenURL: '',
    };
    if (!!this.product) {
      product._id = this.product._id;
      this.productService.update(product).then(() => {
        this.route.navigate(['/products']);
      });
    } else {
      this.productService.insert(product).then(() => {
        this.route.navigate(['/products']);
      });
    }
  }

  private buildForm(): void {
    const nombre = this.product?.nombre || '';
    const dateRelease = this.product ? new Date(this.product.fechaLanzamiento) : new Date();
    const pais = this.product ? this.countries.find(country => country.name === this.product.paisFabricacion) : '';
    this.formProduct = this.formBuilder.group({
      productname: [nombre, Validators.required],
      features: this.product?.caracteristica || '',
      dateRelease,
      email: [this.product?.email || '', Validators.email],
      country: pais,
      price: [this.product?.precio || '', Validators.min(0.01)],
      unitAvailable: this.product?.unidadesDisponibles || '',
      unitSold: this.product?.unidadesVendidas || '',
    });
  }

  private getCountries(): void {
     this.countryService
       .getCountries()
       .subscribe((data) => (this.countries = data));
  }
}
