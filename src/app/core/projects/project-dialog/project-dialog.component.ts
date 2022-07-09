import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Project from 'src/models/project.model';
import { ProjectService } from 'src/services/project.service';
import { UsersComponent } from '../../users/users.component';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss'],
})
export class ProjectDialogComponent implements OnInit {
  projectForm: UntypedFormGroup;
  action: string;
  actionString: string;
  hide: boolean = true;
  userId: string;
  _loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar
  ) {
    this.projectForm = this.fb.group({
      name: new UntypedFormControl('', [Validators.required, Validators.minLength(5)]),
      description: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      year: new UntypedFormControl(1960, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      semester: new UntypedFormControl('', [Validators.required]),
    });
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;

    if (this._loading) {
      this.projectForm.disable();
    } else {
      this.projectForm.enable();
    }
  }

  ngOnInit = (): void => {};

  onNoClick = (): void => {
    this.dialogRef.close();
  };

  save = async (): Promise<void> => {
    if (this.projectForm.valid) {
      try {
        this.loading = true;
        const projectData: Project = this.projectForm.value;
        let response: any = await this.projectService.create(projectData);
        if (response.status === 'ok') {
          this.dialogRef.close();
        } else {
          throw new Error('Error al crear proyecto');
        }
      } catch (error: any) {
        this._snackBar.open('Ocurrió un error al crear el proyecto', 'Cerrar', {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      } finally {
        this.loading = false;
      }
    }
  };
}
