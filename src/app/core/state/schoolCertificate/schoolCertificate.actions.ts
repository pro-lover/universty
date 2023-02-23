///
import { SchoolCertificate } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'SchoolCertificate';

export enum SchoolCertificateActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_SCHOOLCERTIFICATES	= '[SchoolCertificate API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[SchoolCertificate API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[SchoolCertificate API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[SchoolCertificate API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[SchoolCertificate API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[SchoolCertificate API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[SchoolCertificate API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[SchoolCertificate API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[SchoolCertificate API] Create Initiated',
	MODEL_CreateSuccess 		= '[SchoolCertificate API] Create Success',
	MODEL_CreateFailed 			= '[SchoolCertificate API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[SchoolCertificate API] Update Initiated',
	MODEL_UpdateSuccess 		= '[SchoolCertificate API] Update Success',
	MODEL_UpdateFailed 			= '[SchoolCertificate API] Update Failed',
	// UPDATESCHOOLCERTIFICATEPROGRESS
	MODEL_UpdateProgressStatusInitiated 		= '[SchoolCertificate API] Update Progress Initiated',
	MODEL_UpdateProgressStatusSuccess 		= '[SchoolCertificate API] Update Progress Success',
	MODEL_UpdateProgressStatusFailed 			= '[SchoolCertificate API] Update Progress Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[SchoolCertificate API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[SchoolCertificate API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[SchoolCertificate API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[SchoolCertificate API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[SchoolCertificate API] Delete Success',
	MODEL_DeleteFailed 			= '[SchoolCertificate API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[SchoolCertificate API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[SchoolCertificate API] Restore Success',
	MODEL_RestoreFailed 		= '[SchoolCertificate API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = SchoolCertificateActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = SchoolCertificateActionTypes.appComponentInitialized;

}


export class COLLECTION_LOAD_SCHOOLCERTIFICATES implements Action {

	readonly type = SchoolCertificateActionTypes.COLLECTION_LOAD_SCHOOLCERTIFICATES;

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = SchoolCertificateActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: SchoolCertificate[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = SchoolCertificateActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = SchoolCertificateActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = SchoolCertificateActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: SchoolCertificate }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = SchoolCertificateActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: SchoolCertificate }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: SchoolCertificate }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: SchoolCertificate }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: SchoolCertificate }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: SchoolCertificate }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}
export class MODEL_UpdateProgressStatusSuccess implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_UpdateProgressStatusSuccess;

	constructor(public payload: { dataItem: SchoolCertificate }) {}
}

export class MODEL_UpdateProgressStatusFailed implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_UpdateProgressStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}
export class MODEL_UpdateProgressStatusInitiated implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_UpdateProgressStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: SchoolCertificate  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: SchoolCertificate }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = SchoolCertificateActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type SchoolCertificateActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_SCHOOLCERTIFICATES
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
