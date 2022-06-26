import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UsersComponent } from '../users.component';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup;
  action: string;
  actionString: string;
  hide: boolean = true;
  userId: string;
  _loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      role: new FormControl('', [Validators.required]),
    });
    this.action = data.action;
    if (this.action === 'create') {
      this.actionString = 'Crear';
      this.userForm.setControl(
        'password',
        new FormControl('', [Validators.required, Validators.minLength(5)])
      );
    } else if (this.action === 'edit') {
      this.actionString = 'Editar';
      this.userId = data.user._id;
      const user: User = {
        name: data.user.name,
        surname: data.user.surname,
        email: data.user.email,
        role: data.user.role,
        enabled: data.user.enabled,
      };
      this.userForm.setControl(
        'enabled',
        new FormControl('', [Validators.required, Validators.minLength(5)])
      );
      this.userForm.setValue(user);
    }
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;

    if (this._loading) {
      // this.userForm.get('name')?.disable();
      this.userForm.disable();
    } else {
      this.userForm.enable();
    }
  }

  ngOnInit = (): void => {};

  onNoClick = (): void => {
    this.dialogRef.close();
  };

  save = async (): Promise<void> => {
    if (this.userForm.valid) {
      try {
        this.loading = true;
        const userData: User = this.userForm.value;
        let response: any;
        if (this.action === 'create') {
          response = await this.userService.create(userData);
        } else if (this.action === 'edit') {
          response = await this.userService.update(this.userId, userData);
        }
        if (response.status === 'ok') {
          this.dialogRef.close();
        } else {
          throw new Error('Error al guardar usuario');
        }
      } catch (error: any) {
        this._snackBar.open(
          'Ocurrió un error al guardar el usuario',
          'Cerrar',
          {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          }
        );
      } finally {
        this.loading = false;
      }
    }
  };
}
