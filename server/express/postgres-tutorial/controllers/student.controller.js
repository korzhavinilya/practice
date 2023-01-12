const studentService = require('../services/student.service');

class StudentController {
  async getAll(req, res) {
    const students = await studentService.getAll();
    res.json(students);
  }
}

module.exports = new StudentController();
