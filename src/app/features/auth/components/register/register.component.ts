import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { registerAction } from '../../store/auth.actions';
import { BackEndErrorInterface } from '../../store/auth.interfaces';
import {
  backEndErrorsSelector,
  isSubmitSelector,
} from '../../store/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  backendErrors$!: Observable<BackEndErrorInterface | null>;
  loginValidation: string | null = null;
  passwordValidation: string | null = null;
  $isButtonSubmitting!: Observable<boolean>;
  authForm!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this._createForm();
    this._clearErrorsDesignations();
    this._initializeValues();
  }

  private _createForm(): void {
    this.authForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]{2,30}$')],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,30}$')],
      ],
    });
  }

  private _checkErrors(): boolean {
    if (
      this.authForm.get('username')?.hasError('pattern') ||
      this.authForm.get('username')?.hasError('required')
    ) {
      this.loginValidation = 'Max length should be between 2 and 30 symbols';
    } else {
      this.loginValidation = null;
    }
    if (
      this.authForm.get('password')?.hasError('pattern') ||
      this.authForm.get('password')?.hasError('required')
    ) {
      this.passwordValidation =
        'Password should be 8-30 symbols and contain only letters and/or numbers';
    } else {
      this.passwordValidation = null;
    }
    if (this.passwordValidation || this.loginValidation) {
      return true;
    }
    return false;
  }

  private _clearErrorsDesignations(): void {
    this.authForm?.get('username')?.valueChanges.subscribe(() => {
      this.loginValidation = null;
    });
    this.authForm?.get('password')?.valueChanges.subscribe(() => {
      this.passwordValidation = null;
    });
  }

  private _initializeValues() {
    this.$isButtonSubmitting = this.store.pipe(select(isSubmitSelector));
    this.backendErrors$ = this.store.pipe(select(backEndErrorsSelector));
  }

  onSubmit(): void {
    if (this._checkErrors()) {
      return;
    }
    this.store.dispatch(registerAction({ request: this.authForm.value }));
    this.authForm?.reset();
  }
}
