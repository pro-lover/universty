import { ClientActions, ClientActionTypes } from './client.actions';
import { featureAdapter, State } from "./client.state";

const initialState = featureAdapter.getInitialState();

export function clientReducer(
	state = initialState,
	action: ClientActions
): State {

	switch(action.type) {

		case ClientActionTypes.COLLECTION_LOADED_SUCCESS:

			return featureAdapter.setAll(
				action.payload.collection,
				{...state,
					//collection: [],
					//selectedItem: null,
					isLoading: false,
					error: null,
					collectionLoaded:true
				}
			);

		case ClientActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case ClientActionTypes.MODEL_LoadedSuccess:

			//console.warn('action.type:', action.type);

			return featureAdapter.addOne(
				action.payload.dataItem,
				{
					...state,
					//collection: [],
					//selectedItem: null,
					isLoading: false,
					collectionLoaded:true,
					error: null
				  }
			);

		case ClientActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case ClientActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case ClientActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case ClientActionTypes.MODEL_LoadedFailed:
		case ClientActionTypes.MODEL_UpdateFailed:
		case ClientActionTypes.MODEL_UpdateStatusFailed:
		case ClientActionTypes.MODEL_DeleteFailed:
		case ClientActionTypes.MODEL_RestoreFailed:
		case ClientActionTypes.MODEL_CreateFailed:
		case ClientActionTypes.COLLECTION_LOADED_FAILED:

			console.error('FAILED REDUCER:', action.type, featureAdapter);

			return state;

		default: {

			//console.warn('DEFAULT REDUCER:', action.type, featureAdapter);

			return state;

			return {
				...state,
				//collection: [],
				//selectedItem: null,
				collectionLoaded:true,
				isLoading: false,
				error: null
			};
		}

	}
}

export const {
selectAll,
selectEntities,
selectIds,
selectTotal

} = featureAdapter.getSelectors();
