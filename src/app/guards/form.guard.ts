import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupComponent } from '../signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanDeactivate<SignupComponent> {

  canDeactivate(
    component: SignupComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (component.signUpInfo.dirty) {
        if (confirm('Are you sure?')) {
          return true;
        } else {
          return false;
        }
      }
    return true;
  }
  
}
