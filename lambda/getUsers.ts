import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});

interface MyEvent {
    path: string;
}

export const handler = async (event: MyEvent) => {
    let username = event.path;
    //let username = event.path.substring(event.path.lastIndexOf('/')+1, event.path.length);
    const user = await getUserByName(username);
    if (user) {
        return {statusCode: 200, body: JSON.stringify(user)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
    //return JSON.stringify(event);
}

async function getUserByName(username: string): Promise<User | null> {
    // GetItem api call allows us to get something by the key
    const params = {
        TableName: 'users',
        Key: {
            'username': username
        }
    }
    
    return await docClient.get(params).promise().then((data) => {
        if (data && data.Item) {
            return data.Item as User;
        } else {
            console.log("Promise Failed");
            return null;
        }
    })
}

class PersonalSettings {
    public backgroundcolor:string = "Blue";
    public language:string = "English";
    public fontstyle:string = "";
}

class User{
    constructor(username:string = "", password:string= "",role:string= "",name:string= "",email:string= "",age:number = -1,personalsettings:PersonalSettings = new PersonalSettings(),emailvalidated:boolean = false, phonenumber?:string) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.name = name;
        this.email = email;
        this.age = age;
        this.phonenumber = phonenumber;
        this.personalsettings = personalsettings;
        this.emailvalidated = emailvalidated;
    }

    public username: string;
    public password: string;
    public role: string;
    public name: string;
    public email: string;
    public age: number;
    public personalsettings: PersonalSettings;
    public emailvalidated: boolean;
    public phonenumber?: string;

}