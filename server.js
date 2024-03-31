//IMPORT PACKAGES
const express = require('express');

//PASSING THE EXPRESS FUNCTION TO THE VARIABLE APP
const app = express();

//SET VIEW ENGINE
app.set('view engine', 'ejs');

//SET EXPRESS TO USE STATIC FILES
app.use(express.static('static'));

app.get('', (req, res)=>{
    res.render('home');
});


app.listen(3000, 'localhost', () => console.log('Database Is Now Online!'));


