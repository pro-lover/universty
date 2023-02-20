import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TeamEffects } from "@core/state/team";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './team.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('teams', fromModel.teamReducer),//note
		EffectsModule.forFeature([TeamEffects])
	],
	declarations: []
})
export class TeamStateModule {}
