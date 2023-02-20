import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Creative } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/creatives`;

@Injectable({ providedIn: 'root' })
export class CreativeService {
	private creativeSubject: BehaviorSubject<Creative[]>;
	public creative: Observable<Creative[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.creativeSubject = new BehaviorSubject<Creative[]>([]);
		this.creative = this.creativeSubject.asObservable();
	}

	public get creativeValue(): Creative[] {
		return this.creativeSubject.value;
	}

	public getAll() {
		return this.http.get<Creative[]>(baseUrl)
				.pipe(map((modelCollection: Creative[]) => {
						// publish updated collection to subscribers
						this.creativeSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<Creative>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<Creative>(baseUrl, params)
			.pipe(map((model: Creative) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<Creative>(`${baseUrl}/${id}`, params)
			.pipe(map((model: Creative) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<Creative>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: Creative) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<Creative>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: Creative) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<Creative>(`${baseUrl}/${id}`)
			.pipe(map((model: Creative) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: Creative, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.creativeValue !== null ) {
					const updatedObjs:Creative[] = [];
					this.creativeValue.map((x: Creative) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.creativeSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.creativeValue !== null ) {

					const updatedObjs:Creative[] = [];
					this.creativeValue.map((x:Creative) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.creativeSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.creativeValue !== null && deleteId !== undefined ) {

					const updatedObjs:Creative[] = [];
					this.creativeValue.map((x:Creative) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.creativeSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('creative');

	}
}
