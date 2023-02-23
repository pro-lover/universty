import { SchoolCertificateActions, SchoolCertificateActionTypes } from './schoolCertificate.actions';
import { featureAdapter, State } from "./schoolCertificate.state";

const initialState = featureAdapter.getInitialState();

export function schoolCertificateReducer(
	state = initialState,
	action: SchoolCertificateActions
): State {

	switch(action.type) {

		case SchoolCertificateActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case SchoolCertificateActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case SchoolCertificateActionTypes.MODEL_LoadedSuccess:

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

		case SchoolCertificateActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case SchoolCertificateActionTypes.MODEL_UpdateSuccess:
		case SchoolCertificateActionTypes.MODEL_UpdateProgressStatusSuccess:
			return featureAdapter.setOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case SchoolCertificateActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case SchoolCertificateActionTypes.MODEL_LoadedFailed:
		case SchoolCertificateActionTypes.MODEL_UpdateFailed:
		case SchoolCertificateActionTypes.MODEL_UpdateProgressStatusFailed:
		case SchoolCertificateActionTypes.MODEL_UpdateStatusFailed:
		case SchoolCertificateActionTypes.MODEL_DeleteFailed:
		case SchoolCertificateActionTypes.MODEL_RestoreFailed:
		case SchoolCertificateActionTypes.MODEL_CreateFailed:
		case SchoolCertificateActionTypes.COLLECTION_LOADED_FAILED:

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
