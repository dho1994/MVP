const express = require('express');
const axios = require('axios');

const path = require('path');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(express.json());

app.get('/starlinks', (req, res) => {
  axios.post('https://api.spacexdata.com/v4/starlink/query', {
    "query": {
      "latitude": {
        "$ne": null
      }
    },
    "options": {
      "limit": 60,
      "page": 1
    }
  })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});