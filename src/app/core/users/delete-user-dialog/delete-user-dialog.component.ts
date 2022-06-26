import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UsersComponent } from '../users.component';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss'],
})
export class DeleteUserDialogComponent implements OnInit {
  _loading: boolean = false;
  user: User;

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.user = data.user;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  ngOnInit = (): void => {};

  onNoClick = (): void => {
    this.dialogRef.close();
  };

  delete = async (): Promise<void> => {
    try {
      this.loading = true;
      const response: any = await this.userService.delete(this.user._id!);
      if (response.status === 'ok') {
        this.dialogRef.close();
      } else {
        throw new Error('Error al eliminar usuario');
      }
    } catch (error: any) {
      this._snackBar.open('Ocurrió un error al eliminar el usuario', 'Cerrar', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    } finally {
      this.loading = false;
    }
  };
}
