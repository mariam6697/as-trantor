import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../../models/user.model';
import { LocalDataService } from '../../services/local-data.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  user: User = {} as User;
  showFiller: boolean = false;
  menuElements: any[] = [
    {
      label: 'Usuarios',
      icon: 'group',
      path: 'users',
    },
    {
      label: 'Projectos',
      icon: 'rocket_launch',
      path: 'projects',
    },
  ];

  constructor(
    private userService: UserService,
    private localDataService: LocalDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkUser();
  }

  getActivePath = (element: any): string => {
    return `/${element.path}` === this.router.url ? ' active' : '';
  };

  checkUser = async (): Promise<void> => {
    try {
      const userData: any = this.localDataService.readData('user');
      if (userData) {
        const response: any = await this.userService.get(userData.id);
        this.user = response.data;
      } else {
        this.logout();
      }
    } catch (error: any) {
      this.logout();
    }
  };

  logout = (): void => {
    this.localDataService.deleteAll();
    this.router.navigate(['../../auth/login']);
  };
}
