import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Project from 'src/models/project.model';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-main-details',
  templateUrl: './main-details.component.html',
  styleUrls: ['./main-details.component.scss'],
})
export class MainDetailsComponent implements OnInit {
  @Input() projectData: Project;
  @Input() loading: boolean;
  project: Project;
  _editable: boolean = false;
  projectForm: FormGroup;
  years: (startYear: any) => string[];
  yearOptions: string[] = [];

  constructor(
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
      shortDescription: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40),
      ]),
      visible: new FormControl<boolean>(false),
      highlighted: new FormControl<boolean>(false),
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

  get editable(): boolean {
    if (this._editable) {
      this.projectForm.enable();
    } else {
      this.projectForm.disable();
    }
    return this._editable;
  }

  set editable(value: boolean) {
    this._editable = value;

    if (this._editable) {
      this.projectForm.enable();
    } else {
      this.projectForm.disable();
    }
  }

  ngOnInit(): void {
    this.setProjectData(this.projectData);
  }

  setProjectData = (project: Project): void => {
    this.project = { ...project };
    this.projectForm.setValue({
      name: this.project.name,
      description: this.project.description ?? '',
      shortDescription: this.project.shortDescription ?? '',
      visible: this.project.visible ?? false,
      highlighted: this.project.highlighted ?? false,
      year: this.project.year,
      semester: this.project.semester,
    });
  };

  save = async (): Promise<void> => {
    if (this.projectForm.valid) {
      try {
        this.editable = false;
        const projectData: Project = this.projectForm.value;
        let response: any = await this.projectService.update(
          this.project._id!,
          projectData
        );
        if (response.status === 'ok') {
          // set project data
        } else {
          throw new Error('Error al crear proyecto');
        }
      } catch (error: any) {
        const message: string =
          error.response.data.message ?? 'Ocurrió un error';
        this._snackBar.open(message, 'Cerrar', {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      } finally {
        this.editable = true;
      }
    } else {
      this.projectForm.markAllAsTouched();
    }
  };
}
