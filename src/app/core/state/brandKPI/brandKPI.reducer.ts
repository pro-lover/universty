import { BrandKPIActions, BrandKPIActionTypes } from './brandKPI.actions';
import { featureAdapter, State } from "./brandKPI.state";

const initialState = featureAdapter.getInitialState();

export function brandKPIReducer(
	state = initialState,
	action: BrandKPIActions
): State {

	switch(action.type) {

		case BrandKPIActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case BrandKPIActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case BrandKPIActionTypes.MODEL_LoadedSuccess:

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

		case BrandKPIActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case BrandKPIActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case BrandKPIActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case BrandKPIActionTypes.MODEL_LoadedFailed:
		case BrandKPIActionTypes.MODEL_UpdateFailed:
		case BrandKPIActionTypes.MODEL_UpdateStatusFailed:
		case BrandKPIActionTypes.MODEL_DeleteFailed:
		case BrandKPIActionTypes.MODEL_RestoreFailed:
		case BrandKPIActionTypes.MODEL_CreateFailed:
		case BrandKPIActionTypes.COLLECTION_LOADED_FAILED:

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
