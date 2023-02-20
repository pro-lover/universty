import { Pipe, PipeTransform } from '@angular/core';
import { Brief} from '@app/core/models';

@Pipe({
    name: 'idByKey'
})
export class IdByKeyPipe implements PipeTransform {
    public dataView!: any;
  
	transform( data:Brief[] | null , key: string, value: number, brandId: number, clients:any): number {
        let sum = 0;
		this.dataView = data;
        let clientsBrand = 0;
        if(this.dataView[value].client === undefined){
            for(let x = 0; x<clients.length;x++)
				{
					if(this.dataView[value].clientId ===  clients[x].id)
					{
						clientsBrand = clients[x].brandId;
					}
					
				}
            
                sum = clientsBrand
        }else{
            sum = this.dataView[value].client.brandId
        }
        
        return sum;
	}

}
