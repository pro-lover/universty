import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrandKPIEffects } from "@core/state/brandKPI";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './brandKPI.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('brandKPIs', fromModel.brandKPIReducer),
		EffectsModule.forFeature([BrandKPIEffects])
	],
	declarations: []
})
export class BrandKPIStateModule {}
