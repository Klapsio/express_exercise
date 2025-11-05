const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Hello express');
});

app.get('/about', (req, res) => {
    res.status(200).send('About Page');
});

app.get('/contact', (req, res) => {
    res.status(200).send('Contact Page');
});

app.get('/taldotil', (req, res) => {
    res.status(200).send('Cokolwiek');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});