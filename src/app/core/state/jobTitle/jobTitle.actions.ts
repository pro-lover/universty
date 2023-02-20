///
import { JobTitle } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'JobTitle';

export enum JobTitleActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_JOBTITLES	= '[JobTitle API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[JobTitle API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[JobTitle API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[JobTitle API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[JobTitle API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[JobTitle API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[JobTitle API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[JobTitle API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[JobTitle API] Create Initiated',
	MODEL_CreateSuccess 		= '[JobTitle API] Create Success',
	MODEL_CreateFailed 			= '[JobTitle API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[JobTitle API] Update Initiated',
	MODEL_UpdateSuccess 		= '[JobTitle API] Update Success',
	MODEL_UpdateFailed 			= '[JobTitle API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[JobTitle API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[JobTitle API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[JobTitle API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[JobTitle API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[JobTitle API] Delete Success',
	MODEL_DeleteFailed 			= '[JobTitle API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[JobTitle API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[JobTitle API] Restore Success',
	MODEL_RestoreFailed 		= '[JobTitle API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = JobTitleActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = JobTitleActionTypes.appComponentInitialized;

}


export class COLLECTION_LOAD_JOBTITLES implements Action {

	readonly type = JobTitleActionTypes.COLLECTION_LOAD_JOBTITLES

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = JobTitleActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: JobTitle[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = JobTitleActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = JobTitleActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = JobTitleActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: JobTitle }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = JobTitleActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: JobTitle }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = JobTitleActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = JobTitleActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: JobTitle }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = JobTitleActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: JobTitle }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = JobTitleActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = JobTitleActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: JobTitle }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = JobTitleActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<JobTitle> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = JobTitleActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = JobTitleActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = JobTitleActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: JobTitle  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = JobTitleActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = JobTitleActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = JobTitleActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = JobTitleActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = JobTitleActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = JobTitleActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: JobTitle }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = JobTitleActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type JobTitleActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_JOBTITLES
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
