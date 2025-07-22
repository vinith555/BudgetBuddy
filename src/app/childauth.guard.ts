import { CanActivateChildFn } from '@angular/router';

export const childauthGuard: CanActivateChildFn = (childRoute, state) => {
  console.log("running");
  
  return false;
};
