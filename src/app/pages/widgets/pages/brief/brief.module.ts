import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ClickTrackingModule } from '@core/directives/click-tracking/click-tracking.module';
import { BriefComponent } from './brief.component';
import { DialogOverviewExampleDialog } from './dialog-overview-example-dialog.page';
import { DialogView } from './dialog-view.page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CustomPipeModule } from '@app/shared/pipes/custom.pipe.module';
@NgModule({
	declarations: [BriefComponent,DialogOverviewExampleDialog,DialogView],
	imports: [
		NgxSkeletonLoaderModule,
		CommonModule,
		RouterModule,
		MatButtonModule,
		MatIconModule,
		MatBadgeModule,
		MatPaginatorModule,
		MatDialogModule,
		MatMenuModule,
		MatTooltipModule,
		ClickTrackingModule,
		MatToolbarModule,
		MatDividerModule,
		MatListModule,
		FormsModule,
		ReactiveFormsModule,
		MatNativeDateModule,
		MatDatepickerModule,
		MatStepperModule,
		MatChipsModule,
		MatAutocompleteModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatTooltipModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatCardModule,
		MatButtonModule,
		MatGridListModule,
		MatBottomSheetModule,
		MatProgressBarModule,
		MatButtonToggleModule,
		CustomPipeModule,

	],
	exports: [BriefComponent],
})
export class BriefModule {}
