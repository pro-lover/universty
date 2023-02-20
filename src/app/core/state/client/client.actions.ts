///
import { Client } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'Client';

export enum ClientActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_CLIENTS	= '[Client API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[Client API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[Client API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[Client API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[Client API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[Client API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[Client API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[Client API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[Client API] Create Initiated',
	MODEL_CreateSuccess 		= '[Client API] Create Success',
	MODEL_CreateFailed 			= '[Client API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[Client API] Update Initiated',
	MODEL_UpdateSuccess 		= '[Client API] Update Success',
	MODEL_UpdateFailed 			= '[Client API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[Client API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[Client API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[Client API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[Client API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[Client API] Delete Success',
	MODEL_DeleteFailed 			= '[Client API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[Client API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[Client API] Restore Success',
	MODEL_RestoreFailed 		= '[Client API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = ClientActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = ClientActionTypes.appComponentInitialized;

}


export class COLLECTION_LOAD_CLIENTS implements Action {

	readonly type = ClientActionTypes.COLLECTION_LOAD_CLIENTS;

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = ClientActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: Client[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = ClientActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = ClientActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = ClientActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: Client }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = ClientActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: Client }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = ClientActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = ClientActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: Client }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = ClientActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: Client }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = ClientActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = ClientActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: Client }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = ClientActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<Client> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = ClientActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = ClientActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = ClientActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: Client  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = ClientActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = ClientActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = ClientActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = ClientActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = ClientActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = ClientActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: Client }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = ClientActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type ClientActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_CLIENTS
	| COLLECTION_CLEAR_ALL
	| COLLECTION_LOADED_SUCCESS
	| COLLECTION_LOADED_FAILED
	| MODEL_LoadedInitiated
	| MODEL_LoadedSuccess
	| MODEL_LoadedFailed
	| MODEL_CreateInitiated
	| MODEL_CreateSuccess
	| MODEL_CreateFailed
	| MODEL_UpdateInitiated
	| MODEL_UpdateSuccess
	| MODEL_UpdateFailed
	| MODEL_UpdateStatusInitiated
	| MODEL_UpdateStatusSuccess
	| MODEL_UpdateStatusFailed
	| MODEL_DeleteInitiated
	| MODEL_DeleteSuccess
	| MODEL_DeleteFailed
	| MODEL_RestoreInitiated
	| MODEL_RestoreSuccess
	| MODEL_RestoreFailed;
