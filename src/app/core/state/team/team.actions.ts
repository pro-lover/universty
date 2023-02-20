///
import { Team } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'Team';

export enum TeamActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_TEAMS	= '[Team API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[Team API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[Team API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[Team API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[Team API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[Team API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[Team API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[Team API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[Team API] Create Initiated',
	MODEL_CreateSuccess 		= '[Team API] Create Success',
	MODEL_CreateFailed 			= '[Team API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[Team API] Update Initiated',
	MODEL_UpdateSuccess 		= '[Team API] Update Success',
	MODEL_UpdateFailed 			= '[Team API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[Team API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[Team API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[Team API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[Team API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[Team API] Delete Success',
	MODEL_DeleteFailed 			= '[Team API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[Team API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[Team API] Restore Success',
	MODEL_RestoreFailed 		= '[Team API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = TeamActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = TeamActionTypes.appComponentInitialized;

}


export class COLLECTION_LOAD_TEAMS implements Action {

	readonly type = TeamActionTypes.COLLECTION_LOAD_TEAMS

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = TeamActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: Team[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = TeamActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = TeamActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = TeamActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: Team }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = TeamActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: Team }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = TeamActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = TeamActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: Team }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = TeamActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: Team }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = TeamActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = TeamActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: Team }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = TeamActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<Team> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = TeamActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = TeamActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = TeamActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: Team  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = TeamActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = TeamActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = TeamActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = TeamActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = TeamActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = TeamActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: Team }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = TeamActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type TeamActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_TEAMS
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
