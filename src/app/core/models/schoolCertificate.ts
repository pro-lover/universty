import { Time } from "@angular/common";
import { BriefProgress } from "./briefProgress";

export class SchoolCertificate {
	id!: string;
	name!: string;
	description!: string;
	level!: string;
	percentage!: string;
	creativeexecutionId!: number;
	briefphaseId!: number;
	clientId!: number;
	teams!:any[];
	subjects!:any[];
	role!: string;
	creativeexecution!: any[];
	client!: any[];
	briefphase!: any[];
	status!: boolean;
	created!: string;
	updated!: string;
	deletedAt!: string;
	version!: number;
	history!: any[];
	lastEditedBy!: number;
}
