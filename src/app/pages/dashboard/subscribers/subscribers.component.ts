import { Component, OnInit } from '@angular/core';
import { SubscriberResponse } from './../../../interfaces/subscribers';


@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit{

  action: string = 'list';
  subscriberSelected!: SubscriberResponse;

  constructor() {

  }

  ngOnInit(): void {
  }

  trackByMethod(index:number, el:any): number {
    return el.id;
  }

  onCreateSubscribers() {
    this.action = 'create';
  }

  detail(event: {action: string, subscriber:SubscriberResponse }) {
    this.action = event.action,
    this.subscriberSelected = event.subscriber;
  }

  editSubscriber(event: {action: string, subscriber:SubscriberResponse }) {
    this.action = event.action,
    this.subscriberSelected = event.subscriber;
  }

}
