import { JobLevel } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<JobLevel> = createEntityAdapter<JobLevel>({
	selectId: (model:JobLevel) => model.id,
	sortComparer: (a: JobLevel, b: JobLevel): number =>
		a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<JobLevel> {
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
