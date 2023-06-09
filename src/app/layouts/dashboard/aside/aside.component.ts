import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {

  openMenu() {
    const menu = document.querySelector('#menu');
    menu!.classList.toggle('open');
  }

}