import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreativeExecution } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/creativeExecutions`;

@Injectable({ providedIn: 'root' })
export class CreativeExecutionService {
	private creativeExecutionSubject: BehaviorSubject<CreativeExecution[]>;
	public creativeExecution: Observable<CreativeExecution[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.creativeExecutionSubject = new BehaviorSubject<CreativeExecution[]>([]);
		this.creativeExecution = this.creativeExecutionSubject.asObservable();
	}

	public get creativeExecutionValue(): CreativeExecution[] {
		return this.creativeExecutionSubject.value;
	}

	public getAll() {
		return this.http.get<CreativeExecution[]>(baseUrl)
				.pipe(map((modelCollection: CreativeExecution[]) => {
						// publish updated collection to subscribers
						this.creativeExecutionSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<CreativeExecution>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<CreativeExecution>(baseUrl, params)
			.pipe(map((model: CreativeExecution) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<CreativeExecution>(`${baseUrl}/${id}`, params)
			.pipe(map((model: CreativeExecution) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<CreativeExecution>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: CreativeExecution) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<CreativeExecution>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: CreativeExecution) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<CreativeExecution>(`${baseUrl}/${id}`)
			.pipe(map((model: CreativeExecution) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: CreativeExecution, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.creativeExecutionValue !== null ) {
					const updatedObjs:CreativeExecution[] = [];
					this.creativeExecutionValue.map((x: CreativeExecution) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.creativeExecutionSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.creativeExecutionValue !== null ) {

					const updatedObjs:CreativeExecution[] = [];
					this.creativeExecutionValue.map((x:CreativeExecution) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.creativeExecutionSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.creativeExecutionValue !== null && deleteId !== undefined ) {

					const updatedObjs:CreativeExecution[] = [];
					this.creativeExecutionValue.map((x:CreativeExecution) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.creativeExecutionSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('creativeExecution');

	}
}
