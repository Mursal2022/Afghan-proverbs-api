
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const proverbsRoutes = require('./routes/proverbsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/proverbs', proverbsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Afghan Proverbs API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
