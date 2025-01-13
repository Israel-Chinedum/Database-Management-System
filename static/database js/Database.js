import search from '../DMS js/searcher.js';
import table from './Table.js';
import display from '../DMS js/display.js';
import height from './ScrollHeight.js';

class Database {

    //THIS METHOD CONVERTS THE DATA ARRAY GOTTEN FROM THE SERVER INTO DOM ELEMENTS WHICH THE USER SEES AS DATABASE
    genDOMDatabase(data, clear){
        if(clear == 'clear'){
            document.querySelector('.database_container').innerHTML = '';
        }
        
        for(let i of data){
            //CREATE ELEMENTS
            const db = document.createElement('div');
            const span = document.createElement('span');
            const pHolder = document.createElement('div');
            const p = document.createElement('p');

            //ADD CLASS
            db.classList.add('database');
            pHolder.classList.add('p-holder');
            span.classList.add('fa-database');
            span.classList.add('fa-solid');

            //SET THE INNER TEXT OF THE P TAG TO THE NAME OF THE DATABASE
            p.innerText = i;

            //APPEND ELEMENTS
            pHolder.appendChild(p);
            db.appendChild(span);
            db.appendChild(pHolder);
            document.querySelector('.database_container').appendChild(db);
        }
        table.load();
        height.scroll();
        console.log('favour')
    }









    //=====THIS METHOD GENERATES THE LIST OF DATABASE THE USER SEES ON THE DELETE PANEL/DIV=====
    genDelDOMData(data){
        document.querySelector('.del-list').innerHTML = '';

        for( let i of data ){
            const dbContainer = document.createElement('div');
            const selectorContainer = document.createElement('div');
            const selector = document.createElement('div');

            //ADD CLASS
            dbContainer.classList.add('del-db');
            selector.classList.add('selector');

            //ADD TEXT
            dbContainer.innerText = i;

            //SET ID
            selectorContainer.id = 'selector-container';

            //APPEND ELEMENTS
            selectorContainer.appendChild(selector);
            dbContainer.appendChild(selectorContainer);

            document.querySelector('.del-list').appendChild(dbContainer);
            }

        //SEARCH ENGINE
        const searchList = document.querySelectorAll('.del-db');
        console.log(searchList)
        const searchInput = document.querySelector('#del-db-search-input');

        searchInput.addEventListener('keyup', () => {
            search.engine(searchList, searchInput);
        });

    }








    //=====LOAD DATABASE METHOD=====
    load(){

        fetch('/getAllDatabase').then(res => res.json())
        .then(data => {
            console.log(data);
            this.genDOMDatabase(data);
        });
        
    }









    //=====CREATE DATABASE METHOD=====
    create(){
        const dbPanel = document.querySelector('#create-db-panel');

        dbPanel.addEventListener('submit', (e) => {

            e.preventDefault();

            const formData = new URLSearchParams(new FormData(dbPanel));
        
            fetch('/createdb', {
                method: 'post',
                body: formData
            }).then(res => res.json()).then(({msg, data}) => {
                console.log({msg, data});

                if(data){
                    this.genDOMDatabase([data]);
                }

                display.shortDisplay(document.querySelector('#msg'), 'block', msg);

            });

            dbPanel.style.display = 'none';

        })
       
    }









    //=====DELETE DATABASE METHOD=====
    delete(){
        const delPanel = document.querySelector('.del-panel');

        fetch('/getAllDatabase').then(res => res.json())
        .then(data => {
            console.log(data);

            this.genDelDOMData(data);

            let delData = [];

            const selector = () => {
                delData = [];
                const allData = document.querySelectorAll('.del-db');
                console.log(allData);
    
                allData.forEach(el => {
    
                    const selectorContainer = el.querySelector('#selector-container');
    
                    selectorContainer.addEventListener('click', () => {
                      
                        if(selectorContainer.children[0].classList.contains('glow')){
                            selectorContainer.children[0].classList.toggle('glow');
                            delData = [...delData.filter(data => data != el.innerText)];
                        } else{
                            selectorContainer.children[0].classList.toggle('glow');
                            delData.push(el.innerText);
                        }
                    });
                });

            }

            selector();

            //POST DATABASE TO BE DELETED

            const delBtn = document.querySelector('#del-database-btn');

            delBtn.addEventListener('click', () => {
                console.log(delData);
                if(delData.length > 0){
                    fetch('/delDatabase', {
                        headers: {'Content-Type': 'application/json'},
                        method: 'post',
                        body: JSON.stringify({delData})
                    }).then(res => res.json()).then(({msg, data}) => {
                        console.log(data);
                        this.genDOMDatabase(data, 'clear');
                        this.genDelDOMData(data);
                        selector();
                        display.shortDisplay(document.querySelector('#msg'), 'block', msg);
                    });
                }

            });


        });

       
        
    }

}

export default new Database();