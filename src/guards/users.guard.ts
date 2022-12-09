import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import User from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UsersGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    return this.userService
      .check()
      .then((user: User) => {
        if (user && user.role == 'admin') {
          return true;
        } else {
          this.userService.logout();
          return false;
        }
      })
      .catch((error: any) => {
        this.userService.logout();
        return false;
      });
  }
}
