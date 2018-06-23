const db = require('../db/dbConfig')

module.exports = {
  addUser(data) {
    return db.none(`
      INSERT INTO users
       (username, password_digest, fname, lname)
      VALUES
        ($/username/, $/password_digest/, $/fname/, $/lname/)
      `, data);
  },

  findOneUser(username) {
    return db.any(`
      SELECT * FROM users
      WHERE username = $1
      `, username);
  },
}
