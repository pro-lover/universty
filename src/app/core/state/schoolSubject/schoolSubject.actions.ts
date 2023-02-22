///
import { SchoolSubject } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'SchoolSubject';

export enum SchoolSubjectActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_SCHOOLSUBJECTS	= '[SchoolSubject API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[SchoolSubject API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[SchoolSubject API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[SchoolSubject API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[SchoolSubject API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[SchoolSubject API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[SchoolSubject API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[SchoolSubject API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[SchoolSubject API] Create Initiated',
	MODEL_CreateSuccess 		= '[SchoolSubject API] Create Success',
	MODEL_CreateFailed 			= '[SchoolSubject API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[SchoolSubject API] Update Initiated',
	MODEL_UpdateSuccess 		= '[SchoolSubject API] Update Success',
	MODEL_UpdateFailed 			= '[SchoolSubject API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[SchoolSubject API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[SchoolSubject API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[SchoolSubject API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[SchoolSubject API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[SchoolSubject API] Delete Success',
	MODEL_DeleteFailed 			= '[SchoolSubject API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[SchoolSubject API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[SchoolSubject API] Restore Success',
	MODEL_RestoreFailed 		= '[SchoolSubject API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = SchoolSubjectActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = SchoolSubjectActionTypes.appComponentInitialized;

}


export class COLLECTION_LOAD_SCHOOLSUBJECTS implements Action {

	readonly type = SchoolSubjectActionTypes.COLLECTION_LOAD_SCHOOLSUBJECTS;

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = SchoolSubjectActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: SchoolSubject[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = SchoolSubjectActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = SchoolSubjectActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = SchoolSubjectActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: SchoolSubject }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = SchoolSubjectActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: SchoolSubject }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: SchoolSubject }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: SchoolSubject }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: SchoolSubject }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<SchoolSubject> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: SchoolSubject  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: SchoolSubject }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = SchoolSubjectActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type SchoolSubjectActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_SCHOOLSUBJECTS
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
