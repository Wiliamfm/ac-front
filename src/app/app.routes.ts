import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductComponent } from './components/product/product.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/products",
    pathMatch: "full"
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "products",
    component: ProductComponent,
    canActivate: [authGuard]
  },
  {
    path: "**",
    component: NotFoundComponent
  },
];
