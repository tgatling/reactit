import userService from '../dbfiles/services/user.service';

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

export async function login(username: string, password: string): Promise<User|null> {
    return await userService.getUserByName(username).then((user)=> {
        if (user && user.password === password) {
            return user
        } else {
            return null;
        }
    })
}

export function register(username: string, password: string, role: string, name:string,email:string,age:number,
    personalsettings:PersonalSettings,emailvalidated:boolean,phonenumber?:string) {
    userService.addUser(new User(username,password,role,name,email,age,personalsettings,emailvalidated,phonenumber)).then((res) => {
    }).catch((err) => {
        console.log('Error, this probably means that the username is already taken.')
    });
}

// export function updateUser(user: User) {
//     userService.updateUser(user).then((success) => {
//         logger.info('user updated successfully');
//     }).catch((error) => {
//         logger.warn('user not updated');
//     });
// }