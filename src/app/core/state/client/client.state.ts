import { Client } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<Client> = createEntityAdapter<Client>({
	selectId: (model:Client) => model.id,
	sortComparer: (a: Client, b: Client): number =>
		a.description.toString().localeCompare(b.description.toString())
});

export interface State extends EntityState<Client> {
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
