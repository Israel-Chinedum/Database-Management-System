import display from './toolbox/display.js';
import database from './database js/Database.js';
import table from './database js/Table.js';
import vr from './toolbox/VirtualRouter.js';

const spCreateDbPanel = document.querySelector('#SP-createDb-panel');
const createDbPanel = document.querySelector('#create-db-panel');
const rmCreateDbPanel = document.querySelector('#create-db-panel #rm-btn');
const spDeleteDbPanel = document.querySelector('#SP-deleteDb-panel');
const delPanel = document.querySelector('#del-panel');
const rmDeletePanel = document.querySelector('#del-panel #del-exit');
const createTableForm = document.querySelector('#create-table-form');
const rmCreateTableForm = document.querySelector('#create-table-form #rm-btn');
const createTableLi = document.querySelector('#create-table-li');
const delTableLi = document.querySelector('#del-table-li');



window.addEventListener('load', () => {
    // database.delete();
    sessionStorage.removeItem('currentDatabase');
    sessionStorage.removeItem('currentTable');
    vr.route([document.querySelector('.database_container')], document.querySelector('.main'));
    vr.route([document.querySelector('#db-sp-ul')], document.querySelector('.side-panel'));
});

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
    console.log(createTableForm.parentElement)
    display.show(createTableForm, 'flex');
});

//REMOVE TABLE FORM FROM THE DOM
rmCreateTableForm.addEventListener('click', () => {
    display.remove(createTableForm);
});



//CREATE BROADCAST CHANNEL
const channel = new BroadcastChannel('auth_channel');

channel.addEventListener('message', (e) => {
    if(e.data == 'logout'){
        window.location.href = '/login';
    }
});




//NAVIGATE TO DATABASE CLUSTER
document.querySelector('#db-cluster').addEventListener('click', () => {
    vr.route([document.querySelector('.database_container')], document.querySelector('.main'));
    vr.route([document.querySelector('#db-sp-ul')], document.querySelector('.side-panel'));
});




//NAVIGATE TO PREVIOUSE DATABASE TABLE LIST
document.querySelector('#prev-table-list').addEventListener('click', () => {
    if(sessionStorage.getItem('currentDatabase')){
        table.load(sessionStorage.getItem('currentDatabase'));
        vr.route([document.querySelector('.table_container')], document.querySelector('.main'));
        vr.route([document.querySelector('#table-sp-ul')], document.querySelector('.side-panel'));
    }
});





//LOG OUT CURRENT USER
document.querySelector('#signout-btn').addEventListener('click', () =>{
    fetch('/logout', {
        method: 'post',
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        if(!res.ok){
            return res.json().then((errData) => {
                throw new Error(errData)
            });
        }
        channel.postMessage('logout');
        window.location.href = '/login';
    }).catch(error => {
        display.error(document.querySelector('#msg'), 'block', error.message);
    });
});

