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
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/user-service';
import { AuthenticationResponse } from '../../models/authentication-response';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatToolbarModule, RouterModule, MatCardModule, MatOptionModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(formBuilder: FormBuilder, private usersService: UsersService, private router: Router) {
    this.registerForm = formBuilder.group({
      FullName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(3)]],
      Gender: [''],
    });

  }

  register(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.usersService.register(user).subscribe({
        next: (response: AuthenticationResponse) => {
          this.usersService.setAuthStatus(response.token, false, response.fullName);
          this.router.navigate(['products', 'showcase']);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

  get emailFormControl(): FormControl
  {
    return this.registerForm.get('Email') as FormControl;
  }

  get passwordFormControl(): FormControl
  {
    return this.registerForm.get('Password') as FormControl;
  }

  get personNameFormControl(): FormControl
  {
    return this.registerForm.get('FullName') as FormControl;
  }

  get genderFormControl(): FormControl
  {
    return this.registerForm.get('Gender') as FormControl;
  }
}
