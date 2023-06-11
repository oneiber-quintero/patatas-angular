import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SubscribersService } from './../../../../../services/dashboard/subscribers/subscribers.service';
import { SubscriberResponse } from './../../../../../interfaces/subscribers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscriber-details',
  templateUrl: './subscriber-details.component.html',
  styleUrls: ['./subscriber-details.component.css']
})
export class SubscriberDetailsComponent {

  @Input() subscriber!: SubscriberResponse;

  constructor(
    private router: Router,
    private subscribersService: SubscribersService,
    private toastr: ToastrService,
  ) {

  }

  back() {
    this.router.navigateByUrl('/subscribers')
  }

  removeSubscriber(id: number) {

    this.subscribersService
    .removeSubscriber(id)
    .subscribe({
      next: (data) => {
        this.toastr.success(
          'Suscriptores almacenados',
          'Guardado!',
          {
            timeOut: 3000,
          }
        );
        this.router.navigateByUrl('/subscribers');
      },
      error: (e) => {

      },
      complete: () => {

      }
    })
  }
}
