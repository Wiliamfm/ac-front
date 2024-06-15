import { Route } from "@angular/router";
import { ProductComponent } from "./product.component";

export const PRODUCT_ROUTES: Route[] = [
  {
    path: "",
    component: ProductComponent
  },
  {
    path: ":id",
    loadComponent: () => import("./product-details/product-details.component").then(m => m.ProductDetailsComponent)
  }
]