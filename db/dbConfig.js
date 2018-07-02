require('dotenv').config()

const pgp = require('pg-promise')({
  query: q => console.log(q.query),
});

// const dbConfig = pgp(process.env.DATABASE_URL || {
//   host:     process.env.DB_HOST || 'localhost',
//   port:     process.env.DB_PORT || 5432,
//   database: process.env.DB_NAME || 'emailwidget',
// })

const dbConfig = pgp(process.env.DATABASE_URL)

module.exports = dbConfig;
