import { CreativeExecution } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<CreativeExecution> = createEntityAdapter<CreativeExecution>({
	selectId: (model:CreativeExecution) => model.id,
	sortComparer: (a: CreativeExecution, b: CreativeExecution): number =>
		a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<CreativeExecution> {
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
