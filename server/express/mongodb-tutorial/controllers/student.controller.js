const StudentModel = require('../models/student');

class StudentController {
  async getAll(req, res) {
    const students = await StudentModel.find();
    const total = students.length;
    res.json({ students, total, message: 'Students Loaded' });
  }

  async create(req, res) {
    const { body } = req;
    const student = await StudentModel.create(body);
    res.json({ students: [student], total: 1, message: 'Students created' });
  }

  async update(req, res) {
    const {
      params: { id },
      body,
    } = req;

    await StudentModel.updateOne({ _id: id }, body);

    res.json({ students: [body], total: 1, message: 'Student updated' });
  }

  async delete(req, res) {
    const {
      params: { id },
    } = req;

    await StudentModel.deleteOne({ _id: id });

    res.json({ message: 'Student deleted' });
  }
}

module.exports = new StudentController();
