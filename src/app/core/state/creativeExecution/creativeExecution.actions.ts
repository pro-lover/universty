///
import { CreativeExecution } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'CreativeExecution';

export enum CreativeExecutionActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_CREATIVEEXECUTIONS	= '[CreativeExecution API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[CreativeExecution API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[CreativeExecution API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[CreativeExecution API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[CreativeExecution API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[CreativeExecution API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[CreativeExecution API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[CreativeExecution API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[CreativeExecution API] Create Initiated',
	MODEL_CreateSuccess 		= '[CreativeExecution API] Create Success',
	MODEL_CreateFailed 			= '[CreativeExecution API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[CreativeExecution API] Update Initiated',
	MODEL_UpdateSuccess 		= '[CreativeExecution API] Update Success',
	MODEL_UpdateFailed 			= '[CreativeExecution API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[CreativeExecution API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[CreativeExecution API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[CreativeExecution API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[CreativeExecution API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[CreativeExecution API] Delete Success',
	MODEL_DeleteFailed 			= '[CreativeExecution API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[CreativeExecution API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[CreativeExecution API] Restore Success',
	MODEL_RestoreFailed 		= '[CreativeExecution API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = CreativeExecutionActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = CreativeExecutionActionTypes.appComponentInitialized;

}


export class COLLECTION_LOAD_CREATIVEEXECUTIONS implements Action {

	readonly type = CreativeExecutionActionTypes.COLLECTION_LOAD_CREATIVEEXECUTIONS;

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = CreativeExecutionActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: CreativeExecution[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = CreativeExecutionActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = CreativeExecutionActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = CreativeExecutionActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: CreativeExecution }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = CreativeExecutionActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: CreativeExecution }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: CreativeExecution }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: CreativeExecution }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: CreativeExecution }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<CreativeExecution> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: CreativeExecution  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: CreativeExecution }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = CreativeExecutionActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type CreativeExecutionActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_CREATIVEEXECUTIONS
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
