import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientEffects } from "@core/state/client";
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromModel from './client.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('clients', fromModel.clientReducer),
		EffectsModule.forFeature([ClientEffects])
	],
	declarations: []
})
export class ClientStateModule {}
