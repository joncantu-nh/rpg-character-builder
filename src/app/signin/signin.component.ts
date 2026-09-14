import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form
      data-testid="signin-form"
      [formGroup]="signinForm"
      (ngSubmit)="signin()"
      class="w4-panel w4-form"
    >
      <div class="w4-field">
        <label for="username">Username</label>
        <input
          data-testid="username"
          id="username"
          type="text"
          formControlName="username"
          autocomplete="username"
        />

        @if (
          signinForm.controls['username'].touched &&
          signinForm.controls['username'].hasError('required')
        ) {
          <small data-testid="username-error" class="w4-error"> Username is required. </small>
        }

        @if (
          signinForm.controls['username'].touched &&
          signinForm.controls['username'].hasError('minlength')
        ) {
          <small data-testid="username-error" class="w4-error">
            Username must contain at least 3 characters.
          </small>
        }
      </div>

      <div class="w4-field">
        <label for="accessCode">Six-character access code</label>
        <input
          data-testid="access-code"
          id="accessCode"
          type="text"
          formControlName="accessCode"
          autocomplete="off"
        />

        @if (
          signinForm.controls['accessCode'].touched &&
          signinForm.controls['accessCode'].hasError('required')
        ) {
          <small data-testid="access-code-error" class="w4-error"> Access code is required. </small>
        }

        @if (
          signinForm.controls['accessCode'].touched &&
          signinForm.controls['accessCode'].hasError('pattern')
        ) {
          <small data-testid="access-code-error" class="w4-error">
            Use exactly 6 letters or numbers.
          </small>
        }
      </div>

      <input
        data-testid="signin-submit"
        class="w4-btn w4-btn-primary w4-btn-block"
        type="submit"
        value="Sign In"
        [disabled]="signinForm.invalid"
      />
      <p class="w4-text-muted">You will return to the page you originally requested.</p>
    </form>
  `,
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.signinForm = this.formBuilder.nonNullable.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      accessCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{6}$/)]],
    });
  }

  signin(): void {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    const username = this.signinForm.controls['username'].value;

    this.authService.signin(username);

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/builder';

    this.router.navigate([returnUrl]);
  }
}
