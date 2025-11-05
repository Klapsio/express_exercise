const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.status(200).send(`
        <form action="/" method="POST>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
        <label for="age">Age</label>
        <input type="number" id="age" name="age" required>
        <button type="submit">Submit</button>
        
        `);
});

app.post('/', (req, res) => {
    const { name, age} = req.body;
    res.status(200).send(`hello. ${name} .you are. ${age} years old`)
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});