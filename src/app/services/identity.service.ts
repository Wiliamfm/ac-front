import { Injectable } from '@angular/core';
import { LoginRequest, AuthResponse, RegisterRequest } from '../models/authentication.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private readonly baseUrl = "http://localhost:5246/authentication";
  private authUser: AuthResponse | null = null;

  constructor(private readonly _httpClient: HttpClient) { }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>(`${this.baseUrl}/login`, request);
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>(`${this.baseUrl}/register`, request);
  }

  isAuthenticated(): boolean {
    return !!window.sessionStorage.getItem("is_authenticated");
  }

  getToken(): string {
    try {
      const token = document.cookie.split("token=")[1] ?? "";
      console.log(token);
      return token;
    } catch (error) {
      console.error("Unable to get token from cookie:\n", error);
      return "";
    }
  }

  setAuthUser(authUser: AuthResponse) {
    this.authUser = authUser;
  }

  getRoles(): string[] {
    if (!this.authUser) return [];
    return this.authUser.roles.split(";");
  }
}
