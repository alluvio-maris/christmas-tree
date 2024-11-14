const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

let ornaments = {};

app.get('/api/ornaments', (req, res) => {
    const treeName = req.query.treeName;
    res.json(ornaments[treeName] || []);
});

app.post('/api/ornaments', (req, res) => {
    const { treeName, url, message, left, top } = req.body;
    if (!ornaments[treeName]) ornaments[treeName] = [];
    ornaments[treeName].push({ url, message, left, top });
    res.status(201).send();
});

app.listen(3000, () => console.log('Server started on port 3000'));
