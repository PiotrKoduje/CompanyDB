const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const pro = await Product.findOne().skip(rand);
    if (!pro) res.status(404).json({ message: 'Not found' });
    else res.json(pro);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const pro = await Product.findById(req.params.id);
    if (!pro) res.status(404).json({ message: 'Not found' });
    else res.json(pro);
  } catch( err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  const { name, client } = req.body;
  try {
    const newProduct = new Product({ name: name, client: client  });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateById = async (req, res) => {
  const { name, client } = req.body;
  try {
    const pro = await Product.findById(req.params.id);
    if (pro) {
      pro.name = name;
      pro.client = client;
      await pro.save();
      res.json({ pro });
    }
    else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const pro = await Product.findById(req.params.id);
    if (pro) {
      await Product.deleteOne({ _id: req.params.id });
      // OR await pro.remove();
      res.json({ pro });
    }
    else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};