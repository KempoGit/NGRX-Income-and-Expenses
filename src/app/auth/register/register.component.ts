import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy{

  registerForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _Store: Store<AppState>
    ) {

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.uiSubscription = this._Store.select('ui').subscribe(( ui ) => {
      this.loading = ui.isLoading;
    })
  }

  async createUser() {
    if (this.registerForm.invalid) { return; }
    const { name, password, email } = this.registerForm.value;

    this._Store.dispatch( ui.isLoading() );
    // Swal.fire({
    //   title: 'Loading',
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });

    this._AuthService.createUser(name, email, password)
    .then( credential => {
      console.log(credential);
      this._Store.dispatch( ui.stopLoading() );
      // Swal.close();
      this._Router.navigate(['/']);
    })
    .catch(err => {
      this._Store.dispatch( ui.stopLoading() );
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
