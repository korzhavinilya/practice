const db = require('../db');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class AuthController {
  async registration(req, res) {
    try {
      const { username, password } = req.body;
      const dbResponse = await db.query(
        'SELECT * FROM Client WHERE username = $1',
        [username]
      );

      const isClientExist = dbResponse.rowCount;
      if (isClientExist) {
        res
          .status(400)
          .json({ message: 'User with this username already exists' });
      }

      const uuid = uuidv4();
      const hashPass = bcrypt.hashSync(password, 7);
      console.log('hashPass', hashPass, hashPass.length);
      const createDbResponse = await db.query(
        'INSERT INTO Client VALUES ($1, $2, $3) RETURNING *',
        [uuid, username, hashPass]
      );

      const client = createDbResponse.rows[0];

      await db.query('INSERT INTO ClientRole VALUES($1, $2)', [
        client.client_uid,
        '99258774-8477-43d8-99db-2fe434926081',
      ]);

      const joinedResponse = await db.query(
        'SELECT client_uid, username, name as role FROM ClientRole JOIN Client USING(client_uid) JOIN Role USING(role_uid) WHERE client_uid = $1',
        [client.client_uid]
      );

      res.json({ message: 'Client Registered', ...joinedResponse.rows[0] });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
    } catch (error) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }
}

module.exports = new AuthController();
