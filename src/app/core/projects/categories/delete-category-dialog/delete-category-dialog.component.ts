import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Category from 'src/models/category.model';
import { CategoryService } from 'src/services/category.service';
import { CategoriesComponent } from '../categories.component';

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.scss'],
})
export class DeleteCategoryDialogComponent implements OnInit {
  _loading: boolean = false;
  category: Category;

  constructor(
    public dialogRef: MatDialogRef<CategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) {
    this.category = data.category;
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
      await this.categoryService.remove(this.category._id!);
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
