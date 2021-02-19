import { pool, client, quit } from '../pgConn/pgConn';

class ThreadService {


  insert_thread(category: string, title: string, description: string, username: string) {
    //pool.connect();
    pool.query('call insert_thread($1::text,$2::text,$3::text,$4::text)', [category, title, description, username], () => {
      pool.end();
    });
  }

  async getThreads(): Promise<any> {
    //pool.connect() //pool.connect returns a promise with a client in it
    let ret;
    await pool.query('select * from threads').then((data: any) => {
      if(data) {
        ret = data.rows;
      }
      // pool.end();
    });

    return ret;
  }
}

export default ThreadService;