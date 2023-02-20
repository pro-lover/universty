import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/teams`;

@Injectable({ providedIn: 'root' })
export class TeamService {
	private teamSubject: BehaviorSubject<Team[]>;
	public team: Observable<Team[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.teamSubject = new BehaviorSubject<Team[]>([]);
		this.team = this.teamSubject.asObservable();
	}

	public get teamValue(): Team[] {
		return this.teamSubject.value;
	}

	public getAll() {
		return this.http.get<Team[]>(baseUrl)
				.pipe(map((modelCollection: Team[]) => {
						// publish updated collection to subscribers
						this.teamSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<Team>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<Team>(baseUrl, params)
			.pipe(map((model: Team) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<Team>(`${baseUrl}/${id}`, params)
			.pipe(map((model: Team) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<Team>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: Team) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<Team>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: Team) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<Team>(`${baseUrl}/${id}`)
			.pipe(map((model: Team) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: Team, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.teamValue !== null ) {
					const updatedObjs:Team[] = [];
					this.teamValue.map((x: Team) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.teamSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.teamValue !== null ) {

					const updatedObjs:Team[] = [];
					this.teamValue.map((x:Team) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.teamSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.teamValue !== null && deleteId !== undefined ) {

					const updatedObjs:Team[] = [];
					this.teamValue.map((x:Team) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.teamSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('team');

	}
}
