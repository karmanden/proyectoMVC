const pg = require("pg");
const config = require("dotenv").config();

const connection = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});


module.exports = connection