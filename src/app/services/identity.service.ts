import { Injectable } from '@angular/core';
import { LoginRequest, AuthResponse, RegisterRequest } from '../models/authentication.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private readonly baseUrl = "http://localhost:5246/authentication";

  constructor(private readonly _httpClient: HttpClient) { }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>(`${this.baseUrl}/login`, request);
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>(`${this.baseUrl}/register`, request);
  }
}
