import { BriefPhase } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<BriefPhase> = createEntityAdapter<BriefPhase>({
	selectId: (model:BriefPhase) => model.id,
	sortComparer: (a: BriefPhase, b: BriefPhase): number =>
		a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<BriefPhase> {
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
