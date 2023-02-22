import { SchoolSubject } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<SchoolSubject> = createEntityAdapter<SchoolSubject>({
	selectId: (model:SchoolSubject) => model.id,
	sortComparer: (a: SchoolSubject, b: SchoolSubject): number =>
		a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<SchoolSubject> {
	//collection: model[];
	//selectedItem: model | null;
	collectionLoaded?: boolean;
	isLoading?: boolean;
	error?: any;
}

export const initialState: State = featureAdapter.getInitialState(
	{
		//collection: [],
		//selectedItem: null,
		collectionLoaded: false,
		isLoading: false,
		error: null
	}
);
