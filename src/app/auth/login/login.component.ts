import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _AuthService: AuthService, private _Router: Router) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.invalid) { return; }
    let {email, password} = this.loginForm.value;

    Swal.fire({
      title: 'Loading',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    
    this._AuthService.loginUser(email, password)
    .then(credential => {
      console.log(credential);
      Swal.close();
      this._Router.navigate(['/']);
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    });
  }

}
