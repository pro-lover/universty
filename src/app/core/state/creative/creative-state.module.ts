import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreativeEffects } from "@core/state/creative";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './creative.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('creatives', fromModel.creativeReducer),//note
		EffectsModule.forFeature([CreativeEffects])
	],
	declarations: []
})
export class CreativeStateModule {}
