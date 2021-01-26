import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  currentPage = 1;
  lastPage: number;
  totalItems = 0;
  private productDataSource: Product[] = [];
  private itemsPerPage = 2;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }
  pageChanged(type: string): void {
    switch (type) {
      case 'first':
        this.products = Object.assign(this.products, this.productDataSource.slice(0, this.itemsPerPage));
        this.currentPage = 1;
        break;
      case 'previous':
        this.currentPage -= 1;
        if (this.currentPage <= 0) { this.currentPage = 1; }
        this.itemsPaginated(this.currentPage);
        break;
      case 'next':
        this.currentPage += 1;
        this.itemsPaginated(this.currentPage);
        break;
      case 'last':
        this.itemsPaginated(this.lastPage);
        break;
      default:
    }
  }

  onNavigateToEdit(id: string): void {
    this.router.navigate(['/products/create', { id }]);
  }

  onDelete(): void {
    //TODO: call to service
  }

  private getProducts(): void {
    this.productService.getProducts().then((data) => {
      this.productDataSource = data.map((product) => ({
        _id: product._id,
        nombre: product.nombre,
        caracteristica: product.caracteristica,
        fechaLanzamiento: new Date(product.fechaLanzamiento).toDateString(),
        email: product.email,
        paisFabricacion: product.paisFabricacion,
        precio: product.precio,
        unidadesVendidas: product.unidadesVendidas,
        unidadesDisponibles: product.unidadesDisponibles,
        imagenURL: product.imagenURL,
      }));
      this.totalItems = this.productDataSource.length;
      this.lastPage = Math.floor(this.totalItems / this.itemsPerPage);
      if (this.totalItems > this.itemsPerPage) {
        this.products = Object.assign(
          this.products,
          this.productDataSource.slice(0, this.itemsPerPage)
        );
      } else {
        this.products = Object.assign(this.products, this.productDataSource);
      }
    });
  }

  private itemsPaginated(page: number): void {
    const since = (page - 1) * this.itemsPerPage;
    const to = since + this.itemsPerPage;

    this.products = Object.assign(this.products, this.productDataSource.slice(since, to));
  }
}
