///
import { Brief } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'Brief';

export enum BriefActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_BRIEFS	= '[Brief API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[Brief API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[Brief API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[Brief API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[Brief API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[Brief API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[Brief API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[Brief API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[Brief API] Create Initiated',
	MODEL_CreateSuccess 		= '[Brief API] Create Success',
	MODEL_CreateFailed 			= '[Brief API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[Brief API] Update Initiated',
	MODEL_UpdateSuccess 		= '[Brief API] Update Success',
	MODEL_UpdateFailed 			= '[Brief API] Update Failed',
	// UPDATEBRIEFPROGRESS
	MODEL_UpdateProgressStatusInitiated 		= '[Brief API] Update Progress Initiated',
	MODEL_UpdateProgressStatusSuccess 		= '[Brief API] Update Progress Success',
	MODEL_UpdateProgressStatusFailed 			= '[Brief API] Update Progress Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[Brief API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[Brief API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[Brief API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[Brief API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[Brief API] Delete Success',
	MODEL_DeleteFailed 			= '[Brief API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[Brief API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[Brief API] Restore Success',
	MODEL_RestoreFailed 		= '[Brief API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = BriefActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = BriefActionTypes.appComponentInitialized;

}


export class COLLECTION_LOAD_BRIEFS implements Action {

	readonly type = BriefActionTypes.COLLECTION_LOAD_BRIEFS;

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = BriefActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: Brief[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = BriefActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = BriefActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = BriefActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: Brief }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = BriefActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: Brief }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = BriefActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = BriefActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: Brief }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = BriefActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: Brief }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = BriefActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = BriefActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: Brief }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = BriefActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Brief }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = BriefActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}
export class MODEL_UpdateProgressStatusSuccess implements Action {
	readonly type = BriefActionTypes.MODEL_UpdateProgressStatusSuccess;

	constructor(public payload: { dataItem: Brief }) {}
}

export class MODEL_UpdateProgressStatusFailed implements Action {
	readonly type = BriefActionTypes.MODEL_UpdateProgressStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = BriefActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}
export class MODEL_UpdateProgressStatusInitiated implements Action {
	readonly type = BriefActionTypes.MODEL_UpdateProgressStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = BriefActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: Brief  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = BriefActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = BriefActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = BriefActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = BriefActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = BriefActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = BriefActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: Brief }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = BriefActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type BriefActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_BRIEFS
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
	| MODEL_UpdateProgressStatusInitiated
	| MODEL_UpdateProgressStatusSuccess
	| MODEL_UpdateProgressStatusFailed
	| MODEL_UpdateStatusInitiated
	| MODEL_UpdateStatusSuccess
	| MODEL_UpdateStatusFailed
	| MODEL_DeleteInitiated
	| MODEL_DeleteSuccess
	| MODEL_DeleteFailed
	| MODEL_RestoreInitiated
	| MODEL_RestoreSuccess
	| MODEL_RestoreFailed;
