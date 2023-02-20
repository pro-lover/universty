///
import { Creative } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'Creative';

export enum CreativeActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_CREATIVES	= '[Creative API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[Creative API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[Creative API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[Creative API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[Creative API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[Creative API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[Creative API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[Creative API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[Creative API] Create Initiated',
	MODEL_CreateSuccess 		= '[Creative API] Create Success',
	MODEL_CreateFailed 			= '[Creative API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[Creative API] Update Initiated',
	MODEL_UpdateSuccess 		= '[Creative API] Update Success',
	MODEL_UpdateFailed 			= '[Creative API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[Creative API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[Creative API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[Creative API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[Creative API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[Creative API] Delete Success',
	MODEL_DeleteFailed 			= '[Creative API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[Creative API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[Creative API] Restore Success',
	MODEL_RestoreFailed 		= '[Creative API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = CreativeActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = CreativeActionTypes.appComponentInitialized;

}


export class COLLECTION_LOAD_CREATIVES implements Action {

	readonly type = CreativeActionTypes.COLLECTION_LOAD_CREATIVES;

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = CreativeActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: Creative[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = CreativeActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = CreativeActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = CreativeActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: Creative }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = CreativeActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: Creative }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = CreativeActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = CreativeActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: Creative }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = CreativeActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: Creative }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = CreativeActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = CreativeActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: Creative }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = CreativeActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<Creative> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = CreativeActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = CreativeActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = CreativeActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: Creative  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = CreativeActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = CreativeActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = CreativeActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = CreativeActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = CreativeActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = CreativeActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: Creative }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = CreativeActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type CreativeActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_CREATIVES
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
