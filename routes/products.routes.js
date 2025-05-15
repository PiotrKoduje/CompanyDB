const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/products', (req, res) => {
  req.db.collection('products')
  .find()
  .toArray()
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  });
});

router.get('/products/random', (req, res) => {
  req.db.collection('products')
  .aggregate([{ $sample: { size: 1}}])
  .toArray()
  .then((data) => {
    res.json(data[0]);
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

router.get('/products/:id', (req, res) => {
  const id = ObjectId(req.params.id);

  req.db.collection('products')
  .findOne({ _id: id })
  .then((data) => {
    if (!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

router.post('/products', (req, res) => {
  const { name, client } = req.body;
  
  req.db.collection('products')
  .insertOne({ name: name, client: client })
  .then(() => {
    res.json({ message: 'New product add' });
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

router.put('/products/:id', (req, res) => {
  const { name, client } = req.body;
  const id = ObjectId(req.params.id);

  req.db.collection('products')
  .updateOne({ _id: id }, { $set: { name: name, client: client }})
  .then((result) => {
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated' })
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

router.delete('/products/:id', (req, res) => {
  const id = ObjectId(req.params.id);

  req.db.collection('products')
  .deleteOne({ _id: id})
  .then((result) => {
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted'})
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

module.exports = router;
