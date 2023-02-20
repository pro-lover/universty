import { Creative } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<Creative> = createEntityAdapter<Creative>({
	selectId: (model:Creative) => model.id,
	sortComparer: (a: Creative, b: Creative): number =>
		a.description.toString().localeCompare(b.description.toString())
});

export interface State extends EntityState<Creative> {
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
