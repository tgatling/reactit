/*Group 2: Introduce the ability to register a user.
As a user, I can register as a customer with a starting amount of money.
*/

import userService from './user.service';

export class PersonalSettings {
    public backgroundcolor:string = "Blue";
    public language:string = "English";
    public fontstyle:string = "";
}

export class User{
    constructor(username:string = "", password:string= "",role:string= "",name:string= "",email:string= "",age:number = -1,personalsettings:PersonalSettings = new PersonalSettings(),emailvalidated:boolean = false, accountstatus: string = 'activated', phonenumber?:string) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.name = name;
        this.email = email;
        this.age = age;
        this.phonenumber = phonenumber;
        this.personalsettings = personalsettings;
        this.emailvalidated = emailvalidated;
        this.accountstatus = accountstatus;
    }

    public username: string;
    public password: string;
    public role: string;
    public name: string;
    public email: string;
    public age: number;
    public personalsettings: PersonalSettings;
    public emailvalidated: boolean;
    public accountstatus: string;
    public phonenumber?: string;
}