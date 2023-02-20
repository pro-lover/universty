import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrandEffects } from "@core/state/brand";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './brand.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('brands', fromModel.brandReducer),
		EffectsModule.forFeature([BrandEffects])
	],
	declarations: []
})
export class BrandStateModule {}
