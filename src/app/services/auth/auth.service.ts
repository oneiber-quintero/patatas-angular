import { Injectable } from '@angular/core';
import { environment } from "./../../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { LoginRequest } from './../../interfaces/login';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiBaseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiBaseUrl =  environment.apiBaseUrl || '';
  }

  login(request: LoginRequest): Observable<any> {
    const apiURL = `${this.apiBaseUrl}/account/login`;
    return this.http.post<any>(apiURL, request);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  removeToken() {
    localStorage.removeItem('token');
  }

}
