import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import Category from 'src/models/category.model';
import { LocalDataService } from 'src/services/local-data.service';
import { CategoryService } from 'src/services/category.service';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { DeleteCategoryDialogComponent } from './delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  page: number = 1;
  limit: number = 10;
  totalItems: number = 0;
  loading: boolean = true;
  displayedColumns: string[] = [
    'name',
    'label',
    'description',
    'textHexColor',
    'backgroundHexColor',
    'actions',
  ];

  constructor(
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCategories(this.page, this.limit);
  }

  updateCategoriesList = async (event?: PageEvent): Promise<void> => {
    this.page = event!.pageIndex + 1;
    this.limit = event!.pageSize;
    this.getCategories(this.page, this.limit);
  };

  getCategories = async (page: number, limit: number): Promise<void> => {
    try {
      this.loading = true;
      const response: any = await this.categoryService.getAll(page, limit);
      if (response.status === 'ok') {
        this.categories = response.data.categories;
        this.totalItems = response.data.totalItems;
      }
    } catch (error: any) {
      this.categories = [];
      this._snackBar.open(
        'Ocurrió un error al cargar la lista de categorias',
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

  openDialog = (action: string, category?: Category): void => {
    const dialogRef = this._dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: {
        action,
        category,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getCategories(this.page, this.limit);
    });
  };

  openDeleteDialog = (category: Category): void => {
    const dialogRef = this._dialog.open(DeleteCategoryDialogComponent, {
      width: '400px',
      data: {
        category,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getCategories(this.page, this.limit);
    });
  };
}
