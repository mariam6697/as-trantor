import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { ProjectsComponent } from './projects.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import {
  MarkdownModule,
  MarkedOptions,
  ClipboardOptions,
  ClipboardButtonComponent,
} from 'ngx-markdown';
import { MatTableResponsiveModule } from 'src/app/shared/mat-table-responsive/mat-table-responsive.module';
import {
  DeleteImageDialog,
  ExtraImagesComponent,
} from './project-detail/extra-images/extra-images.component';
import { CategoriesComponent } from './categories/categories.component';
import { DeleteCategoryDialogComponent } from './categories/delete-category-dialog/delete-category-dialog.component';
import { CategoryDialogComponent } from './categories/category-dialog/category-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DeleteImageDialog,
    ExtraImagesComponent,
    ProjectsComponent,
    ProjectDialogComponent,
    ProjectDetailComponent,
    CategoriesComponent,
    DeleteCategoryDialogComponent,
    CategoryDialogComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableResponsiveModule,
    MatChipsModule,
    MatCardModule,
    MatSlideToggleModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
      },
      clipboardOptions: {
        provide: ClipboardOptions,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        },
      },
      sanitize: SecurityContext.NONE,
    }),
    NgxMatFileInputModule,
    MatExpansionModule,
    SharedModule,
  ],
})
export class ProjectsModule {}