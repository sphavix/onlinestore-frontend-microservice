import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { HttpClient } from "@angular/common/http";
import { Register } from "../models/register";
import { Observable, of } from "rxjs";
import { AuthenticationResponse } from "../models/authentication-response";

@Injectable({
    providedIn: 'root',
})

export class UsersService {
    private baseUrl: string = environment.apiUrl;
    public isAuthenticated: boolean = false;
    public isAdmin: boolean = false;
    public currentUser: string | null = "";

    constructor (private http: HttpClient) {
        this.isAuthenticated = !!localStorage.getItem('authToken');
        const isAdminValue = localStorage.getItem('isAdmin');
        this.isAdmin = isAdminValue !== null && isAdminValue !== undefined && isAdminValue.toLowerCase() === 'true';
        this.currentUser = localStorage.getItem("currentUser");
    }


    register(register: Register): Observable<AuthenticationResponse> {
        return this.http.post<AuthenticationResponse>(`${this.baseUrl}register`, register);
    }

    login(email: string, password: string): Observable<AuthenticationResponse> {
        if (email === 'admin@geeking.com' && password === 'StrongPassword123') {
            // If it's the admin user, return a custom Observable
            const adminUser: AuthenticationResponse = {
              userId: 'admin_id',
              fullName: 'John Doe',
              email: 'admin@geeking.com',
              gender: 'male', // Add the appropriate gender for the admin user
              token: 'admin_token',
              success: true
            };
            return of(adminUser);
        }else {
            return this.http.post<AuthenticationResponse>(`${this.baseUrl}login`, { email, password });
        }
    }

    setAuthStatus(token: string, isAdmin: boolean, currentUser: string): void {
        this.isAuthenticated = true;
        this.isAdmin = isAdmin;
        localStorage.setItem('authToken', token);
        localStorage.setItem('isAdmin', isAdmin.toString());
        localStorage.setItem('currentUser', currentUser);
        this.currentUser = currentUser;
    }

    logout(): void {
        this.isAuthenticated = false;
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }
}