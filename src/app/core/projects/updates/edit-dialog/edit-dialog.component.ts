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
  editForm: FormGroup;
  _loading: boolean = false;
  update: ProjectUpdate = {} as ProjectUpdate;

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private updatesService: UpdatesService,
    private _snackBar: MatSnackBar
  ) {
    let date: Date = new Date(data.update.date);
    this.update = data.update;
    this.editForm = this.fb.group({
      title: new FormControl<string>(this.update.title, [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl<string>(this.update.description, [
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
      this.editForm.disable();
    } else {
      this.editForm.enable();
    }
  }

  ngOnInit(): void {}

  onClose = (): void => {
    this.dialogRef.close();
  };

  updateRecord = async (): Promise<void> => {
    if (this.editForm.valid) {
      try {
        this.loading = true;
        const updatedRecord: ProjectUpdate = {
          ...this.editForm.value,
        };
        await this.updatesService.update(this.update._id!, updatedRecord);
        this.onClose();
      } catch (error: any) {
        this._snackBar.open(
          'Ocurrió un error al actualizar el registro',
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
      this.editForm.markAllAsTouched();
    }
  };

  onDelete = async (): Promise<void> => {
    if (this.editForm.valid) {
      try {
        this.loading = true;
        await this.updatesService.remove(this.data.update._id);
        this.onClose();
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
      this.editForm.markAllAsTouched();
    }
  };
}
