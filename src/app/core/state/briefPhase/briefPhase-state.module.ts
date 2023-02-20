import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BriefPhaseEffects } from "@core/state/briefPhase";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './briefPhase.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('briefPhases', fromModel.briefPhaseReducer),//note
		EffectsModule.forFeature([BriefPhaseEffects])
	],
	declarations: []
})
export class BriefPhaseStateModule {}
