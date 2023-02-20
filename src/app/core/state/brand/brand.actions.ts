///
import { Brand } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'Brand';

export enum BrandActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_BRANDS	= '[Brand API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[Brand API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[Brand API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[Brand API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[Brand API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[Brand API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[Brand API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[Brand API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[Brand API] Create Initiated',
	MODEL_CreateSuccess 		= '[Brand API] Create Success',
	MODEL_CreateFailed 			= '[Brand API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[Brand API] Update Initiated',
	MODEL_UpdateSuccess 		= '[Brand API] Update Success',
	MODEL_UpdateFailed 			= '[Brand API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[Brand API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[Brand API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[Brand API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[Brand API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[Brand API] Delete Success',
	MODEL_DeleteFailed 			= '[Brand API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[Brand API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[Brand API] Restore Success',
	MODEL_RestoreFailed 		= '[Brand API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = BrandActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = BrandActionTypes.appComponentInitialized;

}


export class COLLECTION_LOAD_BRANDS implements Action {

	readonly type = BrandActionTypes.COLLECTION_LOAD_BRANDS;

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = BrandActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: Brand[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = BrandActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = BrandActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = BrandActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: Brand }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = BrandActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: Brand }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = BrandActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = BrandActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: Brand }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = BrandActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: Brand }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = BrandActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = BrandActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: Brand }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = BrandActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<Brand> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = BrandActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = BrandActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = BrandActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: Brand  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = BrandActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = BrandActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = BrandActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = BrandActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = BrandActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = BrandActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: Brand }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = BrandActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type BrandActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_BRANDS
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
