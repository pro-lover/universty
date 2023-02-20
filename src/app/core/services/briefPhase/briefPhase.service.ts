import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BriefPhase } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/briefPhases`;

@Injectable({ providedIn: 'root' })
export class BriefPhaseService {
	private briefPhaseSubject: BehaviorSubject<BriefPhase[]>;
	public briefPhase: Observable<BriefPhase[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.briefPhaseSubject = new BehaviorSubject<BriefPhase[]>([]);
		this.briefPhase = this.briefPhaseSubject.asObservable();
	}

	public get briefPhaseValue(): BriefPhase[] {
		return this.briefPhaseSubject.value;
	}

	public getAll() {
		return this.http.get<BriefPhase[]>(baseUrl)
				.pipe(map((modelCollection: BriefPhase[]) => {
						// publish updated collection to subscribers
						this.briefPhaseSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<BriefPhase>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<BriefPhase>(baseUrl, params)
			.pipe(map((model: BriefPhase) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<BriefPhase>(`${baseUrl}/${id}`, params)
			.pipe(map((model: BriefPhase) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<BriefPhase>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: BriefPhase) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<BriefPhase>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: BriefPhase) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<BriefPhase>(`${baseUrl}/${id}`)
			.pipe(map((model: BriefPhase) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: BriefPhase, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.briefPhaseValue !== null ) {
					const updatedObjs:BriefPhase[] = [];
					this.briefPhaseValue.map((x: BriefPhase) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.briefPhaseSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.briefPhaseValue !== null ) {

					const updatedObjs:BriefPhase[] = [];
					this.briefPhaseValue.map((x:BriefPhase) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.briefPhaseSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.briefPhaseValue !== null && deleteId !== undefined ) {

					const updatedObjs:BriefPhase[] = [];
					this.briefPhaseValue.map((x:BriefPhase) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.briefPhaseSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('BriefPhase');

	}
}
