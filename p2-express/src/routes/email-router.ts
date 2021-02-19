import Express from 'express';
import emailService from '../dbfiles/services/email.service';

const router = Express.Router();

router.get('/', function(req, res, next) {
    emailService.getBannedEmails().then((emails) => {
        res.send(JSON.stringify(emails));
    });
});

router.get('/:address', function(req, res, next) {
    emailService.getEmailAddress(req.params.address).then((email)=>{
        res.send(JSON.stringify(email));
    });
})

router.post('/', (req, res, next) => {
    emailService.addEmailAddress(req.body).then((data)=> {
        res.sendStatus(201);
    }).catch((err) => {
        res.sendStatus(500);
    })
});

export default router;