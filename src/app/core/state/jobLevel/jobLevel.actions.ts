///
import { JobLevel } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'JobLevel';

export enum JobLevelActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_JOBLEVELS	= '[JobLevel API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[JobLevel API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[JobLevel API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[JobLevel API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[JobLevel API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[JobLevel API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[JobLevel API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[JobLevel API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[JobLevel API] Create Initiated',
	MODEL_CreateSuccess 		= '[JobLevel API] Create Success',
	MODEL_CreateFailed 			= '[JobLevel API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[JobLevel API] Update Initiated',
	MODEL_UpdateSuccess 		= '[JobLevel API] Update Success',
	MODEL_UpdateFailed 			= '[JobLevel API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[JobLevel API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[JobLevel API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[JobLevel API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[JobLevel API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[JobLevel API] Delete Success',
	MODEL_DeleteFailed 			= '[JobLevel API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[JobLevel API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[JobLevel API] Restore Success',
	MODEL_RestoreFailed 		= '[JobLevel API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = JobLevelActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = JobLevelActionTypes.appComponentInitialized;

}


export class COLLECTION_LOAD_JOBLEVELS implements Action {

	readonly type = JobLevelActionTypes.COLLECTION_LOAD_JOBLEVELS

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = JobLevelActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: JobLevel[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = JobLevelActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = JobLevelActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = JobLevelActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: JobLevel }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = JobLevelActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: JobLevel }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = JobLevelActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = JobLevelActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: JobLevel }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = JobLevelActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: JobLevel }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = JobLevelActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = JobLevelActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: JobLevel }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = JobLevelActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<JobLevel> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = JobLevelActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = JobLevelActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = JobLevelActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: JobLevel  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = JobLevelActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = JobLevelActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = JobLevelActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = JobLevelActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = JobLevelActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = JobLevelActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: JobLevel }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = JobLevelActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type JobLevelActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_JOBLEVELS
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
