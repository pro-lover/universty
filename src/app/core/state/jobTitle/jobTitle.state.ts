import { JobTitle } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<JobTitle> = createEntityAdapter<JobTitle>({
	selectId: (model:JobTitle) => model.id,
	sortComparer: (a: JobTitle, b: JobTitle): number =>
		a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<JobTitle> {
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
