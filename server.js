
//IMPORT PACKAGES
import express from 'express';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import { DMSRoute } from './get_route_handlers/DMSRoute.js';
import { createDatabase } from './post_route_handlers/createDbRoute.js';
import { loadDatabase } from './get_route_handlers/loadDbRoute.js';
import { delDbRoute } from './post_route_handlers/delDbRoute.js';
import { createTableRoute } from './post_route_handlers/createTableRoute.js';
import { loadTbRoute } from './get_route_handlers/loadTbRoute.js';

//PASSING THE EXPRESS FUNCTION TO THE APP VARIABLE
const app = express();

//SET EXPRESS TO HANDLE COOKIES
app.use(cookieParser());

//SET EXPRESS TO RECIEVE JSON STRINGS
app.use(express.json());

//SET VIEW ENGINE
app.set('view engine', 'ejs');

//SET EXPRESS TO USE STATIC FILES
app.use(express.static('static'));

app.use(express.urlencoded({extended: true}));

//GET REQUEST ROUTE HANDLERS
DMSRoute(app);
loadDatabase(app, fs);
loadTbRoute(app, fs);

//HANDLING POST REQUESTS
createDatabase(app, fs);
delDbRoute(app, fs);
createTableRoute(app, fs);

//LISTENING FOR REQUESTS
app.listen(3000, 'localhost', () => console.log('Database Is Now Online!'));


