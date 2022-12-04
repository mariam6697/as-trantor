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
      children: [],
    },
    {
      label: 'Projectos',
      icon: 'rocket_launch',
      path: 'projects',
      children: [
        { label: 'Categorías', icon: 'category', path: 'projects/categories' },
      ],
    },
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private localDataService: LocalDataService
  ) {}

  ngOnInit(): void {
    this.checkUser();
  }

  isActivePath = (path: any): boolean => {
    return this.router.url.includes(path) ? true : false;
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
    this.userService.logout();
  };

  goToRepo = (): void => {
    window.open(
      'https://github.com/mariam6697/as-trantor',
      '_blank',
      'noopener,noreferrer'
    );
  };
}
