import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SubscribersService } from './../../../../../services/dashboard/subscribers/subscribers.service';
import { SubscriberResponse } from './../../../../../interfaces/subscribers';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscriber-details',
  templateUrl: './subscriber-details.component.html',
  styleUrls: ['./subscriber-details.component.css']
})
export class SubscriberDetailsComponent {

  @Input() subscriber!: SubscriberResponse;
  @Output() detail = new EventEmitter<{action: string, subscriber: SubscriberResponse}>();

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


    Swal.fire({
      title: 'Deseas eliminar el subcriptor?',
      text: "Se eliminará de forma permanente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Su Información fue Eliminada.',
          'success'
        )
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
    })



  }

  edit() {
    this.detail.emit({action: 'edit', subscriber: this.subscriber})
  }

}
