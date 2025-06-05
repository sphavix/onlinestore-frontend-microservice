import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { ProductResponse } from '../../models/product-response';
import { UsersService } from '../../services/user-service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule, RouterModule],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css'
})
export class ShowcaseComponent {
  products: ProductResponse[] = [];

  constructor(private productService: ProductsService, public usersService: UsersService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (response: ProductResponse[]) => {
        this.products = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
