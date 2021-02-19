import {Pool} from 'pg'; 

exports.handler = async (event:any,context:any,callback:any)=>{


let response = 0;



    
let myConn = new Object({
    user: 'postgres',
    host: 'simple-reactit.cfkb1yia7rp.us-west-2.rds.amazonaws.com', 
    database: 'simplereactit',
    password: 'not available',
    port: 5432,
  }); 

let category = 'lambda';
let title ='lambda44';
let description = 'Jeannine\'s Thread is Ready' ;
let username = 'salman'; 

// 
let pool = new Pool(myConn); 
return await pool.query('call insert_thread($1::text,$2::text,$3::text,$4::text)', [category, title, description, username]).then((data)=>{
  pool.end();
  return {
    'statusCode': 200,
    'headers': { 'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"            
    },
    'body': JSON.stringify(data), 
  } 
}); 
};