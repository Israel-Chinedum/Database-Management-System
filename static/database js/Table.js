import display from '../DMS js/display.js';
import height from './ScrollHeight.js';

class Table {

    placeTable(){
            //REMOVE DATABASE CONTAINER AND SIDE PANEL UL FROM THE DOM
            document.querySelector('.main .database_container').style.display = 'none';
            document.querySelector('.side-panel #db-sp-ul').style.display = 'none';
            //ADD TABLE CONTAINER AND SIDE PANEL UL TO THE DOM
            document.querySelector('.main .table_container').style.display = 'block';
            document.querySelector('.side-panel #table-sp-ul').style.display = 'block';

    }






    genDOMTable(data){
        if(data.length > 0){
            for(let i of data){
                const table = document.createElement('div');
                table.classList.add('table_holder');
                table.innerText = i;
                document.querySelector('.table_container').appendChild(table);
            }
        }
        height.scroll();
    }






    load(){
            //ADD EVENT LISTENERS TO EACH OF THE DATABASE, SO THAT WHEN CLICKED THEY FETCH THEIR TABLES
            const allDatabase = document.querySelectorAll('.database');
            allDatabase.forEach(database => {
                database.addEventListener('click', (e) => {
                sessionStorage.setItem('currentDatabase', `${database.textContent}`);
                this.placeTable();
                fetch(`/getTables/${database.textContent}`).then(res => res.json()).then(data => {
                    this.genDOMTable(data);
                });
                });
            });
            this.create();
    }






    create(){
        const createTableForm = document.querySelector('#create-table-form');

        createTableForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentDatabase = sessionStorage.getItem('currentDatabase');
            const formData = new URLSearchParams( new FormData(createTableForm) );
            fetch(`/createTable/${currentDatabase}`, {
                method: 'post',
                body: formData
            }).then(res => res.json()).then(({msg, data}) => {
                display.shortDisplay(document.querySelector('#msg'), 'block', msg);
                this.genDOMTable([data]);
            });
        });
    }

}
export default new Table();