import { Injectable } from '@angular/core';
import { environment } from "./../../../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ParamsRequest, SubscriberRequest, SetSubscriberRequest } from './../../../interfaces/subscribers';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  apiBaseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiBaseUrl =  environment.apiBaseUrl || '';
  }


  getSusbcribers(params: ParamsRequest): Observable<any> {
    const p = {
      'params': {
        ...params
      }
    }
    const apiURL = `${this.apiBaseUrl}/subscribers`;
    return this.http.get<any>(apiURL, p);
  }

  getCountry(params: ParamsRequest) {
    const p = {
      'params': {
        ...params
      }
    }
    const apiURL = `${this.apiBaseUrl}/countries`;
    return this.http.get<any>(apiURL, p);
  }

  createSusbcribers(subscribers: SubscriberRequest[]): Observable<any> {
    const p = {
      'Subscribers': subscribers
    }
    const apiURL = `${this.apiBaseUrl}/subscribers`;
    return this.http.post<any>(apiURL, p);
  }

  removeSubscriber(id: number) {
    const apiURL = `${this.apiBaseUrl}/subscribers/${id}`;
    return this.http.delete<any>(apiURL);
  }

  setSubscriber(subscriber: SetSubscriberRequest) {
    const apiURL = `${this.apiBaseUrl}/subscribers/${subscriber.Id}`;
    return this.http.put<any>(apiURL, subscriber);
  }
  
}
