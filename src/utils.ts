import {client} from './data/db.js';
client.connect();

export const createUserTable = async () => {
    const query = `
    CREATE TABLE users (
        id int primary key,
        name varchar,
        email varchar,
        password varchar
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

export const addUser = async (id: number, email: string, password: string, firstName: string, lastName: string, companyId: string) => {
    const query = {
        text: 'INSERT INTO users(id, email, password, first_Name, last_Name, company_id) VALUES($1, $2, $3, $4, $5, $6)',
        values: [id, email, password, firstName, lastName, companyId],
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
            password: row.password,
            firstName: row.first_name,
            lastName: row.last_name,
            companyId: row.company_id
        })) : {}
        return schemaFormattedRows
    } catch (err) {
        console.error(err)
    }
}