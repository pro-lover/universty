import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ClickTrackingModule } from '@core/directives/click-tracking/click-tracking.module';


@NgModule({
  declarations: [SidenavComponent],
  imports: [
    BrowserModule,
	CommonModule,
  RouterModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatBadgeModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    ClickTrackingModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [SidenavComponent],
})
export class SideNavModule {}
