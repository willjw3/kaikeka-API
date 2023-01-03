import { v4 as uuidv4 } from 'uuid'
import {client} from './data/db.js';
client.connect();

export const createUserTable = async () => {
    const query = `
    CREATE TABLE users (
        id string primary key,
        email varchar,
        first_name varchar,
        last_name varchar,
        company_id varchar,
        password varchar,
    );
    `;

    try {
        const res = await client.query(query);
        console.log("Table has been created successfully");
    } catch (err) {
        console.error(err);
    } finally {
        client.end();
    }
}

export const addUser = async (id: string, email: string, firstName: string, lastName: string, companyId: string, password: string) => {
    const query = {
        text: 'INSERT INTO users(id, email, first_Name, last_Name, company_id, password) VALUES($1, $2, $3, $4, $5, $6)',
        values: [id, email, firstName, lastName, companyId, password],
    }

    try {
        const res = await client.query(query);
        console.log(res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        client.end();
    }
}

export const getUsers = async () => {
    const query = `
    SELECT * FROM users;
    `
    try {
        const res = await client.query(query);
        const schemaFormattedRows = res?.rows ? res.rows.map(row => ({
            id: row.id,
            email: row.email,
            firstName: row.first_name,
            lastName: row.last_name,
            companyId: row.company_id,
            password: row.password
        })) : {}
        return schemaFormattedRows
    } catch (err) {
        console.error(err)
    }
}

const createRandomUser = () => {
    const id = uuidv4();
    const randomString = Math.random().toString(36).slice(2)
    const firstName = "Test"
    const lastName = `User + ${randomString}`
    const email = `${randomString}@vcorp.com`
    const password = "rstlne"
    const companyId = "1a234"
    return {id, email, password, firstName, lastName, companyId}
}

export const userSeeder = () => {
    const user = createRandomUser();
    addUser(user.id, user.email, user.firstName, user.lastName, user.companyId, user.password)
}