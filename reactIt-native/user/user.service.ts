import axios from 'axios';
import { User } from './user';

class UserService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = 'http://localhost:3000/users';
    }
    getLogin(): Promise<User> {
        // withCredentials sends our cookies with the request.
        return axios.get(this.URI, {withCredentials: true}).then(result=>{
            console.log(result);
            return result.data
        });
    }
    
    register(user: User): Promise<User>{
        return axios.post(this.URI+'/'+user.username, user, {withCredentials: true}).then(result => result.data).catch(err => err);
    }

    getUserByName(username: string): Promise<User>{
        return axios.get(this.URI+'/'+username, {withCredentials: true}).then(result => result.data).catch(err => err);
    }

    login(user: User): Promise<User> {
        return axios.post(this.URI, user, {withCredentials: true}).then(result => result.data).catch(err => err);
    }

    updateUser(user: User): Promise<null> {
        return axios.put(this.URI, user).then((result) => null);
    }

    deleteUser(username: string): Promise<null> {
        return axios.delete(this.URI+'/'+username).then(result => null)
    }

    /* logout(): Promise<null> {
        return axios.delete(this.URI, {withCredentials: true}).then(result => null);
    } */
}

export default new UserService();