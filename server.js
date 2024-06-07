
//IMPORT PACKAGES
import express from 'express';
import fs from 'fs';
import gr from './get.js';
import pr from './post_route_handlers/post.js';

//PASSING THE EXPRESS FUNCTION TO THE APP VARIABLE
const app = express();

//SET EXPRESS TO RECIEVE JSON STRINGS
app.use(express.json());

//SET VIEW ENGINE
app.set('view engine', 'ejs');

//SET EXPRESS TO USE STATIC FILES
app.use(express.static('static'));

app.use(express.urlencoded({extended: false}));

//HANDLING GET REQUESTS
gr.get(app, fs);

//HANDLING POST REQUESTS
pr.post(app, fs);

//LISTENING FOR REQUESTS
app.listen(3000, 'localhost', () => console.log('Database Is Now Online!'));


