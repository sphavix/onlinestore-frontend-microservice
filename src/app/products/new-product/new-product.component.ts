import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { UsersService } from '../../services/user-service';
import { ProductResponse } from '../../models/product-response';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatToolbarModule, RouterModule, MatCardModule, MatOptionModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  newProductForm: FormGroup;

  constructor(private fb: FormBuilder, public usersService: UsersService, private productsService: ProductsService, private router: Router) {
    this.newProductForm = this.fb.group({
      productName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      unitPrice: [''],
      quantityInStock: [''],
    });
  }

  ngOnInit(): void {
  }

  create(): void {
    if (this.newProductForm.valid) {
      const newProduct = this.newProductForm.value;
      this.productsService.createProduct(newProduct).subscribe({
        next: (response: ProductResponse) => {
          if (response)
            this.router.navigate(['admin', 'products']);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

  get productNameFormControl(): FormControl {
    return this.newProductForm.get('productName') as FormControl;
  }

  get categoryFormControl(): FormControl {
    return this.newProductForm.get('category') as FormControl;
  }

  get unitPriceFormControl(): FormControl {
    return this.newProductForm.get('unitPrice') as FormControl;
  }

  get quantityInStockFormControl(): FormControl {
    return this.newProductForm.get('quantityInStock') as FormControl;
  }
}
