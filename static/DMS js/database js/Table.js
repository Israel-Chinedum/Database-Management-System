import display from '../toolbox/display.js';
import scroll from '../toolbox/Scroll.js';
import database from './Database.js';
import { strCheck } from '../toolbox/strCheck.js';
import vr from '../toolbox/VirtualRouter.js';

class Table {

    currentDatabase = sessionStorage.getItem('currentDatabase');
    currentTable = sessionStorage.getItem('currentTable');

    placeTable(el1, el2, el3, el4){

            //REMOVE DATABASE CONTAINER AND SIDE PANEL UL FROM THE DOM
            el1.style.display = 'none';
            el2.style.display = 'none';
            //ADD TABLE CONTAINER AND SIDE PANEL UL TO THE DOM
            el3.style.display = 'block';
            el4.style.display = 'block';
    }






    genDOMTable(data, clear = false){


        if(clear){
            document.querySelectorAll('.table_container .table_holder').forEach(table => {
                document.querySelector('.table_container').removeChild(table);
            });
        }

        let delArr = [];

        if(data.length > 0){
            for(let i of data){
                // CREATE ELEMENT
                const table = document.createElement('div');
                const name = document.createElement('input');
                const div = document.createElement('div');
                const edit = document.createElement('i');
                const del = document.createElement('i');

                // ADD CLASS
                table.classList.add('table_holder');
                div.classList.add('tools');
                name.classList.add('table-name');
                edit.classList.add('fa-solid');
                edit.classList.add('fa-edit');
                del.classList.add('fa-solid');
                del.classList.add('fa-trash');

                // SET VALUES
                name.value = i;

                //SET ATTRIBUTES
                name.setAttribute('readonly', null);

                // APPEND ELEMENTS
                div.appendChild(edit);
                div.appendChild(del);
                table.appendChild(name);
                table.appendChild(div);
                document.querySelector('.table_container').appendChild(table);

                table.addEventListener('mouseenter', () => {
                    name.style.color = 'black';
                });
                table.addEventListener('mouseleave', () => {
                    name.style.color = '#0078D7';
                });

                table.addEventListener('click', (e) => {
                    // const tableContainer = document.querySelector('.main .table_container');
                    // const tableSidePanel = document.querySelector('.side-panel #table-sp-ul');
                    // const tbDataContainer = document.querySelector('#table');
                    // const tbDataSpUl = document.querySelector('#tb-data-sp-ul');

                    console.log(e.target)

                    if(e.target == table || e.target == name){

                        if(!edit.classList.contains('fa-save')){
                            sessionStorage.setItem('currentTable', `${name.value}`);
                            this.loadTableData();
                        }
                    }
                    
                });

                this.delete(delArr, del);
                this.rename(edit);

            }
        }
        scroll.height(document.querySelector('.table_container'));
    }






    load(database){

        vr.route([document.querySelector('.table_container')], document.querySelector('.main'));
        vr.route([document.querySelector('#table-sp-ul')], document.querySelector('.side-panel'))
        console.log(document.querySelector('.side-panel'))
        fetch(`/getTables/${database}`).then(res => res.json()).then(({data}) => {
            this.genDOMTable(data, true);
        });

        document.querySelector('#table-sp-ul p span').textContent = database;
      
        this.create();

    }






    create(){
        const createTableForm = document.querySelector('#create-table-form');

        if(!createTableForm.classList.contains('click-me')){

            createTableForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const currentDatabase = sessionStorage.getItem('currentDatabase');
                const formData = new URLSearchParams( new FormData(createTableForm) );
                fetch(`/createTable/${currentDatabase}`, {
                    method: 'post',
                    body: formData
                }).then(res => {
                    if(!res.ok){
                        return res.json().then(errData => {
                            throw new Error(errData);
                        })
                    } 
                    return res.json();
                }).then(({msg, data}) => {
                    display.shortDisplay(document.querySelector('#msg'), 'block', msg);
                    data && this.genDOMTable([data]);
                }).catch(error => {
                    display.error(document.querySelector('#msg'), 'block', error.message);
                })
            });

            createTableForm.classList.add('click-me');
        }
    }





    delete(delArr, btn){
                const currentDatabase = sessionStorage.getItem('currentDatabase');
                btn.addEventListener('click', async () => {
                    delArr.unshift(btn.parentElement.parentElement.children[0].value);
                    console.log(delArr);
                    const newData = await database.sendDelData(delArr, `/delTable/${currentDatabase}`);
                    console.log('newData: ', newData)
                    if('msg' in newData){
                        console.log('favourite')
                        const {msg, data} = newData;
                        display.shortDisplay(document.querySelector('#msg'), 'block', msg);
                        this.genDOMTable(data, 'clear');
                    } else{
                        display.error(document.querySelector('#msg'), 'block', newData.err);
                    }
                });
        
    }






    rename(btn){
       
            const formerName = btn.parentElement.parentElement.children[0].value;
            console.log(formerName)

            btn.addEventListener('click', () => {

                console.log(formerName)

                const input = btn.parentElement.parentElement.children[0];
                
                if(btn.classList.contains('fa-edit')){
                    input.removeAttribute('readonly');
                    input.style.backgroundColor = 'white';
                    btn.classList.remove('fa-edit');
                    btn.classList.add('fa-save');

                } else {

                    const {valid} = strCheck(input.value);

                    if(valid){

                        input.setAttribute('readonly', null);
                        input.style.backgroundColor = 'transparent';
                        btn.classList.remove('fa-save');
                        btn.classList.add('fa-edit');
                        
                        fetch(`/renameTable?formerName=${formerName}&newName=${input.value}&currentDatabase=${sessionStorage.getItem('currentDatabase')}`)
                        .then(res => {
                            if(!res.ok){
                                return res.json().then(errData => {
                                    throw new Error(errData);
                                });
                            }
                            return res.json();
                        }).then(({msg}) => {
                            display.shortDisplay(document.querySelector('#msg'), 'block', msg);
                        }).catch(error =>{
                            display.error(document.querySelector('#msg'), 'block', error.message);
                        });

                    } else {
                        display.error(document.querySelector('#msg'), 'block', 'Name must not include symbols or special characters!');
                    }
                   
                }

            });
    }


    

    genElement(parentEl, el, text){
        const element = document.createElement(`${el}`);

        const txtArr = text.split('=');

        if(txtArr[0] == 'placeholder'){
            element.placeholder = txtArr[1];
        }
        if(txtArr[0] == 'value'){
            element.value = elArr[1];
        }

        parentEl.appendChild(element);
    }






    createHeaders(data){
        const tableHead = document.createElement('thead');
        const numbering = document.createElement('th');
        const tools = document.createElement('th');

        numbering.innerText = 'S/N';
        tableHead.appendChild(numbering);

        for(let i in data[0]){
            const th = document.createElement('th');
            th.innerText = data[0][`${i}`];
            tableHead.appendChild(th);
        }

        tools.innerText = 'Tools';
        tools.colSpan = '2';
        tableHead.appendChild(tools);

        document.querySelector('#table').appendChild(tableHead);
    }





    createTable(data){
     
        document.querySelector('#table').innerHTML = '';
        this.createHeaders(data);
        const num = data.length - 1;
        const bodyData = data.slice(-(data.length - 1));
        console.log(bodyData)

        if(data.length <= 1){
            return
        } else{
            const tableBody = document.createElement('tbody');
            for(let i = 0; i < bodyData.length; i++){
                const tr = document.createElement('tr');
                const index = document.createElement('td');
                index.innerText = i;
                tr.appendChild(index);
                for(let x in bodyData[i]){
                    const td = document.createElement('td');
                    td.classList.add('table-data');
                    td.title = x;
                    td.innerText = bodyData[i][`${x}`];
                    tr.appendChild(td);
                }

                const editTd = document.createElement('td');
                const delTd = document.createElement('td');
                const edit = document.createElement('i');
                const del = document.createElement('i');

                del.classList.add('fa-solid');
                del.classList.add('fa-trash');
                edit.classList.add('fa-solid');
                edit.classList.add('fa-edit');

                editTd.appendChild(edit);
                delTd.appendChild(del);
                tr.appendChild(editTd);
                tr.appendChild(delTd);

                //CODE FOR EDITTING RECORDS
                edit.addEventListener('click', () => {
                    const tdArr = Array.from(edit.parentElement.parentElement.children);

                    //SEND DATA TO EDIT
                    if(edit.classList.contains('fa-save')){

                        const dataToSend = tdArr.filter(td => td.classList.contains('table-data'));
                        const index = Number(dataToSend[0].parentElement.firstElementChild.innerText) + 1;
                        const data = {};

                        for(let i of dataToSend){
                            data[i.title] = i.innerText;
                        }

                        const currentDatabase = sessionStorage.getItem('currentDatabase');
                        const currentTable = sessionStorage.getItem('currentTable');

                        fetch(`/editRecord/${currentDatabase}/${currentTable}/${index}`, {
                            headers: {'Content-Type': 'application/json'},
                            method: 'post',
                            body: JSON.stringify(data)
                        }).then(res => {
                            if(!res.ok){
                                return res.json().then(errData => {
                                    throw new Error(errData);
                                });
                            }
                            return res.json();
                        }).then(({msg, data}) => {
                            console.log(data);
                            this.createTable(data);
                            display.shortDisplay(document.querySelector('#msg'), 'block', msg);
                        }).catch(error => {
                            display.error(document.querySelector('#msg'), 'block', error.message);
                        })
                    }

                    //ALLOW FOR DATA TO BE EDITED
                    console.log(tdArr)
                    tdArr.forEach(cell => {
                        if(cell.classList.contains('table-data')){
                            if(cell.classList.contains('processing')){
                                cell.contentEditable = 'false';
                                cell.classList.remove('processing');
                                cell.style.cursor = 'pointer';
                                cell.style.backgroundColor = 'var(--baseColor)';
                                edit.classList.remove('fa-save');
                                edit.classList.add('fa-edit');

                            } else{
                                cell.contentEditable = 'true';
                                cell.classList.add('processing');
                                cell.style.cursor = 'auto';
                                cell.style.backgroundColor = 'white';
                                edit.classList.remove('fa-edit');
                                edit.classList.add('fa-save');
                            }
                        } 
                    });

                });



                //CODE FOR DELETING RECORDS
                del.addEventListener('click', () => {

                    const currentDatabase = sessionStorage.getItem('currentDatabase');
                    const currentTable = sessionStorage.getItem('currentTable');

                    const index = Number(del.parentElement.parentElement.firstElementChild.innerText) + 1;
                    fetch(`/delRecord/${currentDatabase}/${currentTable}/${index}`)
                    .then(res => {
                        if(!res.ok){
                            return res.json().then(errData => {
                                throw new Error(errData);
                            });
                        }
                        return res.json();
                    }).then(({msg, data}) => {
                        console.log(data);
                        this.createTable(data);
                        display.shortDisplay(document.querySelector('#msg'), 'block', msg);
                    }).catch(error => {
                        display.error(document.querySelector('#msg'), 'block', error.message);
                    });
                });


                tableBody.appendChild(tr);
            }

            document.querySelector('#table').appendChild(tableBody);

        }
    }







    addRecordForm(data){

        document.querySelector('#add-record-form').innerHTML = '';
        display.show(document.querySelector('#add-rec-form-holder'), 'block');

       
        const exitBtn = document.createElement('input');
        const heading = document.createElement('h1');

        exitBtn.type = 'button';
        exitBtn.value = 'X';
        exitBtn.id = 'exit-record-form-btn';

        exitBtn.addEventListener('click', () => { 
            display.remove(document.querySelector('#add-rec-form-holder'));
        });

        heading.innerText = 'Add Record';

        document.querySelector('#add-record-form').appendChild(exitBtn);
        document.querySelector('#add-record-form').appendChild(heading);

        

        for(let i in data[0]){
            const input = document.createElement('input');
            input.placeholder = i;
            input.name = i;
            document.querySelector('#add-record-form').appendChild(input);
        }

        const button = document.createElement('button');
        button.id = 'add-record-btn';
        button.innerText = 'Add';
      
        document.querySelector('#add-record-form').appendChild(button);
      
    }









    loadTableData(){

        const currentDatabase = sessionStorage.getItem('currentDatabase');
        const currentTable = sessionStorage.getItem('currentTable');

     

        fetch(`getTableData/${currentDatabase}/${currentTable}`).then(res => {
            if(!res.ok){
                return res.json().then(errData => {
                    throw new Error(errData);
                });
            }
            return res.json();
        }).then(data => {
            if(data.length <= 0){

                const createHeaders = document.querySelector('#create-headers');
                const headersContainer = document.querySelector('#headers-container');
                const addElement = document.querySelector('.fa-plus');
                const form = document.querySelector('#header-form');
                const sendHeadersBtn = document.querySelector('#create-header-btn');

                vr.route([document.querySelector('#main-table')], document.querySelector('.main'));
                vr.route([document.querySelector('#tb-data-sp-ul')], document.querySelector('.side-panel'));


                display.show(createHeaders, 'block');

                createHeaders.addEventListener('click', () => {
                   display.remove(createHeaders);
                   display.show(headersContainer, 'flex');
                });

                // ADD A CLICK EVENT LISTENER TO THE ADD HEADERS BUTTON
                addElement.addEventListener('click', () => {
                    this.genElement(form, 'input', 'placeholder=Enter header name');
                });



                
                
                // SEND FORM DATA OF ALL THE HEADERS TO BE CREATED
                if(!sendHeadersBtn.classList.contains('click-me')){
                    sendHeadersBtn.addEventListener('click', () => {
                        //SET NAME ATTRIBUTES TO THE FORM INPUT ELEMENTS

                        Array.from(form).forEach(input => {
                            input.name = input.value
                            console.log(input)
                        });

                        const formData = new URLSearchParams(new FormData(form));
                        const currentDatabase = sessionStorage.getItem('currentDatabase');
                        const currentTable = sessionStorage.getItem('currentTable');

                        fetch(`/setHeaders/${currentDatabase}/${currentTable}`, {
                            method: 'post',
                            body: formData
                        }).then(res => {
                            if(!res.ok){
                                return res.json().then(errData => {
                                    throw new Error(errData);
                                });
                            }
                            return res.json();
                        }).then(({msg, data}) => {
                            display.show(document.querySelector('#main-table'), 'block');
                            display.remove(headersContainer);
                            console.log(data);
                            this.createHeaders(data);
                            display.shortDisplay(document.querySelector('#msg'), 'block', msg);

                            if(!document.querySelector('#add-record-li').classList.contains('click-me')){
                                document.querySelector('#add-record-li').addEventListener('click', () => {
                                    this.addRecordForm(data);
                                });
                                document.querySelector('#add-record-li').classList.add('click-me');
                            }

                        }).catch(error => {
                            display.error(document.querySelector('#msg'), 'block', error.message);
                        });
                    });
                    sendHeadersBtn.classList.add('click-me');
                }


            } else{

                vr.route([document.querySelector('#main-table')], document.querySelector('.main'));
                vr.route([document.querySelector('#tb-data-sp-ul')], document.querySelector('.side-panel'));

                console.log(data)
                this.createTable(data);

                if(!document.querySelector('#add-record-li').classList.contains('click-me')){
                    document.querySelector('#add-record-li').addEventListener('click', () => {
                        this.addRecordForm(data);
                    });
                    document.querySelector('#add-record-li').classList.add('click-me');
                }

            }




            const form = document.querySelector('#add-record-form');

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                display.remove(document.querySelector('#add-rec-form-holder'));
                const formData = new URLSearchParams(new FormData(form));

                fetch(`/addRecord/${currentDatabase}/${currentTable}`, {
                    method: 'post',
                    body: formData
                }).then(res => {
                    if(!res.ok){
                        return res.json().then(errData => {
                            throw new Error(errData);
                        });
                    }
                    return res.json();
                }).then(({msg, data}) => {
                    this.createTable(data);
                    display.shortDisplay(document.querySelector('#msg'), 'block', msg);
                }).catch(error => {
                    display.error(document.querySelector('#msg'), 'block', error.message);
                });
            });



        }).catch(error => {
            display.error(document.querySelector('#msg'), 'block', error.message);
        });
    }

}
export default new Table();