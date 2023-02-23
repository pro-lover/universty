import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SchoolCertificateEffects } from "@core/state/schoolCertificate";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './schoolCertificate.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('schoolCertificates', fromModel.schoolCertificateReducer),//note
		EffectsModule.forFeature([SchoolCertificateEffects]),
		
		
	],
	declarations: []
})
export class SchoolCertificateStateModule {}
