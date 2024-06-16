import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products.models';
import { ProductsService } from '../../services/products.service';
import { RouterLink } from '@angular/router';
import { IdentityService } from '../../services/identity.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private readonly _productsService: ProductsService,
    private readonly _identityService: IdentityService,
  ) { }

  ngOnInit(): void {
    this._productsService.getList().subscribe({
      next: response => {
        this.products = response;
      },
      error: error => {
        console.error("Unable to get products:\n", error);
      }
    });
  }

  public isAdmin(): boolean {
    return this._identityService.getRoles().includes("admin");
  }
}
