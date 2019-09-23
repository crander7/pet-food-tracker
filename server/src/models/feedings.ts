import pg from 'pg';
import konphyg from 'konphyg';

const konfig = konphyg(`${__dirname}/../../../config`);
const config = konfig('tracker');

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
            text: `INSERT INTO feeding (pet) VALUES ($1)`,
            values: [pet]
        };
        await pool.query(query);
    } catch (e) {
        const error = `db error in addFeeding ${e}`;
        throw error;
    }
};


// const addFeeding = async (pet: string) => {
//     try {
//         await pool.query("SELECT * FROM post WHERE start_date >= now() - INTERVAL '1 day';");
//     } catch (e) {
//         const error = `db error in getUpcomingPosts ${e}`;
//         throw error;
//     }
// };
