import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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
  projectForm: FormGroup;
  userId: string;
  _loading: boolean = false;
  years: (startYear: any) => string[];
  yearOptions: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar
  ) {
    this.projectForm = this.fb.group({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      year: new FormControl<string>('2020', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      semester: new FormControl<number>(1, [Validators.required]),
    });

    this.years = (startYear: number) => {
      let currentYear: number = new Date().getFullYear();
      let years: string[] = [];
      startYear = startYear || 1980;
      while (startYear <= currentYear) {
        let year: number = startYear++;
        years.push(year.toString());
      }
      return years;
    };
    
    this.yearOptions = this.years(2000);
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

  ngOnInit(): void  {};

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
    } else {
      this.projectForm.markAllAsTouched();
    }
  };
}
