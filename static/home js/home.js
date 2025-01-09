import display from './display.js';
import sEngine from './searcher.js';

const create_db_panel = document.querySelector('#create-db-panel');
const showdb_panel_btn = document.querySelector('#showdb-panel-btn');
const msg = document.querySelector('#msg');
const databaseContainer = document.querySelector('.database_container');
const delPanel = document.querySelector('.del-panel');
const delList = document.querySelector('.del-list');
const delDbSearch = document.querySelector('#del-db-search');
const delDbSearchInput = document.querySelector('#del-db-search-input');
const del_db_btn = document.querySelector('#del-db-btn');
const del_database_btn = document.querySelector('#del-database-btn');
const delExit = document.querySelector('#del-exit');
let dbArrList = [];
let delArrList = [];
let tableArrList = [];




export const loadDb = async (info) =>{

    await fetch('http://localhost:3000/getDatabase')
    .then(res => res.json())
    .then((data) => {
        dbArrList = [...data];
        console.log(dbArrList);
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
    });
        
    
    if(info){
        msg.innerText = info;
        display.shortDisplay(msg, 'flex');
    }
 
}

//ADDED EVENT LISTENER TO THE WINDOW SO THAT WHEN THE DOM LOADS ALL THE DATABASES ARE FETCHED FROM THE SERVER
window.addEventListener('DOMContentLoaded', () => {
    loadDb('');
});



















//====================EVERYTHING ABOUT CREATING AND DELETING THE DATABASES====================

//THIS CODE IS RESPONSIBLE FOR SETTING THE DISPLAY OF THE CREATE DATABASE FORM
showdb_panel_btn.addEventListener('click', ()=>{
    display.show(create_db_panel, 'flex');
});

create_db_panel.addEventListener('click', (e)=>{
    if(e.target.id == 'rm-btn'){
        display.remove(create_db_panel);
    }
});

//CREATED A FUNCTION TO GET AND DISPLAY LIST OF DATABASES TO BE DELETED FROM dbArrList
const getDelData = (data) =>{
    
    data.forEach(name =>{
        delList.innerHTML += `<div class="del-db">
                                <p class="del-db-name">${name}</p>
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

//ADDED AN EVENT LISTENER TO THE DELETE DATABASE BUTTON SO THAT WHEN CLICKED ON IT SETS THE INNER HTML OF THE delDbList TO NOTHING, SETS THE DISPLAY STYLE FOR THE DELETE PANLEL AND CALLS THE getDelDb FUNCTION
del_db_btn.addEventListener('click', ()=>{

    display.show(delPanel, 'flex')
    delList.innerHTML = '';
    getDelData(dbArrList);
        
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
        delList.innerHTML = '';
        loadDb();
        getDelData(dbArrList);
    })


});

delExit.addEventListener('click', ()=>{
    display.remove(delPanel);
    delArrList = [];
});


















//====================EVERYTHING ABOUT CREATING, EDITING AND DELETING THE TABLE CONTENT====================

function genTableContent(data){

    let z = 0;
    for(let i of data){
        console.log(i)
        const table_row = document.createElement('tr');
        table_row.className = 'table-row';
        document.querySelector('#table-body').appendChild(table_row);

        for(let x in i){
            console.log(i[x])
            document.querySelector('#table-body').children[z].innerHTML += `<td>${i[x]}</td>`
        }
        z++
    }
}

//THIS FUNCTION IS RESPONSIBLE FOR LOADING THE TABLE CONTROLS ON THE SIDE PANEL
function loadTableContentSP(dbName){
    document.querySelector('.side-panel').innerHTML = `<ul>
                                                        <li id="add-rec">Add Record</li>
                                                        <li id="del-rec">Delete Record</li>
                                                        <li>Edit Record</li>
                                                      </ul>
                                                      <p id="dbName">${dbName}</p>
                                                     `

//THIS CODE IS RESPONSIBLE FOR ADDING RECORDS TO A TABLE
     document.querySelector('#add-rec').addEventListener('click', ()=>{

        const table_headers = document.querySelector('#table-body').children[0];
        // document.querySelector('#table-content').innerHTML += `<div id="add-rec-form"></div>`;
        display.show(document.querySelector('#add-rec-form'), 'flex')
        document.querySelector('#add-rec-form').innerHTML += `<input id="add-rec-exit" type="button" value="X"/>`;
        for(let i = 0; i < table_headers.children.length; i++){
           document.querySelector('#add-rec-form').innerHTML += `<input type="text" placeholder="${table_headers.children[i].innerHTML}" class="field"/>`;
        }
        document.querySelector('#add-rec-form').innerHTML += `<input id="add-rec-btn" type="button" value="Add Record"/>`;

        document.querySelector('#add-rec-exit').addEventListener('click', () =>{
            display.remove(document.querySelector('#add-rec-form'));
            document.querySelector('#add-rec-form').innerHTML = '';
        });

        document.querySelector('#add-rec-btn').addEventListener('click', ()=>{

            const data = [];
            const record = {};
            const default_details = {
                dbName: `${document.querySelector('#dbName').innerHTML}`,
                tableName: `${document.querySelector('#space').innerHTML}`
            }
            let fields = document.querySelectorAll('.field');
            const tr = document.querySelector('#table-body').children[0]
        
           for(let i = 0; i < fields.length; i++){
            console.log(i)
            record[`${tr.children[i].innerHTML}`] = `${fields[i].value}`;
           }
           console.log(record);

           data.push(default_details);
           data.push(record);

            fetch('/addRecord', {
                headers: {'Content-Type': 'application/json'},
                method: 'post',
                body: JSON.stringify(data)
            }).then(res => res.json()).then(info =>{
                console.log(info);
                document.querySelectorAll('.table-row').forEach(row =>{
                    document.querySelector('#table-body').removeChild(row); 
                });
                genTableContent(info);
                display.remove(document.querySelector('#add-rec-form'));
                document.querySelector('#add-rec-form').innerHTML = '';
            })
        });
    

    });

    
}

function genTable(data){

    loadTableContentSP(document.querySelector('#dbName').innerHTML);

    document.querySelector('.main').removeChild(document.querySelector('.table-container'));
    const table_content = document.createElement('div');
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    table_content.id = 'table-content';
    table.id = 'table';
    tbody.id = 'table-body';

    table_content.appendChild(table);
    table.appendChild(tbody);
    document.querySelector('.main').appendChild(table_content);

    genTableContent(data);
}



















//====================EVERYTHING ABOUT CREATING AND DELETING TABLES====================
//THIS FUNCTION LOADS UP THE CONTROLS FOR CREATING AND DELETING TABLES ON THE SIDE PANEL
function loadTableSP(){
    document.querySelector('.side-panel').innerHTML = `<ul>
                                                        <li id="showTable-panel-btn">Create Table</li>
                                                        <li id="del-table-btn">Delete Table</li>
                                                        <li>Edit Table</li>
                                                      </ul>
                                                      <p id="dbName"></p>
                                                    `
                    
    document.querySelector('#del-table-btn').addEventListener('click', () => {
        display.show(delPanel, 'flex');
        delList.innerHTML = '';
        delArrList = [];
        getDelData(tableArrList);
    });
}

//THIS FUNCTION IS RESPONSIBLE FOR FETCHING A LIST OF ALL THE TABLES FROM THE SERVER AND DISPLAYING THEM ON THE MAIN SECTION
async function loadTables(){

       await fetch('/getTable', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({dbName: document.querySelector('#dbName').innerHTML})
        }).then(res => res.json()).then(data => {
            tableArrList = [...data];
            console.log(tableArrList);
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
                document.querySelector('#space').innerHTML = e.target.innerHTML;
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
                    genTable(data);
                });
            });
        });
}











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
    
    tHeaders.innerHTML += `<input type="button" id="send" value="Submit" />`;
    
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
        const default_details = {
            dbName: document.querySelector('#dbName').innerHTML,
            tableName: document.querySelector('#tableName').value
        }

        const data = [];
        data.push(default_details);
        data.push(tableHeaders);

        document.querySelectorAll('.header').forEach(heading => {
            tableHeaders[`${heading.value}`] = heading.value
        });

        fetch('/createTable', {
            headers: {'Content-Type': 'application/json'},
            method: 'post',
            body: JSON.stringify(data)
        }).then(res => res.text()).then(data => {
              console.log(data);
              document.querySelector('.main').removeChild(document.querySelector('.table-container'));
              display.remove(document.querySelector('#tableHeaders'));
              loadTables();
        });
     })

});














