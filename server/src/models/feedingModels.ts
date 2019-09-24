import pg from 'pg';
import konphyg from 'konphyg';

const config = konphyg(`${__dirname}/../../../config`)('tracker');

const dbConfig = {
    user: config.postgreSQL.username,
    database: config.postgreSQL.database,
    host: config.postgreSQL.host,
    port: config.postgreSQL.port,
    password: config.postgreSQL.password,
    max: 20,
    min: 4
};

const pool = new pg.Pool(dbConfig);

process.on('exit', () => {
    pool.end();
});

export const addFeeding = async (pet: string) => {
    try {
        const query = {
            text: 'INSERT INTO feeding (pet) VALUES ($1)',
            values: [pet]
        };
        await pool.query(query);
    } catch (e) {
        const error = `db error in addFeeding ${e}`;
        throw error;
    }
};

export const getLatestFeeding = async (pet: string) => {
    try {
        const query = {
            text: 'SELECT created_at FROM feeding WHERE pet = $1 ORDER BY created_at DESC LIMIT 1;',
            values: [pet]
        };
        const { rows } = await pool.query(query);
        return rows[0].created_at;
    } catch (e) {
        const error = `db error in getLatestFeeding ${e}`;
        console.log(error);
        throw error;
    }
};

export default {
    addFeeding,
    getLatestFeeding
};
