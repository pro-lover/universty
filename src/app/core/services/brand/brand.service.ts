import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/brands`;

@Injectable({ providedIn: 'root' })
export class BrandService {
	private brandSubject: BehaviorSubject<Brand[]>;
	public brand: Observable<Brand[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.brandSubject = new BehaviorSubject<Brand[]>([]);
		this.brand = this.brandSubject.asObservable();
	}

	public get brandValue(): Brand[] {
		return this.brandSubject.value;
	}

	public getAll() {
		return this.http.get<Brand[]>(baseUrl)
				.pipe(map((modelCollection: Brand[]) => {
						// publish updated collection to subscribers
						this.brandSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<Brand>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<Brand>(baseUrl, params)
			.pipe(map((model: Brand) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<Brand>(`${baseUrl}/${id}`, params)
			.pipe(map((model: Brand) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<Brand>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: Brand) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<Brand>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: Brand) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<Brand>(`${baseUrl}/${id}`)
			.pipe(map((model: Brand) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: Brand, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.brandValue !== null ) {
					const updatedObjs:Brand[] = [];
					this.brandValue.map((x: Brand) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.brandSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.brandValue !== null ) {

					const updatedObjs:Brand[] = [];
					this.brandValue.map((x:Brand) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.brandSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.brandValue !== null && deleteId !== undefined ) {

					const updatedObjs:Brand[] = [];
					this.brandValue.map((x:Brand) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.brandSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('brand');

	}
}
