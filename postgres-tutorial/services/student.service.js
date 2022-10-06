const db = require('../db');

class StudentService {
  async getAll() {
    const dbResponse = await db.query('SELECT * FROM student;');
    return {
      total: dbResponse.rowCount,
      students: dbResponse.rows,
    };
  }
}

module.exports = new StudentService();
