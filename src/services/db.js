import { Pool } from 'pg';

// const pool = new Pool({
//     connectionString: process.env.DB_URL,

// });

const pool = new Pool({
    user: 'docker',
    password: 'docker',
    host: 'localhost',
    port: 5432,
    database: 'db_caneco'
});

export default pool;
