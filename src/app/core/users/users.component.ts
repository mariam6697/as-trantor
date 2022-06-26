import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  page: number = 1;
  limit: number = 10;
  totalItems: number = 0;
  searchString: string = '';
  loading: boolean = true;
  displayedColumns: string[] = [
    'name',
    'surname',
    'email',
    'role',
    'enabled',
    'actions',
  ];
  loggedInUserId: string = '';

  constructor(
    private userService: UserService,
    private localDataService: LocalDataService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = this.localDataService.readData('user').id;
    this.getUsers(this.page, this.limit);
  }

  updateUsersList = async (event?: PageEvent): Promise<void> => {
    this.page = event!.pageIndex + 1;
    this.limit = event!.pageSize;
    this.getUsers(this.page, this.limit);
    // return event!;
  };

  getUsers = async (
    page: number,
    limit: number,
    search?: string
  ): Promise<void> => {
    try {
      this.loading = true;
      const response: any = await this.userService.getAll(page, limit, search);
      if (response.status === 'ok') {
        this.users = response.data.users;
        this.totalItems = response.data.totalItems;
      }
    } catch (error: any) {
      this.users = [];
      this._snackBar.open(
        'Ocurrió un error al cargar la lista de usuarios',
        'Cerrar',
        {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        }
      );
    } finally {
      this.loading = false;
    }
  };

  openDialog = (action: string, user?: User): void => {
    const dialogRef = this._dialog.open(UserDialogComponent, {
      width: '400px',
      data: {
        action,
        user,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers(this.page, this.limit);
    });
  };

  openDeleteDialog = (user: User): void => {
    const dialogRef = this._dialog.open(DeleteUserDialogComponent, {
      width: '400px',
      data: {
        user,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers(this.page, this.limit);
    });
  };
}
