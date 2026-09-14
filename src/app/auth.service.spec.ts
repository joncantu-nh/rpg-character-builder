import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    cookieServiceSpy = jasmine.createSpyObj<CookieService>('CookieService', [
      'get',
      'set',
      'delete',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: CookieService,
          useValue: cookieServiceSpy,
        },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should report unauthenticated when no session cookie exists', () => {
    cookieServiceSpy.get.and.returnValue('');

    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should report authenticated when a session cookie exists', () => {
    cookieServiceSpy.get.and.returnValue('jonathan');

    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should set the session cookie when signing in', () => {
    service.signin('jonathan');

    expect(cookieServiceSpy.set).toHaveBeenCalledWith('session_user', 'jonathan', {
      expires: 1,
    });
  });

  it('should delete the session cookie when signing out', () => {
    service.signout();

    expect(cookieServiceSpy.delete).toHaveBeenCalledWith('session_user');
  });
});
