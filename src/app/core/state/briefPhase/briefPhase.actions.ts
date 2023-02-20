///
import { BriefPhase } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'BriefPhase';

export enum BriefPhaseActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_BRIEFPHASES	= '[BriefPhase API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[BriefPhase API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[BriefPhase API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[BriefPhase API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[BriefPhase API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[BriefPhase API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[BriefPhase API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[BriefPhase API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[BriefPhase API] Create Initiated',
	MODEL_CreateSuccess 		= '[BriefPhase API] Create Success',
	MODEL_CreateFailed 			= '[BriefPhase API] Create Failed',
	// asign creative team
	// delete creative team
	
	// delete creative team
	// delete creative team
	// UPDATE
	MODEL_UpdateInitiated 		= '[BriefPhase API] Update Initiated',
	MODEL_UpdateSuccess 		= '[BriefPhase API] Update Success',
	MODEL_UpdateFailed 			= '[BriefPhase API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[BriefPhase API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[BriefPhase API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[BriefPhase API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[BriefPhase API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[BriefPhase API] Delete Success',
	MODEL_DeleteFailed 			= '[BriefPhase API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[BriefPhase API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[BriefPhase API] Restore Success',
	MODEL_RestoreFailed 		= '[BriefPhase API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = BriefPhaseActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = BriefPhaseActionTypes.appComponentInitialized;

}


export class COLLECTION_LOAD_BRIEFPHASES implements Action {

	readonly type = BriefPhaseActionTypes.COLLECTION_LOAD_BRIEFPHASES;

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = BriefPhaseActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: BriefPhase[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = BriefPhaseActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = BriefPhaseActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = BriefPhaseActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: BriefPhase }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = BriefPhaseActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: BriefPhase }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: BriefPhase }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: BriefPhase }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: BriefPhase }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<BriefPhase> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: BriefPhase  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: BriefPhase }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = BriefPhaseActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type BriefPhaseActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_BRIEFPHASES
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
