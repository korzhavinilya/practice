const db = require('../db');

class StudentController {
  async getAll(req, res) {
    const dbResponse = await db.query('SELECT * FROM student;');
    const response = {
      total: dbResponse.rowCount,
      students: dbResponse.rows,
    };
    res.json(response);
  }
}

module.exports = new StudentController();
