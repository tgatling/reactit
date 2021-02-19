import axios from 'axios';
import { Email } from './email';

class EmailService {
    private URI: string;
    private URI2: string;
    constructor() {
        // URL of the express server
        this.URI = 'https://cmd7v4kdhb.execute-api.us-west-2.amazonaws.com/default/emails';
        this.URI2 = 'http://localhost:3000/emails';
    }
    
    // Add an email address to the list of emails banned from registration
    addEmailAddress(email: Email): Promise<Email>{
        return axios.post(this.URI+"/", email).then(result => result.data).catch(err => err);
    }


    getAllBanned(): Promise<Email[]>{
        return axios.get(this.URI2, {withCredentials: true}).then(result => result.data).catch(err => err);
    }

    getEmailAddress(address: string): Promise<Email>{
        return axios.get(this.URI2+'/'+address, {withCredentials: true}).then(result => result.data).catch(err => err);
    }

}

export default new EmailService();