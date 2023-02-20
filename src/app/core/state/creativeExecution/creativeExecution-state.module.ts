import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreativeExecutionEffects } from "@core/state/creativeExecution";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './creativeExecution.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('creativeExecutions', fromModel.creativeExecutionReducer),
		EffectsModule.forFeature([CreativeExecutionEffects])
	],
	declarations: []
})
export class CreativeExecutionStateModule {}
