import { CanActivateFn, Router } from '@angular/router';

export const canActivateAuthGuard: CanActivateFn = (route, state) => {
  const router: Router = new Router();
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  if(isAuthenticated) {
  } else {
    router.navigateByUrl('/login');
  }
  return isAuthenticated;

};
