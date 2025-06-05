import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { ProductResponse } from '../../models/product-response';
import { ProductsService } from '../../services/products.service';
import { UsersService } from '../../services/user-service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule, RouterModule, MatTableModule, MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: ProductResponse[] = [];
  displayedColumns: string[] = ['productName', 'category', 'unitPrice', 'quantityInStock', 'actions'];

  constructor(private productsService: ProductsService, public usersService: UsersService, private router: Router) {
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (response: ProductResponse[]) => {
        this.products = response;
      },

      error: (err) => {
        console.log(err);
      }
    });
  }

  edit(product : ProductResponse) : void
  {
    this.router.navigate(['/products', 'edit'], {
      queryParams: {id: product.productId}
    });
  }

  delete(product : ProductResponse) : void
  {
    this.router.navigate(['/products', 'delete'], {
      queryParams: {id: product.productId}
    });
  }

}
