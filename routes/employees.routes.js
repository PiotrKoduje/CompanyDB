const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/employees', (req, res) => {
  req.db.collection('employees')
  .find()
  .toArray()
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  });
});

router.get('/employees/random', (req, res) => {
  req.db.collection('employees')
  .aggregate([{ $sample: { size: 1}}])
  .toArray()
  .then((data) => {
    res.json(data[0]);
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

router.get('/employees/:id', (req, res) => {
  const id = ObjectId(req.params.id);

  req.db.collection('employees')
  .findOne({ _id: id })
  .then((data) => {
    if (!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

router.post('/employees', (req, res) => {
  const { firstName, lastName, department } = req.body;
  
  req.db.collection('employees')
  .insertOne({ firstName: firstName, lastName: lastName, department: department})
  .then(() => {
    res.json({ message: 'New employee add' });
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

router.put('/employees/:id', (req, res) => {
  const { firstName, lastName, department } = req.body;
  const id = ObjectId(req.params.id);

  req.db.collection('employees')
  .updateOne({ _id: id }, { $set: { firstName: firstName, lastName: lastName, department: department }})
  .then((result) => {
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee updated' })
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

router.delete('/employees/:id', (req, res) => {
  const id = ObjectId(req.params.id);

  req.db.collection('employees')
  .deleteOne({ _id: id})
  .then((result) => {
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted'})
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

module.exports = router;
