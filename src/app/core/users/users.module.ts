import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UsersComponent } from './users.component';
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
import { MatTableResponsiveModule } from 'src/app/shared/mat-table-responsive/mat-table-responsive.module';

@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent,
    DeleteUserDialogComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    MatExpansionModule,
  ],
})
export class UsersModule {}
