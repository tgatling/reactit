import * as AWS from 'aws-sdk';
import userService from '../dbfiles/services/user.service';

// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

// USER TABLE (Key: username)
const removeUsers = {
    TableName: 'users'
}

const userSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'username',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'username',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    TableName: 'users',
    StreamSpecification: {
        StreamEnabled: false
    }
};

// Delete user table
ddb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(userSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // user table successfully created
                console.log('Table Created', data);
            }
        });
    }, 5000);
});


// EMAIL TABLE - Emails that are banned from site. (Key: address)
const removeEmails = {
    TableName: 'emails'
}

const emailSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'address',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'address',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    TableName: 'emails',
    StreamSpecification: {
        StreamEnabled: false
    }
};

// Delete email table
ddb.deleteTable(removeEmails, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(emailSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // table successfully created
                console.log('Table Created', data);
                setTimeout(() => {
                    populateUserTable();
                }, 6000);
            }
        });
    }, 5000);
});

function populateUserTable(){
    userService.addUser({username: 'thorn', password: 'pass', role: 'Site Moderator', name: 'Tyler', email: 'tyler@gmail.com', age: 25, 
    phonenumber: '111-222-3345', personalsettings: {backgroundcolor: 'Blue', language: 'English', fontstyle: ''}, 
    emailvalidated: false ,accountstatus: 'activated'},).then(() => {});

    userService.addUser({username: 'salman', password: 'pass', role: 'Site Moderator', name: 'Salman', email: 'pcf.salman@gmail.com', age: 25, 
    phonenumber: '222-222-2222', personalsettings: {backgroundcolor: 'Blue', language: 'English', fontstyle: ''}, 
    emailvalidated: false ,accountstatus: 'activated'},).then(() => {});

    userService.addUser({username: 'user', password: 'pass', role: '', name: 'Name', email: 'email@gmail.com', age: 21, 
    phonenumber: '123-456-7890', personalsettings: {backgroundcolor: 'Blue', language: 'English', fontstyle: ''}, 
    emailvalidated: false ,accountstatus: 'activated'},).then(() => {});
}