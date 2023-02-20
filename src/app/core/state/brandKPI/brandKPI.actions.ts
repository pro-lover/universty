///
import { BrandKPI } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'BrandKPI';

export enum BrandKPIActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_BRANDKPIS	= '[BrandKPI API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[BrandKPI API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[BrandKPI API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[BrandKPI API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[BrandKPI API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[BrandKPI API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[BrandKPI API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[BrandKPI API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[BrandKPI API] Create Initiated',
	MODEL_CreateSuccess 		= '[BrandKPI API] Create Success',
	MODEL_CreateFailed 			= '[BrandKPI API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[BrandKPI API] Update Initiated',
	MODEL_UpdateSuccess 		= '[BrandKPI API] Update Success',
	MODEL_UpdateFailed 			= '[BrandKPI API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[BrandKPI API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[BrandKPI API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[BrandKPI API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[BrandKPI API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[BrandKPI API] Delete Success',
	MODEL_DeleteFailed 			= '[BrandKPI API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[BrandKPI API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[BrandKPI API] Restore Success',
	MODEL_RestoreFailed 		= '[BrandKPI API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = BrandKPIActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = BrandKPIActionTypes.appComponentInitialized;

}


export class COLLECTION_LOAD_BRANDKPIS implements Action {

	readonly type = BrandKPIActionTypes.COLLECTION_LOAD_BRANDKPIS;

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = BrandKPIActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: BrandKPI[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = BrandKPIActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = BrandKPIActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = BrandKPIActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: BrandKPI }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = BrandKPIActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: BrandKPI }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = BrandKPIActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = BrandKPIActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: BrandKPI }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = BrandKPIActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: BrandKPI }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = BrandKPIActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = BrandKPIActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: BrandKPI }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = BrandKPIActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<BrandKPI> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = BrandKPIActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = BrandKPIActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = BrandKPIActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: BrandKPI  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = BrandKPIActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = BrandKPIActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = BrandKPIActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = BrandKPIActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = BrandKPIActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = BrandKPIActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: BrandKPI }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = BrandKPIActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type BrandKPIActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_BRANDKPIS
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
