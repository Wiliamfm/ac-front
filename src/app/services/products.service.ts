import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/products.models';
import { Observable } from 'rxjs';
import { IdentityService } from './identity.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //private readonly baseUrl = "http://localhost:5246/products";
  private readonly baseUrl = "https://ac-back-eeh5h6e2d7cnhvd5.eastus-01.azurewebsites.net/products";

  constructor(
    private readonly _httpClient: HttpClient,
  ) { }

  public getList(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this.baseUrl}`,);
  }
}
