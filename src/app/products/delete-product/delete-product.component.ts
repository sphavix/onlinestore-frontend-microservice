import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-delete-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatToolbarModule, RouterModule, MatCardModule, MatOptionModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
  deleteProductForm: FormGroup;

  constructor(private fb: FormBuilder, public usersService: UsersService, private productsService: ProductsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.deleteProductForm = this.fb.group({
      productId: [{ value: '', disabled: true }],
      productName: [{ value: '', disabled: true }],
      category: [{ value: '', disabled: true }],
      unitPrice: [{ value: '', disabled: true }],
      quantityInStock: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      var productID = params['productID']; // Replace with your actual parameter name

      this.productsService.getProductByProductId(productID).subscribe({
        next: (response: ProductResponse) => {
          this.deleteProductForm.setValue({
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

  delete(): void {
    const deleteProduct = this.deleteProductForm.value;
    this.productsService.deleteProduct(deleteProduct.productID).subscribe({
      next: (response: boolean) => {
        if (response)
          this.router.navigate(['admin', 'products']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  get productIDFormControl(): FormControl {
    return this.deleteProductForm.get('productId') as FormControl;
  }

  get productNameFormControl(): FormControl {
    return this.deleteProductForm.get('productName') as FormControl;
  }

  get categoryFormControl(): FormControl {
    return this.deleteProductForm.get('category') as FormControl;
  }

  get unitPriceFormControl(): FormControl {
    return this.deleteProductForm.get('unitPrice') as FormControl;
  }

  get quantityInStockFormControl(): FormControl {
    return this.deleteProductForm.get('quantityInStock') as FormControl;
  }

}
