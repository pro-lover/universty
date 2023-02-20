import { BriefActions, BriefActionTypes } from './brief.actions';
import { featureAdapter, State } from "./brief.state";

const initialState = featureAdapter.getInitialState();

export function briefReducer(
	state = initialState,
	action: BriefActions
): State {

	switch(action.type) {

		case BriefActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case BriefActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case BriefActionTypes.MODEL_LoadedSuccess:

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

		case BriefActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case BriefActionTypes.MODEL_UpdateSuccess:
		case BriefActionTypes.MODEL_UpdateProgressStatusSuccess:
			return featureAdapter.setOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case BriefActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case BriefActionTypes.MODEL_LoadedFailed:
		case BriefActionTypes.MODEL_UpdateFailed:
		case BriefActionTypes.MODEL_UpdateProgressStatusFailed:
		case BriefActionTypes.MODEL_UpdateStatusFailed:
		case BriefActionTypes.MODEL_DeleteFailed:
		case BriefActionTypes.MODEL_RestoreFailed:
		case BriefActionTypes.MODEL_CreateFailed:
		case BriefActionTypes.COLLECTION_LOADED_FAILED:

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
