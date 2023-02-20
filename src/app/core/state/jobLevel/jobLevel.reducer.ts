import { JobLevelActions, JobLevelActionTypes } from './jobLevel.actions';
import { featureAdapter, State } from "./jobLevel.state";

const initialState = featureAdapter.getInitialState();

export function jobLevelReducer(
	state = initialState,
	action: JobLevelActions
): State {

	switch(action.type) {

		case JobLevelActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case JobLevelActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case JobLevelActionTypes.MODEL_LoadedSuccess:

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

		case JobLevelActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case JobLevelActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case JobLevelActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case JobLevelActionTypes.MODEL_LoadedFailed:
		case JobLevelActionTypes.MODEL_UpdateFailed:
		case JobLevelActionTypes.MODEL_UpdateStatusFailed:
		case JobLevelActionTypes.MODEL_DeleteFailed:
		case JobLevelActionTypes.MODEL_RestoreFailed:
		case JobLevelActionTypes.MODEL_CreateFailed:
		case JobLevelActionTypes.COLLECTION_LOADED_FAILED:

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
