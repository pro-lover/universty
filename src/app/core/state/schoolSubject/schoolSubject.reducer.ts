import { SchoolSubjectActions, SchoolSubjectActionTypes } from './schoolSubject.actions';
import { featureAdapter, State } from "./schoolSubject.state";

const initialState = featureAdapter.getInitialState();

export function SchoolSubjectReducer(
	state = initialState,
	action: SchoolSubjectActions
): State {

	switch(action.type) {

		case SchoolSubjectActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case SchoolSubjectActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case SchoolSubjectActionTypes.MODEL_LoadedSuccess:

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

		case SchoolSubjectActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case SchoolSubjectActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case SchoolSubjectActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case SchoolSubjectActionTypes.MODEL_LoadedFailed:
		case SchoolSubjectActionTypes.MODEL_UpdateFailed:
		case SchoolSubjectActionTypes.MODEL_UpdateStatusFailed:
		case SchoolSubjectActionTypes.MODEL_DeleteFailed:
		case SchoolSubjectActionTypes.MODEL_RestoreFailed:
		case SchoolSubjectActionTypes.MODEL_CreateFailed:
		case SchoolSubjectActionTypes.COLLECTION_LOADED_FAILED:

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
