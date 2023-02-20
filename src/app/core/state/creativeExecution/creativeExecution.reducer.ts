import { CreativeExecutionActions, CreativeExecutionActionTypes } from './creativeExecution.actions';
import { featureAdapter, State } from "./creativeExecution.state";

const initialState = featureAdapter.getInitialState();

export function creativeExecutionReducer(
	state = initialState,
	action: CreativeExecutionActions
): State {

	switch(action.type) {

		case CreativeExecutionActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case CreativeExecutionActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case CreativeExecutionActionTypes.MODEL_LoadedSuccess:

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

		case CreativeExecutionActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case CreativeExecutionActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case CreativeExecutionActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case CreativeExecutionActionTypes.MODEL_LoadedFailed:
		case CreativeExecutionActionTypes.MODEL_UpdateFailed:
		case CreativeExecutionActionTypes.MODEL_UpdateStatusFailed:
		case CreativeExecutionActionTypes.MODEL_DeleteFailed:
		case CreativeExecutionActionTypes.MODEL_RestoreFailed:
		case CreativeExecutionActionTypes.MODEL_CreateFailed:
		case CreativeExecutionActionTypes.COLLECTION_LOADED_FAILED:

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
