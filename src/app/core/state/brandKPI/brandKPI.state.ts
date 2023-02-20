import { BrandKPI } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<BrandKPI> = createEntityAdapter<BrandKPI>({
	selectId: (model:BrandKPI) => model.id,
	sortComparer: (a: BrandKPI, b: BrandKPI): number =>
		a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<BrandKPI> {
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
