
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/proverbs.json');

const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

exports.getAllProverbs = (req, res) => {
  const data = readData();
  const { category, search } = req.query;
  let filtered = data;

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }
  if (search) {
    filtered = filtered.filter(p =>
      p.textDari.includes(search) ||
      p.textPashto.includes(search) ||
      p.translationEn.includes(search)
    );
  }
  res.json(filtered);
};

exports.getProverbById = (req, res) => {
  const data = readData();
  const proverb = data.find(p => p.id === parseInt(req.params.id));
  if (proverb) res.json(proverb);
  else res.status(404).json({ error: 'Proverb not found' });
};

exports.getRandomProverb = (req, res) => {
  const data = readData();
  const random = data[Math.floor(Math.random() * data.length)];
  res.json(random);
};

exports.addProverb = (req, res) => {
  const data = readData();
  const newProverb = { id: Date.now(), ...req.body };
  data.push(newProverb);
  writeData(data);
  res.status(201).json(newProverb);
};

exports.updateProverb = (req, res) => {
  const data = readData();
  const index = data.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ error: 'Proverb not found' });
  }
};

exports.deleteProverb = (req, res) => {
  const data = readData();
  const filtered = data.filter(p => p.id !== parseInt(req.params.id));
  if (filtered.length < data.length) {
    writeData(filtered);
    res.json({ message: 'Proverb deleted' });
  } else {
    res.status(404).json({ error: 'Proverb not found' });
  }
};
