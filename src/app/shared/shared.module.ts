import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableResponsiveModule } from './mat-table-responsive/mat-table-responsive.module';
import { DisplayColorComponent } from './display-color/display-color.component';

@NgModule({
  declarations: [DisplayColorComponent],
  imports: [CommonModule],
  exports: [MatTableResponsiveModule, DisplayColorComponent],
})
export class SharedModule {}
