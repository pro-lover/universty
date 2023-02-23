import { SchoolCertificate } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<SchoolCertificate> = createEntityAdapter<SchoolCertificate>({
	selectId: (model:SchoolCertificate) => model.id,
	sortComparer: (a: SchoolCertificate, b: SchoolCertificate): number =>
		a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<SchoolCertificate> {
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
