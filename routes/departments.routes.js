const express = require('express');
const router = express.Router();
const DepartmentsController = require('../controllers/departments.controller');

router.get('/departments', DepartmentsController.getAll);
router.get('/departments/random',DepartmentsController.getRandom);
router.get('/departments/:id', DepartmentsController.getById);
router.post('/departments', DepartmentsController.addNew);
router.put('/departments/:id', DepartmentsController.updateById);
router.delete('/departments/:id', DepartmentsController.deleteById);

module.exports = router;
