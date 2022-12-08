import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { ProjectsComponent } from './projects.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MainDetailsComponent } from './project-detail/main-details/main-details.component';
import { ImagesComponent } from './project-detail/images/images.component';
import { ProjectCategoriesComponent } from './project-detail/project-categories/project-categories.component';
import { SourceCodeComponent } from './project-detail/source-code/source-code.component';
import { RepoComponent } from './project-detail/source-code/repo/repo.component';
import { DeleteRepoDialogComponent } from './project-detail/source-code/delete-repo-dialog/delete-repo-dialog.component';
import { UpdatesComponent } from './updates/updates.component';
import { UpdateDialogComponent } from './updates/update-dialog/update-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { EditDialogComponent } from './updates/edit-dialog/edit-dialog.component';

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
    MainDetailsComponent,
    ImagesComponent,
    ProjectCategoriesComponent,
    SourceCodeComponent,
    RepoComponent,
    DeleteRepoDialogComponent,
    UpdatesComponent,
    UpdateDialogComponent,
    EditDialogComponent,
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
    MatAutocompleteModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSlideToggleModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
  ],
})
export class ProjectsModule {}
