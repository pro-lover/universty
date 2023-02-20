import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { AccountStateModule } from '@core/state/account/accounts-state.module';
import { BriefStateModule } from '@core/state/brief/brief-state.module';
import { BrandKPIStateModule } from '@core/state/brandKPI/brandKPI-state.module';
import { BriefPhaseStateModule } from '@core/state/briefPhase/briefPhase-state.module';
import { TeamStateModule } from '@core/state/team/team-state.module';
import { CreativeExecutionStateModule } from '@core/state/creativeExecution/creativeExecution-state.module';
import { BrandStateModule } from '@app/core/state/brand/brand-state.module';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BriefAddEditPage, BriefListPage } from './';
import { DashboardWidgetsModule } from '@app/pages/widgets/widgets.module';
import { CustomPipeModule } from '@app/shared/pipes/custom.pipe.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
	declarations: [
		BriefListPage,
		BriefAddEditPage,

	],
	imports: [
		DashboardWidgetsModule,
		CreativeExecutionStateModule,
		BrandKPIStateModule,
		BriefPhaseStateModule,
		TeamStateModule,
		BrandStateModule,
		BriefStateModule,
		AccountStateModule,
		NgxSkeletonLoaderModule,
		RouterModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
		MatChipsModule,
		MatAutocompleteModule,
		MatDialogModule,
		MatExpansionModule,
		MatSortModule,
		MatMenuModule,
		CustomPipeModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatToolbarModule,
		MatTableModule,
		MatIconModule,
		MatPaginatorModule,
		MatButtonToggleModule,
		MatSlideToggleModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatCardModule,
		MatButtonModule,
		MatBottomSheetModule,
		MatProgressBarModule,
		MatCheckboxModule,

	],
	providers: [
		MatDatepickerModule,
		MatNativeDateModule
	]
})
export class AdminBriefsModule {}
