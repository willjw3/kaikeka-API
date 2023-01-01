import { User } from '../__generated__/resolvers-types.js';
import {getUsers} from '../utils.js';

export class UsersDataSource {
    users: any = getUsers();
    getUsers(): User[] {
        return this.users;
    }
}
