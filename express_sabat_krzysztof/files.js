const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    res.status(200).json(data);
});

app.get('/add', (req, res) => {
    res.status(200).send(`
        <form action="/add" method="POST>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
        <label for="age">Age</label>
        <input type="number" id="age" name="age" required>
        <button type="submit">Submit</button>
        
        `);
});


app.post('/add', (req, res) => {
    const {name, age} = req.body;
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    data.push({id: data.lenght+1, ...req.body});
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.status(200).send('Added $(name) <a href="/">Go back</a>');
});

app.listen(3003, () => {
    console.log('Server is running on http://localhost:3003');
});