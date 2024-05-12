import display from './display.js';
import sEngine from './searcher.js';

const create_db_panel = document.querySelector('#create-db-panel');
const showdb_panel_btn = document.querySelector('#showdb-panel-btn');
const msg = document.querySelector('#msg');
const databaseContainer = document.querySelector('.database_container');
const delDbPanel = document.querySelector('.del-db-panel');
const delDbList = document.querySelector('.del-db-list');
const delDbSearch = document.querySelector('#del-db-search');
const delDbSearchInput = document.querySelector('#del-db-search-input');
const del_db_btn = document.querySelector('#del-db-btn');
const del_database_btn = document.querySelector('#del-database-btn');
const delExit = document.querySelector('#del-exit');
let dbArrList = [];
let delArrList = [];

showdb_panel_btn.addEventListener('click', ()=>{
    display.show(create_db_panel, 'flex');
});

create_db_panel.addEventListener('click', (e)=>{
    if(e.target.id == 'rm-btn'){
        display.remove(create_db_panel);
    }
});

const loadDb = () =>{
    let i = 0;
    let output = '';
    for(let x of dbArrList){
        i++
        output += `<div id="${i}" class="database">
                                          <div class="p-holder">
                                            <p>${x}</p>  
                                          </div>
                                        </div>      
                                        `
    }

    databaseContainer.innerHTML = output;

}

const getDelDb = () =>{
    let output = '';
    dbArrList.forEach(db =>{
        delDbList.innerHTML += `<div class="del-db">
                                <p class="del-db-name">${db}</p>
                                <div id="selector-container">
                                <div class="selector"></div>
                               </div>
                              `
    });

    // delDbList.innerHTML = output;

    document.querySelectorAll('.selector').forEach(selected => {
        const delData = selected.parentElement.parentElement.children[0].innerHTML;
        selected.addEventListener('click', ()=>{
            selected.classList.toggle('glow');
            if(selected.classList.contains('glow')){
                delArrList.push(delData);
            }else{
               for(let i in delArrList){
                if(delArrList[i] == delData){
                    delArrList.splice(i, 1);
                }
               }
            }

            console.log(delArrList);
           
        });
    })

}

window.addEventListener('DOMContentLoaded', async ()=>{

    


    await fetch('http://localhost:3000/getDatabase')
    .then(res => res.json())
    .then(data => {
        dbArrList = [...data];
        console.log(dbArrList);
        loadDb();
    })
        
    
    if(msg.innerHTML != ''){
        display.shortDisplay(msg, 'flex');
    }
        
});

window.addEventListener('click', (e)=>{
    if(e.target.className == 'database'){

    }
});




del_db_btn.addEventListener('click', ()=>{

    document.querySelector('.del-db-panel').style.display = 'flex';
    delDbList.innerHTML = '';
    getDelDb();
        
})



delDbSearchInput.addEventListener('keyup', ()=>{
    const delDbName = document.querySelectorAll('.del-db-name');
    const delDbNameArr = Array.from(delDbName);
    sEngine.search(delDbNameArr, delDbSearchInput);
});


del_database_btn.addEventListener('click', async()=>{

    const data = {
        dbToDelete: delArrList
    }

     await fetch('http://localhost:3000/delete', {
        headers: {'Content-Type': 'application/json'},
        method: 'post',
        body: JSON.stringify(data)
    }).then(res => res.json()).then(info => {
        dbArrList = [...info];
        delArrList = [];
        console.log(dbArrList)
        console.log(info)
        databaseContainer.innerHTML = '';
        delDbList.innerHTML = '';
        loadDb();
        getDelDb();
    })


});

delExit.addEventListener('click', ()=>{
    document.querySelector('.del-db-panel').style.display = 'none';
});











