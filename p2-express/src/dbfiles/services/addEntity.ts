
import docClient from '../conn/dynamo'; 

interface EntityDAO {
} 

export function addAnEntity(TableName:string,ourItem:EntityDAO){
    let ourItemFinal = JSON.parse(JSON.stringify(ourItem));
    
let params = {
        TableName:TableName,
        Item: ourItem
    };
        docClient.put(params, function (err, data) {
            if (err) {
                console.log(err); 
                return 400; 
            } else {
               console.log("Operation Completed"); 
               return 200; 
            }
        });
    }
       