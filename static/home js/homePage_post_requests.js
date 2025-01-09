import { loadDb } from './home.js';

const createDbForm = document.querySelector('#create-db-panel');


createDbForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('form tried to submit!');

    const formData = new FormData(createDbForm);

    console.log(formData)

    await fetch('home', {
        headers: {'Content-Type': 'application/json'},
        method: 'post',
        body: JSON.stringify({
            DatabaseName: document.getElementsByName('DatabaseName')[0].value,
            Date: document.getElementsByName('Date')[0].value
        })
    }).then(res => res.json())
    .then(data => {
        loadDb(data);
    })

   


});