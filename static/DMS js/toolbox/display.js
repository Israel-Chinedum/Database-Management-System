import search from './searcher.js';

class Display{

    show(panelName, display){
         panelName.style.display = display;
    }

    remove(panelName){
        panelName.style.display = 'none';
    }

    shortDisplay(panelName, display, data){
        if(data){
            panelName.innerText = data;
        } else{
            panelName.innerText = 'Finished Operation!';
        }
        panelName.style.display = display;

        setTimeout(()=>{
            panelName.style.display = 'none';
        },5000);

    }


    error(panelName, display, data){
        if(data){
            panelName.innerText = data;
            panelName.style.color = 'red';
            panelName.style.borderColor = 'red';
        } else{
            panelName.innerText = 'Finished Operation!';
        }
        panelName.style.display = display;

        setTimeout(()=>{
            panelName.style.display = 'none';
        },5000);

    }





    
   //=====THIS METHOD GENERATES THE LIST OF DATABASE THE USER SEES ON THE DELETE PANEL/DIV=====
    genDelData(data){
        console.log('point 1: ', document.querySelector('.del-list'));
        document.querySelector('.del-list').innerHTML = '';
        console.log('point 1: ', document.querySelector('.del-list'));

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
        console.log('point 1: ', document.querySelector('.del-list'));
    }



} const display = new Display();

export default display;

