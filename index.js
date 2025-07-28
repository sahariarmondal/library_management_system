const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World! it is library management system');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})