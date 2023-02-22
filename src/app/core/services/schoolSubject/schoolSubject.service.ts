import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SchoolSubject } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/schoolSubjects`;

@Injectable({ providedIn: 'root' })
export class SchoolSubjectService {
	private schoolSubjectSubject: BehaviorSubject<SchoolSubject[]>;
	public schoolSubject: Observable<SchoolSubject[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.schoolSubjectSubject = new BehaviorSubject<SchoolSubject[]>([]);
		this.schoolSubject = this.schoolSubjectSubject.asObservable();
	}

	public get schoolSubjectValue(): SchoolSubject[] {
		return this.schoolSubjectSubject.value;
	}

	public getAll() {
		return this.http.get<SchoolSubject[]>(baseUrl)
				.pipe(map((modelCollection: SchoolSubject[]) => {
						// publish updated collection to subscribers
						this.schoolSubjectSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<SchoolSubject>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<SchoolSubject>(baseUrl, params)
			.pipe(map((model: SchoolSubject) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<SchoolSubject>(`${baseUrl}/${id}`, params)
			.pipe(map((model: SchoolSubject) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<SchoolSubject>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: SchoolSubject) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<SchoolSubject>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: SchoolSubject) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<SchoolSubject>(`${baseUrl}/${id}`)
			.pipe(map((model: SchoolSubject) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: SchoolSubject, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.schoolSubjectValue !== null ) {
					const updatedObjs:SchoolSubject[] = [];
					this.schoolSubjectValue.map((x: SchoolSubject) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.schoolSubjectSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.schoolSubjectValue !== null ) {

					const updatedObjs:SchoolSubject[] = [];
					this.schoolSubjectValue.map((x:SchoolSubject) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.schoolSubjectSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.schoolSubjectValue !== null && deleteId !== undefined ) {

					const updatedObjs:SchoolSubject[] = [];
					this.schoolSubjectValue.map((x:SchoolSubject) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.schoolSubjectSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('schoolSubject');

	}
}
