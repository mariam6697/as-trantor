import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AcceptValidator,
  MaxSizeValidator,
} from '@angular-material-components/file-input';
import Project from 'src/models/project.model';
import { ProjectService } from 'src/services/project.service';
import { ThemePalette } from '@angular/material/core';
import CustomFile from 'src/models/file.model';
import { FileService } from 'src/services/file.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  projectId: string = '';
  project: Project;
  loading: boolean = true;
  projectForm: FormGroup;
  years: (startYear: any) => string[];
  yearOptions: string[] = [];
  _editable: boolean = false;
  mainImage: any;
  extraImages: any[];

  // Main image
  color: ThemePalette = 'primary';
  accept: string = '.jpg';
  mainImageControl: FormControl;

  // Extra image
  extraImageControl: FormControl;

  public files: any;
  maxSize = 500;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private fileService: FileService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    protected sanitizer: DomSanitizer
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

    this.mainImageControl = new FormControl(null, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024),
    ]);

    this.extraImageControl = new FormControl(null, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024),
    ]);
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
    this.activatedRoute.params.subscribe((params) => {
      const projectId = params['projectId'];
      this.projectId = projectId;
      this.getProjectData();
    });
  }

  setMainImage = async (fileData: CustomFile): Promise<void> => {
    this.mainImage = this.fileService.fromBase64ToFile(fileData);
  };

  setExtraImages = async (filesData: CustomFile[]): Promise<void> => {
    const extraImages: CustomFile[] = [];
    for (let i = 0; i < filesData.length; i++) {
      let image = { ...filesData[i] };
      image.safeFile = this.fileService.fromBase64ToFile(image);
      extraImages.push(image);
    }
    this.extraImages = extraImages;
  };

  getProjectData = async (): Promise<void> => {
    try {
      const project: Project = await this.projectService.get(this.projectId);
      this.project = project;
      if (this.project.mainImage) {
        this.setMainImage(this.project.mainImage);
      }
      if (this.project.extraImages && this.project.extraImages.length > 0) {
        this.setExtraImages(this.project.extraImages);
      }
      this.projectForm.setValue({
        name: this.project.name,
        description: this.project.description,
        year: this.project.year,
        semester: this.project.semester,
      });
    } catch (error: any) {
      this.router.navigate([`../projects`]);
      this._snackBar.open(
        'Ocurrió un error al cargar los datos del proyecto',
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

  saveMainImage = async (): Promise<void> => {
    if (this.mainImageControl.valid) {
      try {
        const image: any = this.mainImageControl.value;
        const file: CustomFile = await this.fileService.fromFileToBase64(image);
        const res: any = await this.fileService.addProjectMainImage(
          file,
          this.projectId
        );
        await this.setMainImage(res.data);
        this.mainImageControl.reset();
      } catch (error: any) {
        const message: string = 'Ocurrió un error';
        this._snackBar.open(message, 'Cerrar', {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    } else {
      this.mainImageControl.markAllAsTouched();
    }
  };

  saveExtraImage = async (): Promise<void> => {
    if (this.extraImageControl.valid) {
      try {
        const image: any = this.extraImageControl.value;
        const file: CustomFile = await this.fileService.fromFileToBase64(image);
        await this.fileService.addProjectExtraImage(file, this.projectId);
        await this.getProjectData();
        this.extraImageControl.reset();
      } catch (error: any) {
        const message: string = 'Ocurrió un error';
        this._snackBar.open(message, 'Cerrar', {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    } else {
      this.extraImageControl.markAllAsTouched();
    }
  };
}
