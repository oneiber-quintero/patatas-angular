import { Component } from '@angular/core';

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

  openMenu() {
    const menu = document.querySelector('#menu');
    menu!.classList.toggle('open');
  }

}
