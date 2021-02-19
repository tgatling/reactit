import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../conn/dynamo';
import { User } from "../../user/user"


class UserService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dyamo.ts
    }

    async getUsers(): Promise<User[]> {
        const params = {
            TableName: 'users'
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as User[];
        })
    }

    //getUser
    async getUserByName(username: string): Promise<User | null> {
        // GetItem api call allows us to get something by the key
        const params = {
            TableName: 'users',
            Key: {
                'username': username
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if (data && data.Item) {
                return data.Item as User;
            } else {
                console.log("Promise Failed");
                return null;
            }
        })
    }

    async addUser(user: User): Promise<boolean> {

        const params = {
            TableName: 'users',
            Item: user,

        };


        return await this.doc.put(params).promise().then((result) => {
            return true;
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }

    async  updateUser(user: User): Promise<boolean>{
        const params = {
            TableName: 'users',
            Key: {
                'username': user.username
            },
            UpdateExpression: 'set #password = :password, #email = :email, #age = :age, #phonenumber = :phonenumber, #accountstatus = :accountstatus, #name =:name',
            ExpressionAttributeNames: {
                '#password': 'password',
                '#email': 'email',
                '#age': 'age',
                '#phonenumber': 'phonenumber',
                '#accountstatus': 'accountstatus',
                '#name': 'name'
            },
            ExpressionAttributeValues: {
                ':password': user.password,
                ':email': user.email,
                ':age': user.age,
                ':phonenumber': user.phonenumber,
                ':accountstatus': user.accountstatus,
                ':name': user.name,
            },
            ReturnValues: 'UPDATED_NEW'
            };
            return await this.doc.update(params).promise().then((data) => {
                return true;
            }).catch((err) => {
                console.log(err)
                return false;
            });
        }

        async deleteUser(username: string): Promise<Boolean> {
            const params = {
                TableName: 'users',
                Key: {
                    'username': username
                }
            }
            return await this.doc.delete(params).promise().then((data) => {
                return true;
            }).catch((err) => {
                return false;
            });
        }
}

const userService = new UserService();
export default userService;
