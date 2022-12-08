import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersComponent } from 'src/app/core/users/users.component';
import { ProjectUpdate } from 'src/models/project.model';
import { UpdatesService } from 'src/services/updates.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  updateForm: FormGroup;
  _loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private updatesService: UpdatesService,
    private _snackBar: MatSnackBar
  ) {
    let date: Date = new Date(data.update.date);
    this.updateForm = this.fb.group({
      title: new FormControl<string>(data.update.title, [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl<string>(data.update.description, [
        Validators.required,
        Validators.minLength(5),
      ]),
      date: new FormControl<Date>(date, [Validators.required]),
    });
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;

    if (this._loading) {
      this.updateForm.disable();
    } else {
      this.updateForm.enable();
    }
  }

  ngOnInit(): void {}

  onNoClick = (): void => {
    this.dialogRef.close();
  };

  save = async (): Promise<void> => {
    if (this.updateForm.valid) {
      try {
        this.loading = true;
        const updateData: ProjectUpdate = {
          ...this.updateForm.value,
        };
        await this.updatesService.update(this.data.update._id, updateData);
        this.dialogRef.close();
      } catch (error: any) {
        this._snackBar.open('Ocurrió un error al crear el registro', 'Cerrar', {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      } finally {
        this.loading = false;
      }
    } else {
      this.updateForm.markAllAsTouched();
    }
  };

  onDelete = async (): Promise<void> => {
    if (this.updateForm.valid) {
      try {
        this.loading = true;
        await this.updatesService.remove(this.data.update._id);
        this.dialogRef.close();
      } catch (error: any) {
        this._snackBar.open(
          'Ocurrió un error al eliminar el registro',
          'Cerrar',
          {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          }
        );
      } finally {
        this.loading = false;
      }
    } else {
      this.updateForm.markAllAsTouched();
    }
  };
}
