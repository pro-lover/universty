import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from '@app/components';
import { CoreModule } from '@core/core.module';
import { environment } from '@env/environment';
import { WebShellModule } from '@app/shell/web-shell.module';
import { DashboardWidgetsModule } from './pages/widgets/widgets.module';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { AppComponent } from './app.component';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { EffectsModule } from "@ngrx/effects";
    import { StoreRouterConnectingModule } from '@ngrx/router-store';
    import { StoreModule } from '@ngrx/store';
    import { StoreDevtoolsModule } from "@ngrx/store-devtools";



@NgModule({
	entryComponents: [

	],
	declarations: [
		AppComponent,
		AlertComponent,

	],
	imports: [
		BrowserModule,
		MatDialogModule,
		MatSelectModule,
		BrowserAnimationsModule,
		CoreModule,
		MatChipsModule,
		DashboardWidgetsModule,
		WebShellModule,
		MatSnackBarModule,
		MatFormFieldModule,
		MatButtonToggleModule,
		NgxGoogleAnalyticsModule.forRoot(environment.ga),
		StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        StoreRouterConnectingModule.forRoot()
	],
	exports: [
	],
	bootstrap: [
		AppComponent
	],
})
export class AppModule {}
