import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  isAuthenticated(): boolean {
    return !!this.cookieService.get('session_user');
  }

  signin(username: string): void {
    this.cookieService.set('session_user', username, {
      expires: 1,
    });
  }

  signout(): void {
    this.cookieService.delete('session_user');
  }
}
