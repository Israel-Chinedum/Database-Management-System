import table from './Table.js';
import display from '../toolbox/display.js';
import scroll from '../toolbox/Scroll.js';

class Database {

    //THIS METHOD CONVERTS THE DATA ARRAY GOTTEN FROM THE SERVER INTO DOM ELEMENTS WHICH THE USER SEES AS DATABASE
    genDOMDatabase(data, clear){
        if(clear == 'clear'){
            document.querySelectorAll('.database_container .database').forEach(db => {
                document.querySelector('.database_container').removeChild(db);
            });
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



        //ADD EVENT LISTENERS TO EACH OF THE DATABASE, SO THAT WHEN CLICKED THEY FETCH THEIR TABLES
      
            const allDatabase = document.querySelectorAll('.database');

            allDatabase.forEach(database => {

                if(!database.classList.contains('click-me')){
                    database.addEventListener('click', () => {
                        sessionStorage.setItem('currentDatabase', `${database.textContent}`);
                        console.log('clicked me!')
                        table.load(database.textContent);
                    });
                    database.classList.add('click-me');
                }

            });
    
        scroll.height(document.querySelector('.database_container'));
        console.log('favour');
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


    selector(delArr){
       delArr.length = 0;
        const allData = document.querySelectorAll('.del-db');
        console.log(allData);
        console.log('Now Active');
        allData.forEach(el => {

            const selectorContainer = el.querySelector('#selector-container');

            if(!selectorContainer.classList.contains('click-me')){

                selectorContainer.addEventListener('click', () => {
    
                    console.log('active')
                  
                    if(selectorContainer.children[0].classList.contains('glow')){
                        selectorContainer.children[0].classList.toggle('glow');
                        const delList = [...delArr.filter(data => data != el.innerText)];
                        delArr.length = 0;
                        for(let i of delList){
                            delArr.push(i);
                        }
                    } else{
                        selectorContainer.children[0].classList.toggle('glow');
                        delArr.push(el.innerText);
                    }
                    console.log(delArr)

                });

                selectorContainer.classList.add('click-me');
            }
        });


        return delArr;
    }







    async sendDelData(delArr, link){
        console.log('activated')
        console.log(delArr);
        let resData = '';
        if(delArr.length > 0){
            await fetch(`${link}`, {
                headers: {'Content-Type': 'application/json'},
                method: 'post',
                body: JSON.stringify({delData: delArr})
            }).then(res => {
                if(!res.ok){
                    return res.json().then((errData) => {
                        throw new Error(errData);
                    });
                }
                return res.json();
            }).then(({msg, data}) => {
                console.log(data);
                resData = {msg, data};
            }).catch(error => {
                resData = {err: error.message};
            });
            return resData;
        }

    }







    //=====DELETE DATABASE METHOD=====
    delete(){
        const delPanel = document.querySelector('.del-panel');

        fetch('/getAllDatabase').then(res => res.json())
        .then(data => {
            console.log(data);

            display.genDelData(data);

            let delArr = [];
            this.selector(delArr);
            console.log(delArr)
            
            //POST DATABASE TO BE DELETED
            
            const delBtn = document.querySelector('#del-database-btn');
                
            delBtn.addEventListener('click', async () => {
                console.log('point db: ', document.querySelector('.del-list'));
                const newData = await this.sendDelData(delArr, '/delDatabase');
                
                if('msg' in newData){
                    const {msg, data} = newData;
                    console.log('point d: ', document.querySelector('.del-list'));
                    if(data){
                        console.log('point a: ', document.querySelector('.del-list'));
                        this.genDOMDatabase(data, 'clear');
                        display.genDelData(data);
                        this.selector(delArr);
                        display.shortDisplay(document.querySelector('#msg'), 'block', msg);
                    }
                } else{
                    display.error(document.querySelector('#msg'), 'block', newData.err);
                }

            });


        });

       
        
    }

}

export default new Database();