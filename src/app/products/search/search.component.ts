import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductResponse } from '../../models/product-response';
import { ProductsService } from '../../services/products.service';
import { UsersService } from '../../services/user-service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  products: ProductResponse[] = [];

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, public usersService: UsersService) { }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const searchString = params['searchString?'] || '';
      this.productsService.searchProducts(searchString).subscribe({
        next: (response: ProductResponse[]) => {
          this.products = response;
      },
        error: (error) => {
          console.log(error);
        }
      });
    });
  }
}
