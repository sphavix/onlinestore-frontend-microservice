import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { HttpClient } from "@angular/common/http";
import { Register } from "../models/register";
import { Observable } from "rxjs";
import { AuthenticationResponse } from "../models/authentication-response";

@Injectable({
    providedIn: 'root',
})

export class UsersService {
    private baseUrl: string = environment.apiUrl;
    public isAuthenticated: boolean = false;
    public currentUser: string | null = "";

    constructor (private http: HttpClient) {
        this.isAuthenticated = !!localStorage.getItem('authToken');
        this.currentUser = localStorage.getItem("currentUser");
    }


    register(register: Register): Observable<AuthenticationResponse> {
        return this.http.post<AuthenticationResponse>(`${this.baseUrl}register`, register);
    }

    login(email: string, password: string): Observable<AuthenticationResponse> {
        return this.http.post<AuthenticationResponse>(`${this.baseUrl}login`, { email, password });
    }

    setAuthStatus(token: string, currentUser: string): void {
        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', currentUser);
        this.isAuthenticated = true;
        this.currentUser = currentUser;
    }

    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        this.isAuthenticated = false;
        this.currentUser = null;
    }
}