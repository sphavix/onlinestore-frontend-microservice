import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { UsersService } from './services/user-service';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatToolbarModule, RouterModule, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  searchForm: FormGroup;

  constructor(public usersService: UsersService, private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchStr: ['', []]
    });
  }

  search()
  {
    this.router.navigateByUrl(`/products/search/${this.searchForm.value.searchStr}`);
  }

  logout()
  {
    this.usersService.logout();
    this.router.navigate(['products', 'showcase']);
  }
}
