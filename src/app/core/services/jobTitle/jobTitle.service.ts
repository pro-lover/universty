import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobTitle } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/jobTitles`;

@Injectable({ providedIn: 'root' })
export class JobTitleService {
	private jobTitleSubject: BehaviorSubject<JobTitle[]>;
	public jobTitle: Observable<JobTitle[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.jobTitleSubject = new BehaviorSubject<JobTitle[]>([]);
		this.jobTitle = this.jobTitleSubject.asObservable();
	}

	public get jobTitleValue(): JobTitle[] {
		return this.jobTitleSubject.value;
	}

	public getAll() {
		return this.http.get<JobTitle[]>(baseUrl)
				.pipe(map((modelCollection: JobTitle[]) => {
						// publish updated collection to subscribers
						this.jobTitleSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<JobTitle>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<JobTitle>(baseUrl, params)
			.pipe(map((model: JobTitle) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<JobTitle>(`${baseUrl}/${id}`, params)
			.pipe(map((model: JobTitle) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<JobTitle>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: JobTitle) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<JobTitle>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: JobTitle) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<JobTitle>(`${baseUrl}/${id}`)
			.pipe(map((model: JobTitle) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: JobTitle, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.jobTitleValue !== null ) {
					const updatedObjs:JobTitle[] = [];
					this.jobTitleValue.map((x: JobTitle) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.jobTitleSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.jobTitleValue !== null ) {

					const updatedObjs:JobTitle[] = [];
					this.jobTitleValue.map((x:JobTitle) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.jobTitleSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.jobTitleValue !== null && deleteId !== undefined ) {

					const updatedObjs:JobTitle[] = [];
					this.jobTitleValue.map((x:JobTitle) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.jobTitleSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('jobTitle');

	}
}
