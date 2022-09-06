document.addEventListener("DOMContentLoaded", function() {
    bookTitles();
});

const booksList = document.querySelector('ul#list')
const showPanel = document.querySelector('div#show-panel')


function bookTitles(){
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(renderTitles);
    })
    .catch(error => console.log(error));
}

function renderTitles(book){
    const li = document.createElement('li')
    li.textContent = book.title;
    
    booksList.appendChild(li);

    li.addEventListener('click', ()=>showDetails(book))
}

function showDetails(book){
    showPanel.replaceChildren();

    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    const h5 = document.createElement('h5');
    const p = document.createElement('p');
    const ul = document.createElement('ul');
    const btn = document.createElement('button')
    

    img.src = book.img_url;
    h3.textContent = book.title;
    h4.textContent = book.subtitle;
    h5.textContent = book.author;
    p.innerText = book.description;
    btn.textContent = 'LIKE'
    
    const users = book.users;
    users.forEach((user)=> {
        const li = document.createElement('li');
        li.textContent = user.username;
        ul.appendChild(li);
    })

    btn.addEventListener('click', ()=>likeABook(book));

    showPanel.append(img, h3, h4, h5, p, ul, btn);
}

const newUser = {id: 12, username: 'Jimmy'}
function likeABook(book){
    const btn = document.querySelector('button');
    const ul = document.querySelector('#show-panel ul')
    if(btn.textContent === 'LIKE'){
        btn.textContent = 'UNLIKE';
        const li = document.createElement('li');
        li.textContent = newUser.username;
        li.id = newUser.id;
        ul.appendChild(li);

        fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                users: [...book.users, newUser]
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    } else {
        btn.textContent = 'LIKE';
        document.getElementById(newUser.id).remove();

        fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                users: [...book.users]
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
}

