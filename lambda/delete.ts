import {Pool} from 'pg'; 

exports.handler = async (event:any)=>{

    
let myConn = new Object({
    user: 'postgres',
    host: 'simple-reactit.cfkb1yia7rp.us-west-2.rds.amazonaws.com', 
    database: 'simplereactit',
    password: 'excluded',
    port: 5432,
  }); 
 
let thread_id = 0;
let retres;

// 
let pool = new Pool(myConn); 
await pool.query('call delete_thread($1::integer)', [thread_id]).then((response)=>{retres = response});
pool.end(); 

  return {
    'statusCode': 200,
    'headers': { 'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"            
    },
    'body': JSON.stringify(retres),
}

 

}