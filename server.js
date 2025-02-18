
//IMPORT PACKAGES
import express from 'express';
import session from 'express-session';
import fs from 'fs';
import { DMSRoute } from './post_route_handlers/DMSRoute.js';
import { createDatabase } from './post_route_handlers/createDbRoute.js';
import { loadDatabase } from './get_route_handlers/loadDbRoute.js';
import { delDbRoute } from './post_route_handlers/delDbRoute.js';
import { createTableRoute } from './post_route_handlers/createTableRoute.js';
import { loadTbRoute } from './get_route_handlers/loadTbRoute.js';
import { delTableRoute } from './post_route_handlers/delTableRoute.js';
import { renameTbRoute } from './get_route_handlers/renameTbRoute.js';
import { getTableDataRoute } from './get_route_handlers/getTableDataRoute.js';
import { setHeaderRoute } from './post_route_handlers/setHeaderRoute.js';
import { addRecordRoute } from './post_route_handlers/addRecordRoute.js';
import { editRecordRoute } from './post_route_handlers/editRecordRoute.js';
import { delRecordRoute } from './get_route_handlers/delRecordRoute.js';
import { LandingPageRoute } from './get_route_handlers/landingPageRoute.js';
import { regUserRoute } from './post_route_handlers/regUserRoute.js';
import { verifyUserRoute } from './post_route_handlers/verifyUserRoute.js';
import { logoutRoute } from './post_route_handlers/logout.js';
import { getLoginRoute } from './get_route_handlers/getLogin.js';

//PASSING THE EXPRESS FUNCTION TO THE APP VARIABLE
const app = express();

//SET EXPRESS TO RECIEVE JSON STRINGS
app.use(express.json());

//SET VIEW ENGINE
app.set('view engine', 'ejs');

//SET EXPRESS TO USE STATIC FILES
app.use(express.static('static'));

app.use(session({
    name: 'DatabaseManagementSystem',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + 60 * 60000 * 1)
    }
}));

app.use(express.urlencoded({extended: true}));

//GET REQUEST ROUTE HANDLERS
LandingPageRoute(app);
loadDatabase(app, fs);
loadTbRoute(app, fs);
getTableDataRoute(app, fs);
delRecordRoute(app, fs);
getLoginRoute(app);

//HANDLING POST REQUESTS
DMSRoute(app);
createDatabase(app, fs);
delDbRoute(app, fs);
createTableRoute(app, fs);
delTableRoute(app, fs);
renameTbRoute(app, fs);
setHeaderRoute(app, fs);
addRecordRoute(app, fs);
editRecordRoute(app, fs);
regUserRoute(app, fs);
verifyUserRoute(app, fs);
logoutRoute(app);

//LISTENING FOR REQUESTS
app.listen(3000, 'localhost', () => console.log('Database Is Now Online!'));


