import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ShowcaseComponent } from './products/showcase/showcase.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { SearchComponent } from './products/search/search.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';
import { NewProductComponent } from './products/new-product/new-product.component';

export const routes: Routes = [
    { path: 'auth/register', component: RegisterComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'products/showcase', component: ShowcaseComponent },
    { path: 'admin/products', component: ProductListComponent },
    { path: 'products/search', component: SearchComponent },
    { path: 'products/search/:searchString?', component: SearchComponent },
    { path: 'products/edit/:productId', component: EditProductComponent },
    { path: 'products/delete/:productId', component: DeleteProductComponent },
    { path: 'products/create', component: NewProductComponent },
    { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];