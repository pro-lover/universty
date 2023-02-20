import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ROUTER_UTILS } from '@core/utils/router.utils';

@Component({
	templateUrl: './not-found.page.html',
	styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage {
	path = ROUTER_UTILS.config.base;

	constructor(
		private location: Location
	) {}

	public back(): void {
		this.location.back();
	}
}
