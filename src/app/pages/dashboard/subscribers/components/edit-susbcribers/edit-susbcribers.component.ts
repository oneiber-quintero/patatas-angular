import { Component, EventEmitter, Output, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriberResponse, CountryResponse, SubscriberRequest, ParamsRequest, SetSubscriberRequest } from 'src/app/interfaces/subscribers';
import { SubscribersService } from './../../../../../services/dashboard/subscribers/subscribers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-susbcribers',
  templateUrl: './edit-susbcribers.component.html',
  styleUrls: ['./edit-susbcribers.component.css']
})
export class EditSusbcribersComponent implements OnChanges, OnInit {

  @Output() detail = new EventEmitter<{action: string, subscriber:SubscriberResponse }>();
  @Input() subscriber!: SubscriberResponse;

  editForm: FormGroup;
  countries: CountryResponse[] = [];
  params: ParamsRequest = {};
  loadingCountry: boolean = false;
  loadingUpdated: boolean = false;
  id!: number;

  topics = [
    { value: 'Topic 1', checked: false},
    { value: 'Topic 2', checked: true},
    { value: 'Topic 3', checked: false}
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private subscribersService: SubscribersService,
    private toastr: ToastrService,
  ) {
    this.editForm = this.fb.group({
      Name: ['', Validators.required],
      Email: [''],
      CountryCode: [''],
      PhoneNumber: [''],
      JobTitle: [''],
      Area: [''],
      Topics: this.fb.array([]),
    }, { validators: this.emailOrPhoneRequired });
  }
  ngOnInit(): void {
    this.getCountry();
  }

  back() {
    this.detail.emit({action: 'detail', subscriber: this.subscriber})
  }

  updateValues(subscriber: SubscriberResponse ) {
    this.id = subscriber.Id;
    this.editForm.get('Name')?.setValue(subscriber.Name);
    this.editForm.get('Email')?.setValue(subscriber.Email);
    this.editForm.get('CountryCode')?.setValue(subscriber.CountryCode);
    this.editForm.get('PhoneNumber')?.setValue(subscriber.PhoneNumber);
    this.editForm.get('JobTitle')?.setValue(subscriber.JobTitle);
    this.editForm.get('Area')?.setValue(subscriber.Area);
    const topi = this.editForm.get('Topics') as FormArray;

    for (const topic of this.topics) {
      if( subscriber.Topics.includes(topic.value) ) {
        topic.checked = true;
        topi.push(this.fb.control(topic.value));
      }
    }
    this.editForm.updateValueAndValidity();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['subscriber']) {
      this.updateValues(changes['subscriber'].currentValue);
    }
  }

  onSubmit() {

    if(this.editForm.valid) {
      const subscriber: SetSubscriberRequest =  { Id: this.id, ...this.editForm.value };
      this.subscribersService
      .setSubscriber(subscriber)
      .subscribe({

        next: (value) => {
          this.toastr.success(
            'Suscriptor actualizado',
            'Guardado!',
            {
              timeOut: 3000,
            }
          );

        },
        error: () => {
          this.toastr.error(
            'Subscriptor no se pudo actualizar, intentelo mas tarde',
            'Error',
            {
              timeOut: 3000,
            }
          );
        },
        complete: () => {
          this.router.navigateByUrl('/subscribers');
        },
      })
    }
  }

  emailOrPhoneRequired(formGroup: FormGroup) {
    const countryCode = formGroup.get('CountryCode');
    const phoneNumber = formGroup.get('PhoneNumber');
    const email = formGroup.get('Email');

    if (!phoneNumber || !countryCode || !email) {
      return null;
    }

    if (!email.value && (!phoneNumber.value && !countryCode.value)) {
      return { phoneOrEmailRequired: true, field: 'Email' };
    } else if (!phoneNumber.value && !email.value ) {
      return { phoneOrEmailRequired: true, field: 'PhoneNumber' };
    } else if ( !countryCode.value && !email.value ) {
      return { phoneOrEmailRequired: true, field: 'CountryCode' };
    }

    return null;
  }

  get topicsArray() {
    return this.editForm.get('Topics') as FormArray;
  }

  getCountry() {
    this.loadingCountry = true;
    this.subscribersService
    .getCountry(this.params)
    .subscribe({
      next: (data) => {
        this.countries = data.Data;
        this.loadingCountry = false;
      },
      error: (e) => {
        this.countries = [];
        this.loadingCountry = false;
      },
      complete: () => {
        this.loadingCountry = false;
      },
    });
  }

  onTopicCheckChange(event: any) {
    const topics = this.editForm.get('Topics') as FormArray;

    if ( event.target.checked ) {
      topics.push(this.fb.control(event.target.value));
    } else {
      let i = 0;
      topics.controls.forEach((item) => {
        if (item.value == event.target.value) {
          topics.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
