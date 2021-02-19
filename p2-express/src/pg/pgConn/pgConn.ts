import dotenv from 'dotenv';
dotenv.config({path:'../../../.env'});
import {Pool, Client} from 'pg';
let myConn = new Object({
    user: process.env.PGUSER,
    host: process.env.PGHOST, 
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
  }); 

  export const pool = new Pool(myConn); 
  export const client = new Client(myConn);
  export function quit() {
    // The app is closing, shut down the connections.
    pool.end();
    process.exit();
}