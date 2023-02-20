import { Team } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<Team> = createEntityAdapter<Team>({
	selectId: (model:Team) => model.id,
	sortComparer: (a: Team, b: Team): number =>
		a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<Team> {
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
