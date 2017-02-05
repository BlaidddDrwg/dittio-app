const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Listener for Kue processing - likely going to remove
// maybe put this into an app.use()?
const { contactJobs } = require('./services/jobConsumer/consumer');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.use(express.static(path.join(__dirname, '../src')));

// Service-based routing import
const contactRoute = require('./services/contacts/contactRoute');

// REST Gateways
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});
app.use('/contact', contactRoute);

// Error catch-all
app.all('*', (req, res) => {
  res.status(404).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ditt.io up and running on port ${PORT}!`);
});