import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SchoolCertificate } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/schoolCertificates`;

@Injectable({ providedIn: 'root' })
export class SchoolCertificateService {
	private schoolCertificateSubject: BehaviorSubject<SchoolCertificate[]>;
	public schoolCertificate: Observable<SchoolCertificate[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.schoolCertificateSubject = new BehaviorSubject<SchoolCertificate[]>([]);
		this.schoolCertificate = this.schoolCertificateSubject.asObservable();
	}

	public get schoolCertificateValue(): SchoolCertificate[] {
		console.log(this.schoolCertificateSubject.value)
		return this.schoolCertificateSubject.value;
	}

	public getAll() {
		return this.http.get<SchoolCertificate[]>(baseUrl);

	}

	public getById(id: string) {
		return this.http.get<SchoolCertificate>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<SchoolCertificate>(baseUrl, params)
			.pipe(map((model: SchoolCertificate) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<SchoolCertificate>(`${baseUrl}/${id}`, params)
			.pipe(map((model: SchoolCertificate) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<SchoolCertificate>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: SchoolCertificate) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}
	public updateProgressStatus(id: string, params: any) {
		return this.http.put<SchoolCertificate>(`${baseUrl}/${id}/update-schoolCertificate-status`, params)
			.pipe(map((model: SchoolCertificate) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<SchoolCertificate>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: SchoolCertificate) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<SchoolCertificate>(`${baseUrl}/${id}`)
			.pipe(map((model: SchoolCertificate) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: SchoolCertificate, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.schoolCertificateValue !== null ) {
					const updatedObjs:SchoolCertificate[] = [];
					this.schoolCertificateValue.map((x: SchoolCertificate) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.schoolCertificateSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.schoolCertificateValue !== null ) {

					const updatedObjs:SchoolCertificate[] = [];
					this.schoolCertificateValue.map((x:SchoolCertificate) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.schoolCertificateSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.schoolCertificateValue !== null && deleteId !== undefined ) {

					const updatedObjs:SchoolCertificate[] = [];
					this.schoolCertificateValue.map((x:SchoolCertificate) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.schoolCertificateSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('schoolCertificate');

	}
}
