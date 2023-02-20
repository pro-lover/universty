import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobLevelEffects } from "@core/state/jobLevel";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './jobLevel.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('jobLevels', fromModel.jobLevelReducer),//note
		EffectsModule.forFeature([JobLevelEffects])
	],
	declarations: []
})
export class JobLevelStateModule {}
