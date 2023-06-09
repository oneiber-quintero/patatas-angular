import { Component } from '@angular/core';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent {
  subscribers = [
    { id: 1, name: 'Juan', area: 'Marketing', country: 'México', status: 'Activo', phone: '123456789' },
    { id: 2, name: 'María', area: 'Ventas', country: 'Colombia', status: 'Inactivo', phone: '987654321' },
    { id: 3, name: 'Pedro', area: 'Desarrollo', country: 'Argentina', status: 'Activo', phone: '456789123' },
  ];

  trackByMethod(index:number, el:any): number {
    return el.id;
  }
}
