import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobTitleEffects } from "@core/state/jobTitle";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './jobTitle.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('jobTitles', fromModel.jobTitleReducer),//note
		EffectsModule.forFeature([JobTitleEffects])
	],
	declarations: []
})
export class JobTitleStateModule {}
