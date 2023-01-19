# Reactit
Reactit is a forum where individuals can share interests, information, and ask questions about on various topics. The purpose of Reactit is to bring people together despite their locations, allowing them to communicate and find others that have common interests. Reactit is a safe environment and constantly moderated by its administrator to prevent any forms of abuse and avoid inappropriate content.

## Technologies Used
* AWS SDK - version 2.818.0
* AWS Lambda
* AWS Gateway
* AWS DynamoDB
* PostgreSQL - version 8.5.1
* TypeScript - version 4.0.0
* Express.js - version 4.16.1
* React Native - 40.0.1
* Expo - version 40.0.0
* Redux - version 7.2.2
* Axios - version 0.21.1

## Features
Current Features:
* User login and registration
* Account modification
* Account holder can post threads on the site
* Account holders can comment on posts
* Grouping of post into categories/subcategories
* Search capabilities to narrow display of threads 
* Site moderators ability to disable/activate accounts
* Site moderators ability to ban emails and usernames from registration

Future Development:
* Disabling of comments
* Account email and phone number verification
* Ability to audit site moderator actions
* Adding reactions to comments on main threads

## Getting Started
Cloning the repository:
https://github.com/tgatling/reactit.git

Back-end (p2-express):
* Directory -> cd reactit/p2-express
* Installation -> npm install
* AWS Configuration -> aws configure
* Setup DynamoDB tables -> npm run setup
* Run program -> npm run start

Front-end (reactit-native):
* Directory -> cd reactit/reactit-native
* Installation -> npm install
* Run program -> npm run start

Contributors
* Janine Geraldizo
* Salman Saeed
* Tequesha Gatling
* Tyler Horn