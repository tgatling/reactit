import express from 'express'
import ThreadService from '../pg/pgFunctions/selectFunction';
import TagService from '../threads/tagservice';
import { Thread } from '../threads/thread';

var router = express.Router();
var tagservice = new TagService();

router.post('/', function(req, res, next){
   console.log(req.body);
   tagservice.insert_tag(req.body);
});
export default router;