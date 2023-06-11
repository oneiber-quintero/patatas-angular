import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SubscribersComponent } from './pages/dashboard/subscribers/subscribers.component';
import { canActivateAuthGuard  } from './guards/can-activate-auth.guard'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'subscribers', component: SubscribersComponent, canActivate: [canActivateAuthGuard] },
  // { path: 'subscribers/create', component: SubscribersComponent, canActivate: [canActivateAuthGuard] },
  {
    path: "**",
    redirectTo: "subscribers",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
