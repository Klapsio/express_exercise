const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    const name = req.query.name || 'Unknown';
    const age = req.query.age || 'NaN';
    res.status(200).send(`Hello, ${name}, you are ${age} old`);

});


app.listen(3006, () => {
    console.log('Server is running on http://localhost:3006');
});