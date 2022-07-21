import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Category from 'src/models/category.model';
import { CategoryService } from 'src/services/category.service';
import { CategoriesComponent } from '../categories.component';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  categoryForm: FormGroup;
  action: string;
  actionString: string;
  hide: boolean = true;
  categoryId: string;
  _loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) {
    this.categoryForm = this.fb.group({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      label: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl<string>('', []),
      textHexColor: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      backgroundHexColor: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
    });
    this.action = data.action;
    if (this.action === 'create') {
      this.actionString = 'Crear';
    } else if (this.action === 'edit') {
      this.actionString = 'Editar';
      this.categoryId = data.category._id;
      const category: Category = {
        name: data.category.name ?? '',
        label: data.category.label ?? '',
        description: data.category.description ?? '',
        textHexColor: data.category.textHexColor ?? 'ffffff',
        backgroundHexColor: data.category.backgroundHexColor ?? '000000',
      };
      this.categoryForm.setValue(category);
    }
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;

    if (this._loading) {
      this.categoryForm.disable();
    } else {
      this.categoryForm.enable();
    }
  }

  ngOnInit(): void {}

  onNoClick = (): void => {
    this.dialogRef.close();
  };

  save = async (): Promise<void> => {
    if (this.categoryForm.valid) {
      try {
        this.loading = true;
        const categoryData: Category = this.categoryForm.value;
        let response: any;
        if (this.action === 'create') {
          response = await this.categoryService.create(categoryData);
        } else if (this.action === 'edit') {
          response = await this.categoryService.update(
            this.categoryId,
            categoryData
          );
        }
        if (response.status === 'ok') {
          this.dialogRef.close();
        } else {
          throw new Error('Error al guardar la categoria');
        }
      } catch (error: any) {
        this._snackBar.open(
          'Ocurrió un error al guardar la categoria',
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
      this.categoryForm.markAllAsTouched();
    }
  };
}
