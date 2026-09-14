import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
  provideRouter,
} from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj<AuthService>(
      'AuthService',
      ['isAuthenticated']
    );

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    });

    router = TestBed.inject(Router);
  });

  it('should allow navigation when authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/builder' } as RouterStateSnapshot
      )
    );

    expect(result).toBeTrue();
  });

  it('should return a UrlTree to signin when unauthenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/builder' } as RouterStateSnapshot
      )
    );

    expect(result instanceof UrlTree).toBeTrue();

    const tree = result as UrlTree;

    expect(tree.queryParams['returnUrl']).toBe('/builder');
    expect(router.serializeUrl(tree)).toContain('/signin');
  });
});
