import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { SideNavModule } from '../sidenav/sidenav.module';
import { SideNavRightModule } from '../sidenavright/sidenavright.module';
import { LayoutComponent } from './layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule,
     HeaderModule,SideNavModule, FooterModule,SideNavRightModule,
      NgScrollbarModule,
        // * MATERIAL IMPORTS
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,],

  exports: [LayoutComponent],
})
export class LayoutModule {}
