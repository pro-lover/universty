import { Brief } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<Brief> = createEntityAdapter<Brief>({
	selectId: (model:Brief) => model.id,
	sortComparer: (a: Brief, b: Brief): number =>
		a.offer.toString().localeCompare(b.offer.toString())
});

export interface State extends EntityState<Brief> {
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
