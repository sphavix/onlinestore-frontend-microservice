import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { UsersService } from './services/user-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatToolbarModule, RouterModule, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-frontend';

  constructor(public usersService: UsersService, private router: Router) {
  }

  logout()
  {
    this.usersService.logout();
    this.router.navigate(['products', 'showcase']);
  }
}
