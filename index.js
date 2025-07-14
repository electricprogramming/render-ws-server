const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow CORS from any origin
app.use(cors());

app.get('/', (req, res) => {
  res.send('CORS-enabled for all origins!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
