import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brief } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/briefs`;

@Injectable({ providedIn: 'root' })
export class BriefService {
	private briefSubject: BehaviorSubject<Brief[]>;
	public brief: Observable<Brief[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.briefSubject = new BehaviorSubject<Brief[]>([]);
		this.brief = this.briefSubject.asObservable();
	}

	public get briefValue(): Brief[] {
		console.log(this.briefSubject.value)
		return this.briefSubject.value;
	}

	public getAll() {
		return this.http.get<Brief[]>(baseUrl);

	}

	public getById(id: string) {
		return this.http.get<Brief>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<Brief>(baseUrl, params)
			.pipe(map((model: Brief) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<Brief>(`${baseUrl}/${id}`, params)
			.pipe(map((model: Brief) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<Brief>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: Brief) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}
	public updateProgressStatus(id: string, params: any) {
		return this.http.put<Brief>(`${baseUrl}/${id}/update-brief-status`, params)
			.pipe(map((model: Brief) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<Brief>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: Brief) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<Brief>(`${baseUrl}/${id}`)
			.pipe(map((model: Brief) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: Brief, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.briefValue !== null ) {
					const updatedObjs:Brief[] = [];
					this.briefValue.map((x: Brief) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.briefSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.briefValue !== null ) {

					const updatedObjs:Brief[] = [];
					this.briefValue.map((x:Brief) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.briefSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.briefValue !== null && deleteId !== undefined ) {

					const updatedObjs:Brief[] = [];
					this.briefValue.map((x:Brief) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.briefSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('brief');

	}
}
