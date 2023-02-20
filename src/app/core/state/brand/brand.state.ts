import { Brand } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<Brand> = createEntityAdapter<Brand>({
	selectId: (model:Brand) => model.id,
	sortComparer: (a: Brand, b: Brand): number =>
		a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<Brand> {
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
