const db = require('../db');
const ExpressError = require('../helpers/expressError');

class Message {

    /** create new message -- returns
     *    {id, from_user, to_user, text, sent_at}
     */
  
    static async create({text, from_user, to_user, sender_id}) {
      const result = await db.query(
          `INSERT INTO messages (
                text,
                from_user,
                to_user,
                sender_id,
                sent_at)
              VALUES ($1, $2, $3, $4, current_timestamp)
              RETURNING id, from_user, to_user, text, sent_at`,
          [text, from_user, to_user, sender_id]);
  
      return result.rows[0];
    }

    /** Get: get all messages
    *
    * returns {id, from_user, to_user, body, sent_at, updated_at}
    *
    * both to_user and from_user = {id, username, email}
    *
    */

    static async getMessagesBetweenUsers(from_user, to_user) {
        const query = `
            SELECT m.id,
                from_user.id AS from_user_id,
                from_user.username AS from_username,
                from_user.email AS from_email,
                to_user.id AS to_user_id,
                to_user.username AS to_username,
                to_user.email AS to_email,
                m.text,
                m.sent_at,
                m.updated_at,
                m.sender_id
            FROM messages AS m
            JOIN users AS from_user ON m.from_user = from_user.id
            JOIN users AS to_user ON m.to_user = to_user.id
            WHERE (m.from_user = $1 AND m.to_user = $2)
                OR (m.from_user = $2 AND m.to_user = $1)
            ORDER BY m.updated_at`;
      
        const result = await db.query(query, [from_user, to_user]);

        return result.rows;
      }
      
}


module.exports = Message;