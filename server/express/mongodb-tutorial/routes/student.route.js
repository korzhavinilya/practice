var express = require('express');
var router = express.Router();

const studentController = require('../controllers/student.controller');

router.get('/', studentController.getAll);
router.post('/', studentController.create);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.delete);

module.exports = router;
