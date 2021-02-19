import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../conn/dynamo';
import { Email } from "../../user/email"


class EmailService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dyamo.ts
    }

    // Get every email on the banned email list
    async getBannedEmails(): Promise<Email[]> {
        const params = {
            TableName: 'emails'
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as Email[];
        })
    }

    // Get a specific email address from banned list
    async getEmailAddress(address: string): Promise<Email | null> {
        // Look up by email address
        const params = {
            TableName: 'emails',
            Key: {
                'address': address
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if (data && data.Item) {
                return data.Item as Email;
            } else {
                console.log("Promise Failed");
                return null;
            }
        })
    }

    // Add an email address to the database - ban email
    async addEmailAddress(email: Email): Promise<boolean> {
        const params = {
            TableName: 'emails',
            // Email address being put on banned list
            Item: email,
        };

        return await this.doc.put(params).promise().then((result) => {
            return true;
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }
}

const emailService = new EmailService();
export default emailService;