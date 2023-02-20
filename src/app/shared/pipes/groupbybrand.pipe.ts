import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'groupByBrand'
})
export class GroupByBrandPipe implements PipeTransform {

	transform( data:any[], key: string, value: number ,branddata:any[], clients:any): string {

		//console.log('groupByBrand:',value, key, data);
		let brandName = "empt";
		let clientsBrand = 0;
        for ( let i = data.length - 1; i >= 0; i-- ) {
			if(data[i][key] === undefined){
				for(let x = 0; x<clients.length;x++)
				{
					if(data[i].clientId ===  clients[x].id)
					{
						clientsBrand = clients[x].brandId;
					}
					
				}
				if( clientsBrand === value ) {
					for( let x = 0;x<branddata.length;x++){
						if(branddata[x].id === value)
						{
							brandName = branddata[x].name;
						}
					}
					
				}
			}else{
				if(  data[i][key].brandId === value ) {
					for( let x = 0;x<branddata.length;x++){
						if(branddata[x].id === value)
						{
							brandName = branddata[x].name;
						}
					}
					
				}
			}
        }

        return brandName;
	}

}
