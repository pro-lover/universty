import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
	sideBarOpen = true;

	sideBarToggler() {
		this.sideBarOpen = !this.sideBarOpen;
	  }
	  sideBarRightOpen = true;

	sideBarRightToggler() {
		this.sideBarRightOpen = !this.sideBarRightOpen;
	  }
}
