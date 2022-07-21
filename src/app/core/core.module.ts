import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';

@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
  ],
  exports: [],
})
export class CoreModule {}
