import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SubscribersService } from './../../../../../services/dashboard/subscribers/subscribers.service';
import { ParamsRequest, SubscriberResponse, FiltersSubscribers } from './../../../../../interfaces/subscribers';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-subscribers',
  templateUrl: './list-subscribers.component.html',
  styleUrls: ['./list-subscribers.component.css']
})
export class ListSubscribersComponent implements OnInit {

  @Output() detail = new EventEmitter<{action: string, subscriber:SubscriberResponse }>();

  params: ParamsRequest = {};
  subscribers: SubscriberResponse[]  = [];
  page: number = 1;
  count: number = 0;
  limit: number = 10;
  faFilter = faFilter;
  filtersForm: FormGroup;

  constructor(
    private subscribersService: SubscribersService,
    private fb: FormBuilder,
  ) {

    this.filtersForm = this.fb.group({
      criteria: [''],
      sortOrder: [''],
      sortType: ['0']
    });

  }

  ngOnInit() {
    this.getsubscribers();
  }

  trackByMethod(index:number, el:any): number {
    return el.id;
  }

  getsubscribers() {
    this.params = {
      ...this.params,
      count: this.limit,
      page: this.page
    }
    this.subscribersService.getSusbcribers(this.params).subscribe({
      next: (data) => {
        this.subscribers = this.subscribers.concat( data.Data );
        this.count = data.Count;
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

  onScroll() {
    if(this.count > this.limit * this.page){
      this.page++;
      this.getsubscribers();
    }
  }

  applyFilter() {

    const filters: FiltersSubscribers = this.filtersForm.value;
    if(filters.criteria) {
      this.params.criteria = filters.criteria;
    } else {
      delete this.params.criteria;
    }
    if(filters.sortOrder) {
      this.params.sortOrder = filters.sortOrder;
    } else {
      delete this.params.sortOrder;
    }
    if(filters.sortType) {
      this.params.sortType = filters.sortType;
    } else {
      delete this.params.sortType;
    }
    this.subscribers = [];
    this.page = 1;
    this.getsubscribers();
  }

}
