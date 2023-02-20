import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '@app/core/models';
import { Observable } from 'rxjs';

@Pipe({
    name: 'sumByKey'
})
export class SumByKeyPipe implements PipeTransform {
	public dataView$!: Observable<Client[]>;

	transform( data:any[], key: string, value: string, brandId: number , clients:any): number {
		
		//console.log('sumByKey:',data,brandId);
		let sum = 0;
		let clientsBrand = 0;
		
			for ( let i = data.length - 1; i >= 0; i-- ) {
				if(key === "role")
				{
					if(data[i].client === undefined){
						for(let x = 0; x<clients.length;x++)
						{
							if(data[i].clientId ===  clients[x].id)
							{
								clientsBrand = clients[x].brandId;
							}
							
						}
						if( clientsBrand === brandId ) { sum =this.getSum(data , i , key , value ,sum );}
					}else{
						if(  data[i].client.brandId === brandId ) {sum = this.getSum(data , i , key , value ,sum );}	
					}
				}
				if(key === "totSum"){
					if(  data[i].client.brandId === brandId ) {	
						sum = sum + 1;
					}
				}
		}
        return sum;
	}

	public getSum(data:any , i:any , key:any , value:any ,sum:any )
	{
		if(  data[i][key] === value ) {
		
			sum = sum + 1;
		}
		return sum;
	}
}
