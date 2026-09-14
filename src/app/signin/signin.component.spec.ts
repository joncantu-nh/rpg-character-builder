import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { SigninComponent } from './signin.component';
import { AuthService } from '../auth.service';

describe('SigninComponent', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninComponent],
      providers: [
        provideRouter([]),
        CookieService,
        AuthService,
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SigninComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should be invalid when username and access code are empty', () => {
    const fixture = TestBed.createComponent(SigninComponent);
    const component = fixture.componentInstance;

    component.signinForm.setValue({
      username: '',
      accessCode: '',
    });

    expect(component.signinForm.invalid).toBeTrue();
  });

  it('should reject a username shorter than three characters', () => {
    const fixture = TestBed.createComponent(SigninComponent);
    const component = fixture.componentInstance;

    component.signinForm.setValue({
      username: 'jo',
      accessCode: 'ABC123',
    });

    expect(
      component.signinForm.controls['username'].hasError('minlength')
    ).toBeTrue();
  });

  it('should reject an access code that is not exactly six alphanumeric characters', () => {
    const fixture = TestBed.createComponent(SigninComponent);
    const component = fixture.componentInstance;

    component.signinForm.setValue({
      username: 'jonathan',
      accessCode: 'ABC12!',
    });

    expect(
      component.signinForm.controls['accessCode'].hasError('pattern')
    ).toBeTrue();
  });

  it('should accept a valid form', () => {
    const fixture = TestBed.createComponent(SigninComponent);
    const component = fixture.componentInstance;

    component.signinForm.setValue({
      username: 'jonathan',
      accessCode: 'ABC123',
    });

    expect(component.signinForm.valid).toBeTrue();
  });

  it('should sign in and navigate to the builder for a valid form', () => {
    const fixture = TestBed.createComponent(SigninComponent);
    const component = fixture.componentInstance;

    const signinSpy = spyOn(authService, 'signin');
    const navigateSpy = spyOn(router, 'navigate');

    component.signinForm.setValue({
      username: 'jonathan',
      accessCode: 'ABC123',
    });

    component.signin();

    expect(signinSpy).toHaveBeenCalledWith('jonathan');
    expect(navigateSpy).toHaveBeenCalledWith(['/builder']);
  });
});
