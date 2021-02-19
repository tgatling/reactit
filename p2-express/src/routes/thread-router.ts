import express from 'express'
import ThreadService from '../pg/pgFunctions/selectFunction';

var router = express.Router();
var testservice = new ThreadService();

/* GET users listing. */
router.get('/', async function(req, res, next) {
   console.log("Inside get Thread: " + req);
   await testservice.getThreads().then((data) => {
      console.log(data);
      res.send(data);
   });
});

router.post('/newThread', function(req, res, next){
   console.log(req.query);
   testservice.insert_thread('','','','');
   console.log('Inserted thread');
   res.send('insert');
});
export default router;