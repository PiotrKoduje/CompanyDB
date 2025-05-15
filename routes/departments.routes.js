const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/departments', (req, res) => {
  req.db.collection('departments')
  .find()
  .toArray()
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  });
});

router.get('/departments/random', (req, res) => {
  req.db.collection('departments')
  .aggregate([{ $sample: { size: 1}}])
  .toArray()
  .then((data) => {
    res.json(data[0]);
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

router.get('/departments/:id', (req, res) => {
  const id = ObjectId(req.params.id);

  req.db.collection('departments')
  .findOne({ _id: id })
  .then((data) => {
    if (!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

router.post('/departments', (req, res) => {
  const { name } = req.body;
  
  req.db.collection('departments')
  .insertOne({ name: name})
  .then(() => {
    res.json({ message: 'New department add' });
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

router.put('/departments/:id', (req, res) => {
  const { name } = req.body;
  const id = ObjectId(req.params.id);

  req.db.collection('departments')
  .updateOne({ _id: id }, { $set: { name: name }})
  .then((result) => {
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json({ message: 'Department updated' })
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

router.delete('/departments/:id', (req, res) => {
  const id = ObjectId(req.params.id);

  req.db.collection('departments')
  .deleteOne({ _id: id})
  .then((result) => {
     if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Department not found' });
     }
    res.json({ message: 'Department deleted'})
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

module.exports = router;
