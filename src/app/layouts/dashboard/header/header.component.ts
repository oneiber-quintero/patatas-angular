import { Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class DashboardHeaderComponent {

  faBars = faBars;

  openMenu() {
    const menu = document.querySelector('#menu');
    menu!.classList.toggle('open');
  }
}

