import { Time } from "@angular/common";
import { BriefProgress } from "./briefProgress";

export class Brief {
	id!: string;
	offer!: string;
	objective!: string;
	business!: string;
	targetAudience!: string;
	targetAudienceInsight!: string;
	targetAudienceOuttake!: string;
	singleMindedThought!: string;
	brandTone!: string;
	budget!: number;
	deadlineDate!:string;
	deadlineTime!:string;
	creativeexecutionId!: number;
	briefphaseId!: number;
	clientId!: number;
	teams!:any[];
	brandKPIs!:any[];
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
