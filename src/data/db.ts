const projects = [
    {
        title: "DB Update"
    },
    {
        title: "Add Insurance Info to User Query Result - API"
    }
]

export const users = [
    {
      name: 'Octavio Flores',
      email: 'oflores@zcorp.com',
      projects: [projects[0], projects[1]]
    },
    {
      name: 'Sylvia Perez',
      email: 'sperez@zcorp.com',
      projects: [projects[1]]
    },
];
import pg from 'pg';
const {Client} = pg
import dotenv from 'dotenv';
dotenv.config();


export const client = new Client({
  user: process.env.DBUSER,
  host: process.env.DBHOST || 'localhost',
  database: process.env.DATABASE,
  password: process.env.DBPASSWORD,
  port: Number(process.env.DBPORT),
});
