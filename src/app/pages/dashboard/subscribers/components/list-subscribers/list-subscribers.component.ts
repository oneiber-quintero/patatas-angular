import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SubscribersService } from './../../../../../services/dashboard/subscribers/subscribers.service';
import { ParamsRequest, SubscriberResponse } from './../../../../../interfaces/subscribers';

@Component({
  selector: 'app-list-subscribers',
  templateUrl: './list-subscribers.component.html',
  styleUrls: ['./list-subscribers.component.css']
})
export class ListSubscribersComponent implements OnInit {

  @Output() detail = new EventEmitter<{action: string, subscriber:SubscriberResponse }>();

  params: ParamsRequest = {};
  subscribers: SubscriberResponse[]  = [];

  constructor(
    private subscribersService: SubscribersService
  ) {}

  ngOnInit() {
    this.getsubscribers();
  }

  trackByMethod(index:number, el:any): number {
    return el.id;
  }

  getsubscribers() {
    this.subscribersService.getSusbcribers(this.params).subscribe({
      next: (data) => {
        this.subscribers = data.Data;
      },
      error: (e) => {
        this.subscribers = [];
      },
      complete: () => {

      },
    });
  }

  getDetail(subscriber: SubscriberResponse) {
    this.detail.emit({
      action: 'detail',
      subscriber: subscriber
    });
  }
}
