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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { UsersService } from '../../services/user-service';
import { ProductResponse } from '../../models/product-response';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatToolbarModule, RouterModule, MatCardModule, MatOptionModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  editProductForm: FormGroup;

  constructor(private fb: FormBuilder, public usersService: UsersService, private productsService: ProductsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.editProductForm = this.fb.group({
      productId: ['', Validators.required],
      productName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      unitPrice: [''],
      quantityInStock: [''],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      var productId = params['productId']; // Replace with your actual parameter name

      this.productsService.getProductByProductId(productId).subscribe({
        next: (response: ProductResponse) => {
          this.editProductForm.setValue({
            productId: response.productId,
            productName: response.productName,
            category: response.category,
            unitPrice: response.unitPrice,
            quantityInStock: response.quantityInStock
          });
        },

        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  update(): void {
    if (this.editProductForm.valid) {
      const editProduct = this.editProductForm.value;
      this.productsService.updateProduct(editProduct).subscribe({
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

  get productIDFormControl(): FormControl {
    return this.editProductForm.get('productId') as FormControl;
  }

  get productNameFormControl(): FormControl {
    return this.editProductForm.get('productName') as FormControl;
  }

  get categoryFormControl(): FormControl {
    return this.editProductForm.get('category') as FormControl;
  }

  get unitPriceFormControl(): FormControl {
    return this.editProductForm.get('unitPrice') as FormControl;
  }

  get quantityInStockFormControl(): FormControl {
    return this.editProductForm.get('quantityInStock') as FormControl;
  }
}
