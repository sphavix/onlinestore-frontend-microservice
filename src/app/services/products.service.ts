import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { ProductResponse } from '../models/product-response';
import { Observable } from 'rxjs';
import { NewProductRequest } from '../models/new-product-request';
import { ProductUpdateRequest } from '../models/product-update-request';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl: string = environment.productServiceUrl;
  public isAuthenticating: boolean = false;

  constructor(private http: HttpClient) { 

  }

  getProducts(){
    return this.http.get<ProductResponse[]>(`${this.baseUrl}`);
  }

  searchProducts(searchString: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.baseUrl}search/${searchString}`);
  }

  getProductByProductId(productId: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}search/product-id/${productId}`);
  }

  createProduct(newProductRequest: NewProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.baseUrl}`, newProductRequest);
  }

  updateProduct(updateProduct: ProductUpdateRequest): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.baseUrl}`, updateProduct);
  }

  deleteProduct(productId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}${productId}`);
  }
}
