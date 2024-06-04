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

//CREATED A FUNCTION TO GET AND DISPLAY LIST OF DATABASES TO BE DELETED FROM dbArrList
const getDelDb = () =>{
    let output = '';
    dbArrList.forEach(db =>{
        delDbList.innerHTML += `<div class="del-db">
                                <p class="del-db-name">${db}</p>
                                <div id="selector-container">
                                <div class="selector"></div>
                               </div>
                               </div>
                              `
    });


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
    });

}

function loadTableSP(){
    document.querySelector('.side-panel').innerHTML = `<ul>
                                                        <li id="showTable-panel-btn">Create Table</li>
                                                        <li id="del-table-btn">Delete Table</li>
                                                        <li>Edit Table</li>
                                                      </ul>
                                                      <p id="dbName"></p>
                                                    `
}

async function loadTables(){

       await fetch('/getTable', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({dbName: document.querySelector('#dbName').innerHTML})
        }).then(res => res.json()).then(data => {
            document.querySelector('.database_container').style.display = 'none';
            const table_container =  document.createElement('div');
            table_container.className = 'table-container';
            for(let i of data){
                const table = document.createElement('div');

                table.className = 'table';
                table.innerHTML = i;

                table_container.appendChild(table);
            }

            document.querySelector('.main').appendChild(table_container);

        });

    
        document.querySelectorAll('.table').forEach(table =>{

            table.addEventListener('click', (e)=>{

                const data = {
                    dbName: document.querySelector('#dbName').innerHTML,
                    tableName: e.target.innerHTML
                }

                fetch('/tableContent', {
                    headers: {'Content-Type': 'application/json'}, 
                    method: 'post',
                    body: JSON.stringify(data)
                }).then(res => res.json()).then(data =>{
                    console.log(data)
                });
            });
        });
}

//ADDED EVENT LISTENER TO THE WINDOW SO THAT WHEN THE DOM LOADS ALL THE DATABASES ARE FETCHED FROM THE SERVER
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



//ADDED AN EVENT LISTENER TO THE DELETE DATABASE BUTTON SO THAT WHEN CLICKED ON IT SETS THE INNER HTML OF THE delDbList TO NOTHING, SETS THE DISPLAY STYLE FOR THE DELTE PANLEL AND CALLS THE getDelDb FUNCTION
del_db_btn.addEventListener('click', ()=>{

    document.querySelector('.del-db-panel').style.display = 'flex';
    delDbList.innerHTML = '';
    getDelDb();
        
})

//CREATED A SEARCH ENGINE FOR THE DATABASES TO BE DELETED
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

//ADDED EVENT LISTENERS TO THE DATABASES SO THAT WHEN CLICKED ON THEY DISPLAY THE DATA IN THEM
document.querySelector('.main').addEventListener('click', (e) =>{   

    if(e.target.className == 'database'){

        loadTableSP();

        document.querySelector('#dbName').innerHTML = e.target.children[0].children[0].innerHTML

        loadTables();
      
        document.querySelector('#showTable-panel-btn').addEventListener('click', ()=>{
            display.show(document.querySelector('#tableDiv'), 'flex');
        });
        
        document.querySelector('#exit').addEventListener('click', ()=>{
            display.remove(document.querySelector('#tableDiv'));
        });
    
        document.querySelector('#header-exit').addEventListener('click', ()=>{
            display.remove(document.querySelector('#tableHeaders'));
        });

    }

});



document.querySelector('#next-btn').addEventListener('click', ()=>{

    console.log('working')

    const tName = document.querySelector('#tableName');
    const tHeaders = document.querySelector('#tableHeaders');
    
    if(tName.value.includes(' ')){
        alert('Table name must not include spaces!');
        return
    } else if(isNaN(tName.value[0]) === false){
        alert('Table name must not start with number');
        return
    }

    console.log(document.querySelector('#num-of-headers').value)
    for(let i = 0; i < document.querySelector('#num-of-headers').value; i++){
        console.log(i)
        tHeaders.innerHTML += `<input type="text" class="header"/>`;
    }
    
    tHeaders.innerHTML += `<input type="button" id="send" value="Submit" />`
    
    display.show(tHeaders, 'flex');
    display.remove(document.querySelector('#tableDiv'));
    console.log('show')


    document.querySelector('#auto-gen-container').addEventListener('click', () =>{
    console.log('clicked')
    document.querySelector('.auto-gen').classList.toggle('glow');

    });

    document.querySelector('#header-exit').addEventListener('click', () => {

        document.querySelectorAll('.header').forEach(input =>{
            tHeaders.removeChild(input);
        });
       
        tHeaders.removeChild(document.querySelector('#send'));

        display.remove(tHeaders);
        
    });

    // document.querySelector('#send').addEventListener('click', ()=>{
    //     document.querySelectorAll('.input-name').forEach(input =>{
    //         input.name = input.value;
    //     });

    //     tHeaders.submit();
    //     console.log('submitted')
    // });

    document.querySelector('#send').addEventListener('click', ()=>{
        const tableHeaders = {};
        document.querySelectorAll('.header').forEach(heading => {
            tableHeaders[`${heading.value}`] = heading.value
        });

        tableHeaders['dbName'] = document.querySelector('#dbName').innerHTML;
        tableHeaders['tableName'] = document.querySelector('#tableName').value;

        fetch('/createTable', {
            headers: {'Content-Type': 'application/json'},
            method: 'post',
            body: JSON.stringify(tableHeaders)
        }).then(res => res.text()).then(data => {
              console.log(data);
              document.querySelector('.main').removeChild(document.querySelector('.table-container'));
              display.remove(document.querySelector('#tableHeaders'));
              loadTables();
        });
     })

});














