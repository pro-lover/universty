</mat-expansion-panel>
</mat-accordion>
<br /><br />
<div class="example-action-buttons">
	<button mat-button (click)="accordion.openAll()">Expand All</button>
	<button mat-button (click)="accordion.closeAll()">Collapse All</button>
  </div>
<mat-accordion class="example-headers-align" multi>
	<mat-expansion-panel>
	  <mat-expansion-panel-header>
		<mat-panel-title>
		  Brief In Progress
		</mat-panel-title>
		<mat-panel-description>
			<span *ngIf="dataSource3">
				{{dataSource3.length}}
			</span>
		</mat-panel-description>
	  </mat-expansion-panel-header>
		<app-widgets></app-widgets>
	  <table mat-table [dataSource]="dataSource3" multiTemplateDataRows class="table table-striped" >
		<ng-container matColumnDef="{{model}}" *ngFor="let model of columnsToDisplay">
			<thead>
				<th mat-header-cell *matHeaderCellDef> {{model}} </th>
			</thead>
			<tbody >
				<td mat-cell *matCellDef="let element">
					<div>
						<span >{{element[model]}}</span>
					</div>
				</td>
			</tbody>
		</ng-container>
		<ng-container matColumnDef="expand">

			<th mat-header-cell *matHeaderCellDef aria-label="row actions">&nbsp;</th>
			<td mat-cell *matCellDef="let element">
				<button mat-raised-button [disabled]="element.deletedAt !== null" (click)="openDialog(element.id)">
					Change brief progress
				</button>
			<mat-slide-toggle
			color="primary"
			[disabled]="element.deletedAt !== null"
			(change)="toggleStatus($event, element.id)"
			[checked]="element.status">
			</mat-slide-toggle>
			<button mat-icon-button aria-label="expand row" (click)="(expandedElement = expandedElement === element ? null : element); $event.stopPropagation()">
				<mat-icon *ngIf="expandedElement !== element">keyboard_arrow_down</mat-icon>
				<mat-icon *ngIf="expandedElement === element">keyboard_arrow_up</mat-icon>
			</button>
			<button
				mat-icon-button
				aria-label="expand row"
				[matMenuTriggerFor]="menu" aria-label="">
				<mat-icon >more_vert</mat-icon>
			</button>

			<mat-menu #menu="matMenu">

				<button
							[disabled]="element.deletedAt !== null"
							routerLink="edit/{{element.id}}"
							mat-menu-item>
								<mat-icon>edit</mat-icon>
								<span>Edit</span>
						</button>

						<button

							[disabled]="element.deletedAt !== null"
							mat-menu-item disabled>
								<!--<mat-icon>history</mat-icon>-->
								<mat-icon>track_changes</mat-icon>
								<span>Audit</span>
						</button>
						<button
							(click)="deleteModel(element.id)"
							[disabled]="element.deletedAt !== null"
							mat-menu-item>
								<mat-icon>delete</mat-icon>
								<span>Delete</span>
						</button>
						<button
							(click)="restoreModel(element.id)"
							[disabled]="element.deletedAt === null"
							mat-menu-item>
								<mat-icon>restore_from_trash</mat-icon>
								<span>Restore</span>
						</button>
			</mat-menu>
			</td>
		</ng-container>
		<!-- Expanded Content Column - The detail row is made up of this one model that spans across all columns -->
		<ng-container matColumnDef="expandedDetail">
			<td mat-cell *matCellDef="let element" [attr.colspan]="columnsToDisplayWithExpand.length">
			<div class="example-element-detail" [@detailExpand]="element == expandedElement ? 'expanded' : 'collapsed'">
				<div class="example-element-description">
					<dl>
						<dt>objective</dt>
						<dd>- {{element.objective}}</dd>
						<dt>business</dt>
						<dd>- {{element.business}}</dd>
						<dt>Brand KPIs</dt>
						<ng-container  *ngFor="let SchoolSubjectdata of element.SchoolSubjects">
							<dd>- {{SchoolSubjectdata.name}}</dd>
						  </ng-container>
						<dt>Target Audience</dt>
						<dd>- {{element.targetAudience}}</dd>
						<dt>Target Audience Insight</dt>
						<dd>- {{element.targetAudienceInsight}}</dd>
						<dt>Target Audience Outtake</dt>
						<dd>- {{element.targetAudienceOuttake}}</dd>
						<dt>Single Minded Thought</dt>
						<dd>- {{element.singleMindedThought}}</dd>
						<dt>Budget</dt>
						<dd>- {{element.budget}}</dd>
						<dt>brandTone</dt>
						<dd>- {{element.brandTone}}</dd>
						<dt>Executional Requirement</dt>
						<dd>- {{element.creativeexecution.name}}</dd>
						<dt>Brief Phase</dt>
						<dd>- {{element.briefphase.name}}</dd>
						<dt>Team</dt>
						<ng-container  *ngFor="let teamsdata of element.teams">
							<dd>- {{teamsdata.name}}</dd>
						</ng-container>
						<dt>deadline Time</dt>
						<dd>- {{element.deadlineTime}}</dd>
						<dt>deadline Date</dt>
						<dd>- {{element.deadlineDate}}</dd>
					</dl>
				</div>
			</div>
			</td>
		</ng-container>
  <tr mat-header-row *matHeaderRowDef="columnsToDisplayWithExpand"></tr>
  <tr mat-row *matRowDef="let element; columns: columnsToDisplayWithExpand;"
      class="example-element-row"
      [class.example-expanded-row]="expandedElement === element"
      (click)="expandedElement = expandedElement === element ? null : element">
  </tr>
  <tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="example-detail-row"></tr>
</table>

	</mat-expansion-panel>
	<mat-expansion-panel>
		<mat-expansion-panel-header>
		  <mat-panel-title>
			Brief Resolved
		  </mat-panel-title>
		  <mat-panel-description>
			<span *ngIf="dataSource2">
				{{dataSource2.length}}
			</span>
		  </mat-panel-description>
		</mat-expansion-panel-header>

		<table mat-table [dataSource]="dataSource2" multiTemplateDataRows class="table table-striped" >
		  <ng-container matColumnDef="{{model}}" *ngFor="let model of columnsToDisplay">
			  <thead>
				  <th mat-header-cell *matHeaderCellDef> {{model}} </th>
			  </thead>
			  <tbody>
				  <td mat-cell *matCellDef="let element"> {{element[model]}} </td>
			  </tbody>
		  </ng-container>
		  <ng-container matColumnDef="expand">

			  <th mat-header-cell *matHeaderCellDef aria-label="row actions">&nbsp;</th>
			  <td mat-cell *matCellDef="let element">
				<button mat-raised-button [disabled]="element.deletedAt !== null" (click)="openDialog(element.id)">
					Change brief progress
				</button>
			  <mat-slide-toggle
			  color="primary"
			  [disabled]="element.deletedAt !== null"
			  (change)="toggleStatus($event, element.id)"
			  [checked]="element.status">
			  </mat-slide-toggle>
			  <button mat-icon-button aria-label="expand row" (click)="(expandedElement = expandedElement === element ? null : element); $event.stopPropagation()">
				  <mat-icon *ngIf="expandedElement !== element">keyboard_arrow_down</mat-icon>
				  <mat-icon *ngIf="expandedElement === element">keyboard_arrow_up</mat-icon>
			  </button>
			  <button
				  mat-icon-button
				  aria-label="expand row"
				  [matMenuTriggerFor]="menu" aria-label="">
				  <mat-icon >more_vert</mat-icon>
			  </button>

			  <mat-menu #menu="matMenu">

				  <button
							  [disabled]="element.deletedAt !== null"
							  routerLink="edit/{{element.id}}"
							  mat-menu-item>
								  <mat-icon>edit</mat-icon>
								  <span>Edit</span>
						  </button>

						  <button

							  [disabled]="element.deletedAt !== null"
							  mat-menu-item disabled>
								  <!--<mat-icon>history</mat-icon>-->
								  <mat-icon>track_changes</mat-icon>
								  <span>Audit</span>
						  </button>
						  <button
							  (click)="deleteModel(element.id)"
							  [disabled]="element.deletedAt !== null"
							  mat-menu-item>
								  <mat-icon>delete</mat-icon>
								  <span>Delete</span>
						  </button>
						  <button
							  (click)="restoreModel(element.id)"
							  [disabled]="element.deletedAt === null"
							  mat-menu-item>
								  <mat-icon>restore_from_trash</mat-icon>
								  <span>Restore</span>
						  </button>
			  </mat-menu>
			  </td>
		  </ng-container>
		  <!-- Expanded Content Column - The detail row is made up of this one model that spans across all columns -->
		  <ng-container matColumnDef="expandedDetail">
			  <td mat-cell *matCellDef="let element" [attr.colspan]="columnsToDisplayWithExpand.length">
			  <div class="example-element-detail" [@detailExpand]="element == expandedElement ? 'expanded' : 'collapsed'">
				  <div class="example-element-description">
					  <dl>
						  <dt>objective</dt>
						  <dd>- {{element.objective}}</dd>
						  <dt>business</dt>
						  <dd>- {{element.business}}</dd>
						  <dt>Brand KPIs</dt>
						  <ng-container  *ngFor="let SchoolSubjectdata of element.SchoolSubjects">
							<dd>- {{SchoolSubjectdata.name}}</dd>
						  </ng-container>
						  <dt>Target Audience</dt>
						  <dd>- {{element.targetAudience}}</dd>
						  <dt>Target Audience Insight</dt>
						  <dd>- {{element.targetAudienceInsight}}</dd>
						  <dt>Target Audience Outtake</dt>
						  <dd>- {{element.targetAudienceOuttake}}</dd>
						  <dt>Single Minded Thought</dt>
						  <dd>- {{element.singleMindedThought}}</dd>
						  <dt>Budget</dt>
						  <dd>- {{element.budget}}</dd>
						  <dt>brandTone</dt>
						  <dd>- {{element.brandTone}}</dd>
						  <dt>Executional Requirement</dt>
						  <dd>- {{element.creativeexecution.name}}</dd>
						  <dt>Brief Phase</dt>
						  <dd>- {{element.briefphase.name}}</dd>
						  <dt>Team</dt>
						  <ng-container  *ngFor="let teamsdata of element.teams">
							<dd>- {{teamsdata.name}}</dd>
						</ng-container>
						  <dt>deadline Time</dt>
						  <dd>- {{element.deadlineTime}}</dd>
						  <dt>deadline Date</dt>
						  <dd>- {{element.deadlineDate}}</dd>
					  </dl>
				  </div>
			  </div>
			  </td>
		  </ng-container>
	<tr mat-header-row *matHeaderRowDef="columnsToDisplayWithExpand"></tr>
	<tr mat-row *matRowDef="let element; columns: columnsToDisplayWithExpand;"
		class="example-element-row"
		[class.example-expanded-row]="expandedElement === element"
		(click)="expandedElement = expandedElement === element ? null : element">
	</tr>
	<tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="example-detail-row"></tr>
  </table>

	  </mat-expansion-panel>
	  <mat-expansion-panel>
		<mat-expansion-panel-header>
		  <mat-panel-title>
			Brief approved
		  </mat-panel-title>
		  <mat-panel-description>
			<span *ngIf="dataSource1">
				{{dataSource1.length}}
			</span>
		  </mat-panel-description>
		</mat-expansion-panel-header>

		<table mat-table [dataSource]="dataSource1" multiTemplateDataRows class="table table-striped" >
		  <ng-container matColumnDef="{{model}}" *ngFor="let model of columnsToDisplay">
			  <thead>
				  <th mat-header-cell *matHeaderCellDef> {{model}} </th>
			  </thead>
			  <tbody>
				  <td mat-cell *matCellDef="let element"> {{element[model]}} </td>
			  </tbody>
		  </ng-container>
		  <ng-container matColumnDef="expand">

			  <th mat-header-cell *matHeaderCellDef aria-label="row actions">&nbsp;</th>
			  <td mat-cell *matCellDef="let element">
				<button mat-raised-button [disabled]="element.deletedAt !== null" (click)="openDialog(element.id)">
					Change brief progress
				</button>
			  <mat-slide-toggle
			  color="primary"
			  [disabled]="element.deletedAt !== null"
			  (change)="toggleStatus($event, element.id)"
			  [checked]="element.status">
			  </mat-slide-toggle>
			  <button mat-icon-button aria-label="expand row" (click)="(expandedElement = expandedElement === element ? null : element); $event.stopPropagation()">
				  <mat-icon *ngIf="expandedElement !== element">keyboard_arrow_down</mat-icon>
				  <mat-icon *ngIf="expandedElement === element">keyboard_arrow_up</mat-icon>
			  </button>
			  <button
				  mat-icon-button
				  aria-label="expand row"
				  [matMenuTriggerFor]="menu" aria-label="">
				  <mat-icon >more_vert</mat-icon>
			  </button>

			  <mat-menu #menu="matMenu">

				  <button
							  [disabled]="element.deletedAt !== null"
							  routerLink="edit/{{element.id}}"
							  mat-menu-item>
								  <mat-icon>edit</mat-icon>
								  <span>Edit</span>
						  </button>

						  <button

							  [disabled]="element.deletedAt !== null"
							  mat-menu-item disabled>
								  <!--<mat-icon>history</mat-icon>-->
								  <mat-icon>track_changes</mat-icon>
								  <span>Audit</span>
						  </button>
						  <button
							  (click)="deleteModel(element.id)"
							  [disabled]="element.deletedAt !== null"
							  mat-menu-item>
								  <mat-icon>delete</mat-icon>
								  <span>Delete</span>
						  </button>
						  <button
							  (click)="restoreModel(element.id)"
							  [disabled]="element.deletedAt === null"
							  mat-menu-item>
								  <mat-icon>restore_from_trash</mat-icon>
								  <span>Restore</span>
						  </button>
			  </mat-menu>
			  </td>
		  </ng-container>
		  <!-- Expanded Content Column - The detail row is made up of this one model that spans across all columns -->
		  <ng-container matColumnDef="expandedDetail">
			  <td mat-cell *matCellDef="let element" [attr.colspan]="columnsToDisplayWithExpand.length">
			  <div class="example-element-detail" [@detailExpand]="element == expandedElement ? 'expanded' : 'collapsed'">
				  <div class="example-element-description">
					  <dl>
						  <dt>objective</dt>
						  <dd>- {{element.objective}}</dd>
						  <dt>business</dt>
						  <dd>- {{element.business}}</dd>
						  <dt>Brand KPIs</dt>
						  <ng-container  *ngFor="let SchoolSubjectdata of element.SchoolSubjects">
							<dd>- {{SchoolSubjectdata.name}}</dd>
						  </ng-container>
						  <dt>Target Audience</dt>
						  <dd>- {{element.targetAudience}}</dd>
						  <dt>Target Audience Insight</dt>
						  <dd>- {{element.targetAudienceInsight}}</dd>
						  <dt>Target Audience Outtake</dt>
						  <dd>- {{element.targetAudienceOuttake}}</dd>
						  <dt>Single Minded Thought</dt>
						  <dd>- {{element.singleMindedThought}}</dd>
						  <dt>Budget</dt>
						  <dd>- {{element.budget}}</dd>
						  <dt>brandTone</dt>
						  <dd>- {{element.brandTone}}</dd>
						  <dt>Executional Requirement</dt>
						  <dd>- {{element.creativeexecution.name}}</dd>
						  <dt>Brief Phase</dt>
						  <dd>- {{element.briefphase.name}}</dd>
						  <dt>Team</dt>
						  <ng-container  *ngFor="let teamsdata of element.teams">
							<dd>- {{teamsdata.name}}</dd>
							</ng-container>
						  <dt>deadline Time</dt>
						  <dd>- {{element.deadlineTime}}</dd>
						  <dt>deadline Date</dt>
						  <dd>- {{element.deadlineDate}}</dd>
					  </dl>
				  </div>
			  </div>
			  </td>
		  </ng-container>
	<tr mat-header-row *matHeaderRowDef="columnsToDisplayWithExpand"></tr>
	<tr mat-row *matRowDef="let element; columns: columnsToDisplayWithExpand;"
		class="example-element-row"
		[class.example-expanded-row]="expandedElement === element"
		(click)="expandedElement = expandedElement === element ? null : element">
	</tr>
	<tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="example-detail-row"></tr>
  </table>

	  </mat-expansion-panel>
	  <mat-expansion-panel>
		<mat-expansion-panel-header>
		  <mat-panel-title>
			Brief Created
		  </mat-panel-title>
		  <mat-panel-description *ngIf="primaryData">
			<span *ngIf="dataSource">
				{{dataSource.length}}
			</span>
		  </mat-panel-description>
		</mat-expansion-panel-header>
		<table mat-table [dataSource]="dataSource" multiTemplateDataRows class="table table-striped" >
		  <ng-container matColumnDef="{{model}}" *ngFor="let model of columnsToDisplay;let indexOfelement = index;">
			  	<thead>
				  	<th mat-header-cell *matHeaderCellDef> {{model}} </th>
			  	</thead>
				<tbody >
					<td mat-cell *matCellDef="let element">{{element[model]}}</td>
			  	</tbody>
		  </ng-container>
		  <ng-container matColumnDef="expand">
			  <th mat-header-cell *matHeaderCellDef aria-label="row actions">&nbsp;</th>
			  	<td mat-cell *matCellDef="let element">
					<button mat-raised-button [disabled]="element.deletedAt !== null" (click)="openDialog(element.id)">
						Approve brief
					</button>
					<mat-slide-toggle
					color="primary"
					[disabled]="element.deletedAt !== null"
					(change)="toggleStatus($event, element.id)"
					[checked]="element.status">
					</mat-slide-toggle>
					<button mat-icon-button aria-label="expand row" (click)="(expandedElement = expandedElement === element ? null : element); $event.stopPropagation()">
						<mat-icon *ngIf="expandedElement !== element">keyboard_arrow_down</mat-icon>
						<mat-icon *ngIf="expandedElement === element">keyboard_arrow_up</mat-icon>
					</button>
					<button
						mat-icon-button
						aria-label="expand row"
						[matMenuTriggerFor]="menu" aria-label="">
						<mat-icon >more_vert</mat-icon>
					</button>

			  <mat-menu #menu="matMenu">

				  <button
							  [disabled]="element.deletedAt !== null"
							  routerLink="edit/{{element.id}}"
							  mat-menu-item>
								  <mat-icon>edit</mat-icon>
								  <span>Edit</span>
						  </button>

						  <button

							  [disabled]="element.deletedAt !== null"
							  mat-menu-item disabled>
								  <!--<mat-icon>history</mat-icon>-->
								  <mat-icon>track_changes</mat-icon>
								  <span>Audit</span>
						  </button>
						  <button
							  (click)="deleteModel(element.id)"
							  [disabled]="element.deletedAt !== null"
							  mat-menu-item>
								  <mat-icon>delete</mat-icon>
								  <span>Delete</span>
						  </button>
						  <button
							  (click)="restoreModel(element.id)"
							  [disabled]="element.deletedAt === null"
							  mat-menu-item>
								  <mat-icon>restore_from_trash</mat-icon>
								  <span>Restore</span>
						  </button>
			  </mat-menu>
			  </td>
		  </ng-container>
		  <!-- Expanded Content Column - The detail row is made up of this one model that spans across all columns -->
		  <ng-container matColumnDef="expandedDetail">
			  <td mat-cell *matCellDef="let element" [attr.colspan]="columnsToDisplayWithExpand.length">
			  <div class="example-element-detail" [@detailExpand]="element == expandedElement ? 'expanded' : 'collapsed'">
				  <div class="example-element-description">
					  <dl>
						  <dt>objective</dt>
						  <dd>- {{element.objective}}</dd>
						  <dt>business</dt>
						  <dd>- {{element.business}}</dd>
						  <dt>School Subjects</dt>
						  <ng-container  *ngFor="let SchoolSubjectdata of element.SchoolSubjects">
							<dd>- {{SchoolSubjectdata.name}}</dd>
						  </ng-container>

						  <dt>Target Audience</dt>
						  <dd>- {{element.targetAudience}}</dd>
						  <dt>Target Audience Insight</dt>
						  <dd>- {{element.targetAudienceInsight}}</dd>
						  <dt>Target Audience Outtake</dt>
						  <dd>- {{element.targetAudienceOuttake}}</dd>
						  <dt>Single Minded Thought</dt>
						  <dd>- {{element.singleMindedThought}}</dd>
						  <dt>Budget</dt>
						  <dd>- {{element.budget}}</dd>
						  <dt>brandTone</dt>
						  <dd>- {{element.brandTone}}</dd>
						  <dt>Executional Requirement</dt>
						  <dd>- {{element.creativeexecution.name}}</dd>
						  <dt>Brief Phase</dt>
						  <dd>- {{element.briefphase.name}}</dd>
						  <dt>Team</dt>
						  <ng-container  *ngFor="let teamsdata of element.teams">
							<dd>- {{teamsdata.name}}</dd>
						</ng-container>
						  <dt>deadline Time</dt>
						  <dd>- {{element.deadlineTime}}</dd>
						  <dt>deadline Date</dt>
						  <dd>- {{element.deadlineDate}}</dd>
					  </dl>
				  </div>
			  </div>
			  </td>
		  </ng-container>
	<tr mat-header-row *matHeaderRowDef="columnsToDisplayWithExpand"></tr>
	<tr mat-row *matRowDef="let element; columns: columnsToDisplayWithExpand;"
		class="example-element-row"
		[class.example-expanded-row]="expandedElement === element"
		(click)="expandedElement = expandedElement === element ? null : element">
	</tr>
	<tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="example-detail-row"></tr>
  </table>

	  </mat-expansion-panel>
		<mat-expansion-panel>
			<mat-expansion-panel-header>
				<mat-panel-title>
					Brief In Progress
				</mat-panel-title>
				<mat-panel-description>
					<span *ngIf="dataSource3">
						{{dataSource3.length}}
					</span>
				</mat-panel-description>
			</mat-expansion-panel-header>
				<app-widgets [dataView]="primaryData" [briefProgress]="dataBriefProgress[3].name"></app-widgets>
		</mat-expansion-panel>

		<mat-expansion-panel>
			<mat-expansion-panel-header>
				<mat-panel-title>
					Brief Resolved
				</mat-panel-title>
				<mat-panel-description>
					<span *ngIf="dataSource2">
						{{dataSource2.length}}
					</span>
				</mat-panel-description>
			</mat-expansion-panel-header>
				<app-widgets [dataView]="primaryData" [briefProgress]="dataBriefProgress[1].name" ></app-widgets>
		</mat-expansion-panel>

		<mat-expansion-panel>
			<mat-expansion-panel-header>
				<mat-panel-title>
					Brief approved
				</mat-panel-title>
				<mat-panel-description>
					<span *ngIf="dataSource1">
						{{dataSource1.length}}
					</span>
				</mat-panel-description>
			</mat-expansion-panel-header>
				<app-widgets [dataView]="primaryData" [briefProgress]="dataBriefProgress[2].name"></app-widgets>
		</mat-expansion-panel>

		<mat-expansion-panel>
			<mat-expansion-panel-header>
				<mat-panel-title>
					Brief Created
				</mat-panel-title>
				<mat-panel-description *ngIf="primaryData">
					<span *ngIf="dataSource">
						{{dataSource.length}}
					</span>
				</mat-panel-description>
			</mat-expansion-panel-header>
				<app-widgets [dataView]="primaryData" [briefProgress]="dataBriefProgress[0].name"></app-widgets>
		</mat-expansion-panel>
  </mat-accordion>