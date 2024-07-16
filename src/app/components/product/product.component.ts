import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../models/products.models';
import { ProductsService } from '../../services/products.service';
import { RouterLink } from '@angular/router';
import { IdentityService } from '../../services/identity.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  @ViewChild("btnOpenModal") btnOpenModal!: ElementRef;

  products: Product[] = [];
  createProductForm = this._fb.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    price: ["", Validators.required],
    stock: ["", Validators.required],
  });

  constructor(
    private readonly _productsService: ProductsService,
    private readonly _identityService: IdentityService,
    private readonly _fb: FormBuilder
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

  public openProductModal(): void {
    this.btnOpenModal.nativeElement.click();
  }
}
