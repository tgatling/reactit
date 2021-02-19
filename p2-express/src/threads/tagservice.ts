import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dbfiles/conn/dynamo';
import { pool } from '../pg/pgConn/pgConn';
import { Thread } from './thread';

class TagService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dyamo.ts
    }

    async insert_tag(thread: Thread): Promise<any> {
        console.log("inside insert thread");
        console.log(thread.thread_id);
        let template = {
            threadid: thread.threadname,
            tags: thread.tags,
        }
        const params = {
            TableName: 'Tags',
            Item: template,
        };
        return await this.doc.put(params).promise().then((result) => {
            return true;
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }
}

export default TagService;