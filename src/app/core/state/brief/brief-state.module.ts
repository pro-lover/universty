import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BriefEffects } from "@core/state/brief";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './brief.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('briefs', fromModel.briefReducer),//note
		EffectsModule.forFeature([BriefEffects]),
		
		
	],
	declarations: []
})
export class BriefStateModule {}
