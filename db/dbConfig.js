const pgp = require('pg-promise')({
  query: q => console.log(q.query),
});

const dbConfig = process.env.DATABASE_URL || {
  host:     process.env.DB_HOST || 'localhost',
  port:     process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'emailwidget',
}

module.exports = pgp(dbConfig);
