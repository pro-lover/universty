import { JobTitleActions, JobTitleActionTypes } from './jobTitle.actions';
import { featureAdapter, State } from "./jobTitle.state";

const initialState = featureAdapter.getInitialState();

export function jobTitleReducer(
	state = initialState,
	action: JobTitleActions
): State {

	switch(action.type) {

		case JobTitleActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case JobTitleActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case JobTitleActionTypes.MODEL_LoadedSuccess:

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

		case JobTitleActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case JobTitleActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case JobTitleActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case JobTitleActionTypes.MODEL_LoadedFailed:
		case JobTitleActionTypes.MODEL_UpdateFailed:
		case JobTitleActionTypes.MODEL_UpdateStatusFailed:
		case JobTitleActionTypes.MODEL_DeleteFailed:
		case JobTitleActionTypes.MODEL_RestoreFailed:
		case JobTitleActionTypes.MODEL_CreateFailed:
		case JobTitleActionTypes.COLLECTION_LOADED_FAILED:

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
