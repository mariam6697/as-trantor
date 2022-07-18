import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  ClipboardButtonComponent,
  ClipboardOptions,
  MarkdownModule,
  MarkedOptions,
} from 'ngx-markdown';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatExpansionModule } from '@angular/material/expansion';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';
import { MatTableResponsiveModule } from '../shared/mat-table-responsive/mat-table-responsive.module';
import { DeleteUserDialogComponent } from './users/delete-user-dialog/delete-user-dialog.component';
import { ProjectDialogComponent } from './projects/project-dialog/project-dialog.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import {
  DeleteImageDialog,
  ExtraImagesComponent,
} from './projects/project-detail/extra-images/extra-images.component';

@NgModule({
  declarations: [
    CoreComponent,
    UsersComponent,
    ProjectsComponent,
    UserDialogComponent,
    DeleteUserDialogComponent,
    ProjectDialogComponent,
    ProjectDetailComponent,
    ExtraImagesComponent,
    DeleteImageDialog,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
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
  ],
  exports: [MatTableResponsiveModule],
})
export class CoreModule {}
