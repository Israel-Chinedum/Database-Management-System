import display from './display.js';
import database from '../database js/Database.js';

const spCreateDbPanel = document.querySelector('#SP-createDb-panel');
const createDbPanel = document.querySelector('#create-db-panel');
const rmCreateDbPanel = document.querySelector('#create-db-panel #rm-btn');
const spDeleteDbPanel = document.querySelector('#SP-deleteDb-panel');
const delPanel = document.querySelector('#del-panel');
const rmDeletePanel = document.querySelector('#del-panel #del-exit');
const createTableForm = document.querySelector('#create-table-form');
const rmCreateTableForm = document.querySelector('#create-table-form #rm-btn');
const createTableLi = document.querySelector('#create-table-li');



//=====DATABASE SECTION=====

// DISPLAY THE CREATE DATABASE FORM ON THE DOM
spCreateDbPanel.addEventListener('click', () => {
    display.show(createDbPanel, 'flex');
});

// DISPLAY THE DELETE PANEL/DIV ON THE DOM
spDeleteDbPanel.addEventListener('click', () => {
    display.show(delPanel, 'flex');
    database.delete();
});

// REMOVE THE DELETE PANEL/DIV FROM THE DOM
rmDeletePanel.addEventListener('click', () => {
    display.remove(delPanel);
});


// REMOVE THE CREATE DATABASE FORM FROM THE DOM
rmCreateDbPanel.addEventListener('click', () => {
    display.remove(createDbPanel);
});

//CALL DATABSE METHODS DATABASE
database.load();
database.create();










//=====TABLE SECTION=====

//DISPLAY TABLE FORM ON THE DOM
createTableLi.addEventListener('click', () =>{
    display.show(createTableForm, 'flex');
});

//REMOVE TABLE FORM FROM THE DOM
rmCreateTableForm.addEventListener('click', () => {
    display.remove(createTableForm);
});

