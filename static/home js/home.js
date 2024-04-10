import display from './form.js';

const create_db_panel = document.querySelector('#create-db-panel');
const showdb_panel_btn = document.querySelector('#showdb-panel-btn');

showdb_panel_btn.addEventListener('click', ()=>{
    display.show(create_db_panel);
});

create_db_panel.addEventListener('click', (e)=>{
    if(e.target.id == 'rm-btn'){
        display.remove(create_db_panel);
    }
})



