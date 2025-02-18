import vr from './DMS js/toolbox/VirtualRouter.js';
import { print } from './DMS js/toolbox/print.js';
import display from './DMS js/toolbox/display.js';

const container = document.querySelector('#container');
const welcomePage = document.querySelector('#welcome-page');
const signupPage = document.querySelector('#signup-page');
const signinPage = document.querySelector('#signin-page');
const messagePage = document.querySelector('#message-page');
const msg = document.querySelector('#msg');


window.addEventListener('DOMContentLoaded', () => {
    switch(document.querySelector('title').innerText){
        case 'D.M.S':
            vr.route([welcomePage], container);
            break;
        case 'Sign up':
            vr.route([signupPage], container);
            break;
        case 'Sign in':
            vr.route([signinPage], container);
            break;
        default:
            vr.route([welcomePage], container);
    }
});



const fadein = (element, time, delay) => {
   
    if(!element){
        return 'Please provide an element!';
    }

    element.style.opacity = '0'; 
    setTimeout(() => {
        element.style.transition = time;
        element.style.opacity = '1';
    }, delay);
   
}



window.addEventListener('load', () => {
    const h1 = document.querySelector('#welcome-text');
    print.text({
        element: h1,
        text: 'WELCOME TO THE DATABASE MANAGEMENT SYSTEM'
    }).then(() => {
        fadein(document.querySelector('#buttons'), '3s');
    });
});



document.querySelector('#signup-btn').addEventListener('click', () => {
    vr.route([signupPage], container);
});

document.querySelector('#back-btn').addEventListener('click', () => {
    vr.route([welcomePage], container);
});

Array.from(document.querySelectorAll('.signin-btn')).forEach(btn => {
    btn.addEventListener('click', () => {
        vr.route([signinPage], container);
    });    
})


Array.from(document.querySelectorAll('.fa-times')).forEach(btn => {
    btn.addEventListener('click', () => {
        vr.route([welcomePage], container);
    });
});


//=====REGISTRATION FORM CODE=====
document.querySelector('#signup-form').addEventListener('submit', (e) => {

    e.preventDefault();
    const formData = new URLSearchParams(new FormData(document.querySelector('#signup-form')));

    fetch('/regUser', {
        method: 'post',
        body: formData
    }).then(res => {
        if(!res.ok){
            return res.json().then(errData => {
                throw new Error(errData);
            });
        }
        return res.json();
    }).then(data => {
        vr.route([messagePage], container);
        display.remove(document.querySelector('#back-btn'));
        print.text({
            element: msg,
            text: data,
            delay: 50
        }).then(() => {
            display.show(document.querySelector('#signin2'), 'block');
            fadein(document.querySelector('#signin2'), '3s');
        });
       
    }).catch(error => {
        vr.route([messagePage], container);
                msg.innerHTML = error.message;
                display.show(msg, 'block');
                display.remove(document.querySelector('#signin2'));
                display.show(document.querySelector('#back-btn'), 'block');
    });
});



//CREATE BROADCAST CHANNEL
const channel = new BroadcastChannel('auth_channel');

channel.addEventListener('message', (e) => {
    if(e.data == 'login'){
        window.location.href = '/';
    }
})




//=====SIGN IN FORM CODE=====
document.querySelector('#signin-form').addEventListener('submit', (e) =>{

    e.preventDefault();

    const formData = new URLSearchParams(new FormData(document.querySelector('#signin-form')));

    fetch('/verifyUser', {
        method: 'post',
        body: formData
    }).then(res => {
        if(!res.ok){
            return res.json().then(errData => {
                throw new Error(errData);
            });
        }
        channel.postMessage('login');
        document.querySelector('#signin-form').submit();
    }).catch(error => {
        display.error(document.querySelector('#errMsg'), 'block', error.message);
    });

});

