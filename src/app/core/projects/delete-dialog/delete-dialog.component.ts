import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Project from 'src/models/project.model';
import User from 'src/models/user.model';
import { ProjectService } from 'src/services/project.service';
import { UserService } from 'src/services/user.service';
import { UsersComponent } from '../../users/users.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  _loading: boolean = false;
  user: User;
  project: Project;

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar
  ) {
    this.project = data.project;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  ngOnInit(): void {}

  onNoClick = (): void => {
    this.dialogRef.close();
  };

  delete = async (): Promise<void> => {
    try {
      this.loading = true;
      await this.projectService.remove(this.project._id!);
      this.dialogRef.close();
    } catch (error: any) {
      console.log('error', error);
      this._snackBar.open(
        'Ocurrió un error al eliminar el proyecto',
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
}
