import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { IdentityService } from './services/identity.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'azure-challenge';

  constructor(
    private readonly _identityService: IdentityService,
    private readonly _router: Router,
  ) { }

  public isAuthenticated(): boolean {
    return this._identityService.isAuthenticated();
  }

  logout() {
    document.cookie.replace("token", "");
    sessionStorage.removeItem("is_authenticated");
    this._router.navigate(["/login"]);
  }
}
