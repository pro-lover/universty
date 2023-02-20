import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandKPI } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/brandKPIs`;

@Injectable({ providedIn: 'root' })
export class BrandKPIService {
	private brandKPISubject: BehaviorSubject<BrandKPI[]>;
	public brandKPI: Observable<BrandKPI[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.brandKPISubject = new BehaviorSubject<BrandKPI[]>([]);
		this.brandKPI = this.brandKPISubject.asObservable();
	}

	public get brandKPIValue(): BrandKPI[] {
		return this.brandKPISubject.value;
	}

	public getAll() {
		return this.http.get<BrandKPI[]>(baseUrl)
				.pipe(map((modelCollection: BrandKPI[]) => {
						// publish updated collection to subscribers
						this.brandKPISubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<BrandKPI>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<BrandKPI>(baseUrl, params)
			.pipe(map((model: BrandKPI) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<BrandKPI>(`${baseUrl}/${id}`, params)
			.pipe(map((model: BrandKPI) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<BrandKPI>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: BrandKPI) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<BrandKPI>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: BrandKPI) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<BrandKPI>(`${baseUrl}/${id}`)
			.pipe(map((model: BrandKPI) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: BrandKPI, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.brandKPIValue !== null ) {
					const updatedObjs:BrandKPI[] = [];
					this.brandKPIValue.map((x: BrandKPI) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.brandKPISubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.brandKPIValue !== null ) {

					const updatedObjs:BrandKPI[] = [];
					this.brandKPIValue.map((x:BrandKPI) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.brandKPISubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.brandKPIValue !== null && deleteId !== undefined ) {

					const updatedObjs:BrandKPI[] = [];
					this.brandKPIValue.map((x:BrandKPI) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.brandKPISubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('brandKPI');

	}
}
