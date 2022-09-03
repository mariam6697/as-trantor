import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import CustomFile from 'src/models/file.model';
import Project from 'src/models/project.model';
import { FileService } from 'src/services/file.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  @Input() projectData: Project;
  @Input() loading: boolean;
  @Input() reloadProjectData: () => Promise<void>;
  project: Project;
  mainImage: any;
  extraImages: any[];

  // Main image
  color: ThemePalette = 'primary';
  accept: string = '.jpg';
  mainImageControl: FormControl;

  // Extra image
  extraImageControl: FormControl;

  // public files: any;
  maxSize: number = 500;

  constructor(
    private fileService: FileService,
    private _snackBar: MatSnackBar
  ) {
    this.mainImageControl = new FormControl(null, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024),
    ]);

    this.extraImageControl = new FormControl(null, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024),
    ]);
  }

  ngOnInit(): void {
    this.setImagesData(this.projectData);
  }

  setImagesData = (project: Project): void => {
    this.project = { ...project };
    if (this.project.mainImage) {
      this.setMainImage(this.project.mainImage);
    }
    if (this.project.extraImages) {
      this.setExtraImages(this.project.extraImages);
    }
  };

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

  saveMainImage = async (): Promise<void> => {
    if (this.mainImageControl.valid) {
      try {
        const image: any = this.mainImageControl.value;
        const file: CustomFile = await this.fileService.fromFileToBase64(image);
        const res: any = await this.fileService.addProjectMainImage(
          file,
          this.project._id!
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
        await this.fileService.addProjectExtraImage(file, this.project._id!);
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

  getProjectData = async (): Promise<void> => {
    await this.reloadProjectData();
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes.projectData) {
      this.setImagesData(this.projectData);
    }
  }
}
