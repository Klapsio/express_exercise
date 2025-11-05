//zad1
/*

const express = require("express");
const fs = require("fs");

const app = express();



app.get("/", (req, res) => {
    const kategoria = req.query.kategoria || "unknown";
    const produkty = JSON.parse(fs.readFileSync("produkty.json", "utf-8"));

    if(kategoria==="warzywa"){
        res.json(produkty.warzywa);
    }else if(kategoria==="owoce"){
        res.json(produkty.owoce);
    }else{
        res.json(produkty);
    }
});

app.listen(3010, () => {
    console.log(`Serwer działa na http://localhost:3010`);
});
*/

//zad 2
/*
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Wpisz /postac1 lub /postac2 aby zobaczyc opis danej postaci');
});

app.get('/postac1', (req, res) => {
    res.status(200).send(`<p>Geralt z Rivii (ur. 1211 r., zm. 1268 r. w Rivii, Lyria i Rivia), zwany Białym Wilkiem (st. Gwynbleidd) lub Rzeźnikiem z Blaviken. 
        wiedźmin szkolony w twierdzy Kaer Morhen, syn czarodziejki Visenny i najprawdopodobniej wojownika Korina, uczeń Vesemira, 
        związany przeznaczeniem z czarodziejką Yennefer i Prawem Niespodzianki z cintryjską księżniczką Cirillą. 
        Jedna z centralnych postaci historii XIII wieku oraz bohater niezliczonych legend.</p>`);
});

app.get('/postac2', (req, res) => {
    res.status(200).send(`<p>Franklin Saint is the protagonist in the FX original series, Snowfall. 
        He is a 19 year old convenience store clerk who rose to become South Central LA's notorious drug kingpin and the patriarch of the Family.</p>`);
});

app.listen(3011, () => {
    console.log('Server is running on http://localhost:3011');
});
*/

//zad3
/*
const express = require("express");
const fs = require("fs");
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

function silneHaslo(haslo) {
    const dlugoscOK = haslo.length >= 8;
    const litera = /[A-Za-z]/.test(haslo);
    const cyfra = /[0-9]/.test(haslo);
    return dlugoscOK && litera && cyfra;
}
app.get('/', (req, res) => {
    res.status(200).send(`uzyj /rejestracja aby dodac uzytkownika`);

});

app.get('/rejestracja', (req, res) => {
    res.status(200).send(`
        <form action="/rejestracja" method="POST">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
        <label for="age">Age</label>
        <input type="number" id="age" name="age" required>
        <label for="haslo">Haslo</label>
        <input type="password" id="haslo" name="haslo" required>
        <button type="submit">Submit</button>
        </form>
        
        `);
});

app.post("/rejestracja", (req, res) => {
    console.log(req.body);
    const { name, age, haslo } = req.body;

    if (!name || !age || !haslo) {
        return res.status(200).send({ error: "brak danych" });
    }


    if (age < 18) {
        return res.status(200).send({ error: "musisz miec minimum 18 lat" });
    }


    if (!silneHaslo(haslo)) {
        return res.status(200).send({
            error: "slabe haslo"
        });
    }


    const dane = JSON.parse(fs.readFileSync("uzytkownicy.json", "utf-8"));


    dane.push({ name, age, haslo });


    fs.writeFileSync("uzytkownicy.json", JSON.stringify(dane, null, 2));

    res.json({ message: "zakonoczono rej pomyslnie" });
});

app.listen(3012, () => {
    console.log(`Serwer działa na http://localhost:3012`);
});
*/
//zad4

const express = require("express");
const fs = require("fs");

const app = express();


const dane = JSON.parse(fs.readFileSync("dane.json", "utf8"));

app.get("/cms", (req, res) => {
    const { tytul } = req.query; 

if (!tytul) {
    return res.send("<h2>podaj tytul np. ?tytul=minecraft</h2>");
}

let artykul = null;


for (const element of dane) {
    if (element.tytul.toLowerCase() === tytul.toLowerCase()) {
        artykul = element;
        break;
}
}

if (!artykul) {
    return res.send("<h2>nie znaleziono artykulu</h2>");
}

res.send(`
    <h1>${artykul.tytul}</h1>
    <p>${artykul.tresc}</p>
`);
}); 

app.get("/", (req, res) => {
    res.send("<h2>uzyj przykladowo /cms?tytul=minecraft</h2>");
});

app.listen(3013, () => console.log(`Serwer działa na http://localhost:3013`));