import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return sessionStorage.getItem("is_authenticated") === "true";
};
