const { ipcRenderer } = require('electron');

const loadingSpan = document.querySelector('.loading')
const authButton = document.querySelector('.authorization');
const body = document.querySelector('body');
const openOverlay = document.querySelector('.open-overlay');

//loggin();

authButton.addEventListener('click', () => {
    authorization();
});

openOverlay.addEventListener('click', () => {
    ipcRenderer.send('open-overlay');
});

ipcRenderer.on('logged', () => { loggin() });

function loggin() {

    authButton.classList.add('hide')
    loadingSpan.classList.remove('hide');
    const xhr = new XMLHttpRequest()

    xhr.open('GET', '/logging');

    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('AccessToken is valid!')
                const about = JSON.parse(xhr.responseText);
                console.log(about);
                authButton.classList.add('hide')
                displayInformation(about)
                openOverlay.classList.remove('hide')


                loadingSpan.classList.add('hide')
            } else if (xhr.status === 401) {
                console.log('AccessToken is not valid!')
                authButton.classList.remove('hide')
                loadingSpan.classList.add('hide')
            }
        }
    }

    xhr.send();
}

function authorization() {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', '/authorization');

    xhr.onload = () => {
        if (xhr.readyState = XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(`Response: ${xhr.responseText}`);
                ipcRenderer.send('main-auth-url', {
                    code: 200,
                    url: xhr.responseText
                })
            }

        } else {
            console.log(`Error response: ${xhr.readyState}`)
        }
    }

    xhr.send();

    if(!isRunWaitAuth) {
        isRunWaitAuth = true;
        wait_authorization();
    }

}

let isRunWaitAuth = false;

function wait_authorization() {
        fetch('/authorization-status')
            .then(r => r.json())
            .then(isAuth => {
                if (isAuth) {
                    isRunWaitAuth = false;
                    loggin();
                } else {
                    setTimeout(wait_authorization, 2000);
                }
            }).catch(error => {
                console.error(`Помилка: ${error}`)
            });
    
}

function displayInformation(about) {
    const span = document.createElement('span');
    span.innerText = JSON.stringify(about, null, 2);
    body.appendChild(span)
}