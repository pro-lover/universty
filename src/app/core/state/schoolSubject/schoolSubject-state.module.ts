import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SchoolSubjectEffects } from "@core/state/schoolSubject";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './schoolSubject.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('subjects', fromModel.SchoolSubjectReducer),
		EffectsModule.forFeature([SchoolSubjectEffects])
	],
	declarations: []
})
export class SchoolSubjectStateModule {}
