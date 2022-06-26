import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableResponsiveDirective } from './mat-table-responsive.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [MatTableResponsiveDirective],
  exports: [MatTableResponsiveDirective],
})
export class MatTableResponsiveModule {}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
