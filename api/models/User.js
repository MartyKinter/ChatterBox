const db = require('../db');
const ExpressError = require('../helpers/expressError');
const bcrypt = require('bcrypt');


class User {

    /** Register user with data.
   *
   * Returns { id, username, password }
   *
   * Throws BadRequestError on duplicates.
   **/

    static async register({username, email, password}) {
        const duplicateCheck = await db.query(
          `SELECT username 
            FROM users 
            WHERE username = $1`,
          [username]
        );
    
        if (duplicateCheck.rows[0]) {
          throw new ExpressError(
            `There already exists a user with username '${username}'`,
            400
          );
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const result = await db.query(
          `INSERT INTO users 
              (username, email, password) 
            VALUES ($1, $2, $3) 
            RETURNING id, username, password`,
          [
            username,
            email,
            hashedPassword,
          ]
        );
    
        return result.rows[0];
      }

  /** Given a username, return data about user.
   *
   * Returns { id, username, password }
   *
   **/

      static async get(username) {
        const userRes = await db.query(
              `SELECT id,
                      username,
                      password
               FROM users
               WHERE username = $1`,
            [username],
        );

        if (userRes.rows.length === 0) {
          return undefined;
        }
        const user = userRes.rows[0];
    
        return user;
      }
      
  /** Find all users except current user 
   *
   **/
  
      static async findAllExceptUser(currentUserId) {
        const result = await db.query(
              `SELECT id,
                      username,
                      email
               FROM users
               WHERE id <> $1
               ORDER BY username`,
               [currentUserId]
        );
    
        return result.rows;
      }

}

module.exports = User;
