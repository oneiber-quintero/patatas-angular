import { Component } from '@angular/core';
import { AuthService } from './../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  items = [
    { id: 1, name: 'Suscriptores', url: '/subscribers' },
    { id: 2, name: 'Suscriptores', url: '/subscribers' },
    { id: 3, name: 'Suscriptores', url: '/subscribers' },

  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }

  openMenu() {
    const menu = document.querySelector('#menu');
    menu!.classList.toggle('open');
  }

  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/login')
  }

}
