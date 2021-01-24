import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  formProduct: FormGroup;
  countries: string[];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onSave(): void {
    
  }

  private buildForm(): void {
    // date = new FormControl(new Date());
    this.formProduct = this.formBuilder.group({
      productname: ['', Validators.required],
      features: '',
      dateRelease: new Date(),
      email: ['', Validators.email],
      country: '',
      price: ['', Validators.min(0.01)],
      unitAvailable: '',
      unitSold: '',
    });
    // https://www.positronx.io/angular-material-file-browse-upload-ui-with-material-components/
  }
}
