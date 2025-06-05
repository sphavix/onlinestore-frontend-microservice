import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/user-service';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../../models/authentication-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.usersService.login(email, password).subscribe({
        next: (response: AuthenticationResponse) => {
          if (response.userId == "admin_id") {
            //admin user
            this.usersService.setAuthStatus(response.token, true, response.fullName);
            this.router.navigate(['admin', 'products']);
          }
          else {
            //normal user
            this.usersService.setAuthStatus(response.token, false, response.fullName);
            this.router.navigate(['products', 'showcase']);
          }
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

  get emailFormControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
