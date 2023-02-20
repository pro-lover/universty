import { BriefPhaseActions, BriefPhaseActionTypes } from './briefPhase.actions';
import { featureAdapter, State } from "./briefPhase.state";

const initialState = featureAdapter.getInitialState();

export function briefPhaseReducer(
	state = initialState,
	action: BriefPhaseActions
): State {

	switch(action.type) {

		case BriefPhaseActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case BriefPhaseActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case BriefPhaseActionTypes.MODEL_LoadedSuccess:

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

		case BriefPhaseActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case BriefPhaseActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case BriefPhaseActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case BriefPhaseActionTypes.MODEL_LoadedFailed:
		case BriefPhaseActionTypes.MODEL_UpdateFailed:
		case BriefPhaseActionTypes.MODEL_UpdateStatusFailed:
		case BriefPhaseActionTypes.MODEL_DeleteFailed:
		case BriefPhaseActionTypes.MODEL_RestoreFailed:
		case BriefPhaseActionTypes.MODEL_CreateFailed:
		case BriefPhaseActionTypes.COLLECTION_LOADED_FAILED:

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
