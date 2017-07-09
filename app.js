const express = require('express');

const app = express();

//Index Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

//Start Server Function
app.listen(3000, () => {
  console.log('Server started on port 3000...')
});
