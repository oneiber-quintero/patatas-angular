import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SubscriberList, Country } from './../../../../../interfaces/subscribers';
import { SubscribersService } from './../../../../../services/dashboard/subscribers/subscribers.service';
import { ParamsRequest, CountryResponse, SubscriberRequest } from './../../../../../interfaces/subscribers';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-susbcribers',
  templateUrl: './create-susbcribers.component.html',
  styleUrls: ['./create-susbcribers.component.css']
})
export class CreateSusbcribersComponent implements OnInit {
  form: FormGroup;
  params: ParamsRequest = {};
  countries: CountryResponse[] = [];

  topics = ['Topico A', 'Topico B', 'Topico C'];

  constructor(
    private fb: FormBuilder,
    private subscribersService: SubscribersService,
    private router: Router,
    private toastr: ToastrService,
    ) {
    this.form = this.fb.group({
      subscribers: this.fb.array([
        this.fb.group({
          Name: ['', Validators.required],
          Email: '',
          CountryCode: '',
          PhoneNumber: '',
          JobTitle: '',
          Area: '',
          Topics: this.fb.array([]),
        }, { validators: this.phoneOrEmailRequired }),
      ]),
    });
  }

  ngOnInit(): void {
    this.getCountry();
  }

  get subscribers() {
    return this.form.get('subscribers') as FormArray;
  }


  addSubscriber() {
    this.subscribers.push(
      this.fb.group({
        Name: ['', Validators.required],
        Email: '',
        CountryCode: '',
        PhoneNumber: '',
        JobTitle: '',
        Area: '',
        Topics: this.fb.array([]),
      }, { validators: this.phoneOrEmailRequired })
    );
  }

  invalidField(field: string, subscriber:AbstractControl) {
    return subscriber.get(field)?.invalid && subscriber.get(field)?.touched
  }

  removeSubscriber(index: number) {
    if(this.subscribers.length > 1 ) {
      this.subscribers.removeAt(index);
    }
  }

  onTopicCheckChange(event: any, subscriberIndex: number) {
    const topics = this.subscribers.at(subscriberIndex).get('Topics') as FormArray;

    if (event.target.checked) {
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

  phoneOrEmailRequired(control: AbstractControl) {
    const countryCode = control.get('CountryCode');
    const phoneNumber = control.get('PhoneNumber');
    const email = control.get('Email');

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

  onSubmit() {

    if(this.form.valid) {
      const subscribers: SubscriberRequest[] =  Object.values(this.form.value.subscribers);
      this.subscribersService
      .createSusbcribers(subscribers)
      .subscribe({

        next: (value) => {
          this.toastr.success(
            'Suscriptores almacenados',
            'Guardado!',
            {
              timeOut: 3000,
            }
          );
          this.router.navigateByUrl('/subscribers');
        },
        error: () => {
          this.toastr.error(
            'Subscriptores no guardados intentelo mas tarde',
            'Error',
            {
              timeOut: 3000,
            }
          );
        },
        complete: () => {

        },
      })
    }
  }

  getCountry() {
    this.subscribersService.getCountry(this.params).subscribe({
      next: (data) => {
        this.countries = data.Data;
      },
      error: (e) => {
        this.countries = [];
      },
      complete: () => {

      },
    });
  }

  back() {
    this.router.navigateByUrl('/subscribers')
  }

}

