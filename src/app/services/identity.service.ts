import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/authentication.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private readonly baseUrl = "http://localhost:5246/authentication";

  constructor(private readonly _httpClient: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this._httpClient.post<LoginResponse>(`${this.baseUrl}/login`, request);
  }
}
