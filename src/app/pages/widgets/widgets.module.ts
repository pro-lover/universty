import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BriefModule } from '@app/pages/widgets/pages/brief/brief.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
//import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { CustomPipeModule } from '@app/shared/pipes/custom.pipe.module';
import { CloudflareStreamModule } from "@cloudflare/stream-angular";
import { ClickTrackingModule } from '@core/directives/click-tracking/click-tracking.module';
import { AccountStateModule } from '@core/state/account/accounts-state.module';
import { ClientStateModule } from '@core/state/client/client-state.module';
//import { NgxUIModule } from '@swimlane/ngx-ui';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CountUpModule } from 'ngx-countup';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {CardProfileComponent,  CardUsersComponent } from './';



@NgModule({
	entryComponents: [
		CardUsersComponent,
		CardProfileComponent,
	],
	declarations: [
		CardUsersComponent,
		CardProfileComponent,
	],
	imports: [
		AccountStateModule,
		ClientStateModule,
		NgxSkeletonLoaderModule,
		CountUpModule,
		NgxChartsModule,
		ClickTrackingModule,
		RouterModule,
		CustomPipeModule,
		CloudflareStreamModule,
		MatTooltipModule,
		DragDropModule,
		MatChipsModule,
		NgScrollbarModule,
		MatCardModule,
		MatSortModule,
		MatTabsModule,
		MatTableModule,
		MatBadgeModule,
		MatAutocompleteModule,
		//MatSidenavModule,
		MatButtonToggleModule,
		MatBottomSheetModule,
		MatToolbarModule,
		MatIconModule,
		MatMenuModule,
		MatPaginatorModule,
		MatRadioModule,
		MatCheckboxModule,
		MatButtonModule,
		//MatGridListModule,
		MatSelectModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		MatDialogModule,
		MatExpansionModule,
		MatSnackBarModule,
		MatStepperModule,
		MatProgressBarModule
	],
	/**/
	exports: [
		BriefModule,
		CardUsersComponent,
		CardProfileComponent,
	]
	/**/
})
export class DashboardWidgetsModule {}
