import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobLevel } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/jobLevels`;

@Injectable({ providedIn: 'root' })
export class JobLevelService {
	private jobLevelSubject: BehaviorSubject<JobLevel[]>;
	public jobLevel: Observable<JobLevel[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.jobLevelSubject = new BehaviorSubject<JobLevel[]>([]);
		this.jobLevel = this.jobLevelSubject.asObservable();
	}

	public get jobLevelValue(): JobLevel[] {
		return this.jobLevelSubject.value;
	}

	public getAll() {
		return this.http.get<JobLevel[]>(baseUrl)
				.pipe(map((modelCollection: JobLevel[]) => {
						// publish updated collection to subscribers
						this.jobLevelSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<JobLevel>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<JobLevel>(baseUrl, params)
			.pipe(map((model: JobLevel) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<JobLevel>(`${baseUrl}/${id}`, params)
			.pipe(map((model: JobLevel) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<JobLevel>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: JobLevel) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<JobLevel>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: JobLevel) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<JobLevel>(`${baseUrl}/${id}`)
			.pipe(map((model: JobLevel) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: JobLevel, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.jobLevelValue !== null ) {
					const updatedObjs:JobLevel[] = [];
					this.jobLevelValue.map((x: JobLevel) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.jobLevelSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.jobLevelValue !== null ) {

					const updatedObjs:JobLevel[] = [];
					this.jobLevelValue.map((x:JobLevel) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.jobLevelSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.jobLevelValue !== null && deleteId !== undefined ) {

					const updatedObjs:JobLevel[] = [];
					this.jobLevelValue.map((x:JobLevel) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.jobLevelSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('jobLevel');

	}
}
