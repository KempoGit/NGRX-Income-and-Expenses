import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  logout() {
    Swal.fire({
      title: 'Loading',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this._AuthService.logout()
    .then(() => {
      Swal.close();
      this._Router.navigate(['/login']);
    });;
  }

}
