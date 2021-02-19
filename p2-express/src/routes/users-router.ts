import express from 'express'
import userservice from '../dbfiles/services/user.service'
import * as user from '../user/user';

var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('express is working');
});

router.get('/:username', function(req, res, next) {
  console.log('Back-end for Get User')
  userservice.getUserByName(req.params.username).then((returnedUser)=>{
      res.send(JSON.stringify(returnedUser));
  }).catch((err) => {
    res.sendStatus(404);
})
})

/* GET users listing. */
router.post('/:username', function(req, res, next) {
  userservice.addUser(req.body).then((result) => {
    console.log(result);
    console.log("Registered!");
  }).catch((err) => {
    console.log(err);
    console.log("NotRegistered!");
  })
});

router.post('/', function(req, res, next) {
  console.log("Getting user on login!");
  userservice.getUserByName(req.body.username).then((returnedUser)=>{
    console.log(returnedUser?.password);
    console.log(req.body.password);
    if(returnedUser && returnedUser.password === req.body.password){
      res.send(JSON.stringify(returnedUser));
    }
    else{
      res.send("404"); 
    }
  });
});

router.put('/', (req, res, next) => {
  userservice.updateUser(req.body).then((data)=> {
      res.send(data);
  })
})

router.delete('/:username', function (req, res, next) {
  userservice.deleteUser(req.params.username).then((data)=> {
      res.sendStatus(200);
  }).catch((err) => {
      res.sendStatus(500);
  })
});

export default router;