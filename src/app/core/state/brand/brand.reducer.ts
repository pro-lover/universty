import { BrandActions, BrandActionTypes } from './brand.actions';
import { featureAdapter, State } from "./brand.state";

const initialState = featureAdapter.getInitialState();

export function brandReducer(
	state = initialState,
	action: BrandActions
): State {

	switch(action.type) {

		case BrandActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case BrandActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case BrandActionTypes.MODEL_LoadedSuccess:

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

		case BrandActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case BrandActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case BrandActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case BrandActionTypes.MODEL_LoadedFailed:
		case BrandActionTypes.MODEL_UpdateFailed:
		case BrandActionTypes.MODEL_UpdateStatusFailed:
		case BrandActionTypes.MODEL_DeleteFailed:
		case BrandActionTypes.MODEL_RestoreFailed:
		case BrandActionTypes.MODEL_CreateFailed:
		case BrandActionTypes.COLLECTION_LOADED_FAILED:

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
