import { Pool } from "pg";

const pool = new Pool({
  password: "root",
  user: "admin",
  host: "localhost",
  database: "test_db",
});

export const selectQuery = async ({ table, keys }: any) => {
  try {
    const query = `SELECT ${keys} FROM ${table} `;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const insertQuery = async (table: string, data: any) => {
  try {
    const keys = Object.keys(data[0]).toString();
    const values = data
      .map((item: any) => {
        return `(${Object.values(item).map((i: string) => `'${i}'`)})`;
      })
      .toString();
    const query = `INSERT INTO ${table}(${keys}) VALUES ${values} RETURNING ${keys},id`;
    console.log(query);
    const result = await pool.query(query);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuery = async (table: string, id: string, data: any) => {
  try {
    const keys = Object.keys(data);
    const query =
      "UPDATE " +
      table +
      " SET " +
      keys.map((el, i) => `${el} = $${i + 1}`).toString() +
      ` WHERE id = $${Object.keys(data).length + 1} RETURNING ${keys},id`;
    const values = [...Object.values(data), id];
    console.log(query);
    const result = await pool.query(query, values);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const deleteQuery = async (table: string, id: string) => {
  try {
    const query = `DELETE FROM ${table} WHERE id = '${id}' RETURNING id`;
    console.log(query);
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const connect = async () => {
  try {
    const { rows } = await pool.query("SELECT version()");
    console.log(`connected to ${rows[0].version}`);
  } catch (error) {
    console.log(error);
  }
};
