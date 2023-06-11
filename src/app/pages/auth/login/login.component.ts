import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { LoginRequest } from './../../../interfaces/login';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoading: boolean = false;

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {

    if(this.loginForm.valid) {
      this.isLoading = true;
      let request: LoginRequest = {
        UserName: this.f.userName.value || '',
        Password: this.f.password.value || '',
      }
      this.authService
      .login(request)
      .subscribe({
        next: (data) => {
          this.authService.setToken(data.Token);
        },
        error: (e) => {
          this.isLoading = false;
          this.toastr.error(
            'Usuario o contraseña invalida',
            'Error',
            {
              timeOut: 3000,
            }
          );
        },
        complete: () => {
          this.isLoading = true;
          this.router.navigateByUrl('/subscribers');
          this.toastr.success(
            'login exitoso',
            'Bienvenido!',
            {
              timeOut: 3000,
            }
          );


        }
      });
    }
  }


}
