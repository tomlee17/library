function Book(title, author, pages, read) {
    this.Title = title.value;
    this.Author = author.value;
    this['No.of pages'] = pages.value;
    this.readStatus = read.checked ? 'Read' : 'Not read';
}

let myLibrary = [];

const add = document.getElementById('add');
add.addEventListener('click', addBookToLib);

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const readStatus = document.getElementById("readStatus");
const inputFields = document.querySelectorAll('.inputField');

function addBookToLib(e) {
    e.preventDefault();
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    console.table(myLibrary);
    inputFields.forEach(function(input) {
        if (input.type === 'checkbox') input.checked = false;
        else input.value = '';
    })
    displayBook();
}

const bookContainer = document.getElementById('bookContainer');

function displayBook() {
    const bookCard = document.createElement('div');
    bookCard.classList.add('bookCard');
    // bookCard.setAttribute('id', `${myLibrary.length-1}`);
    bookContainer.appendChild(bookCard);

    const thisBook = myLibrary[myLibrary.length - 1];

    for (x in thisBook) {
        const bookInfo = document.createElement('div');
        if (x !== 'readStatus') {
            bookInfo.textContent = `${x}: ${thisBook[x]}`;
        } else {
            const cardReadButton = document.createElement('button');
            cardReadButton.classList.add('cardReadButton');
            cardReadButton.textContent = thisBook[x];

            const cardReadLabel = document.createElement('label');
            cardReadLabel.textContent = 'Read? '

            bookInfo.appendChild(cardReadLabel);
            bookInfo.appendChild(cardReadButton);

            cardReadButton.addEventListener('click', function(e) {
                thisBook[x] = (thisBook[x] === 'Read') ? 'Not read' : 'Read';
                cardReadButton.textContent = thisBook[x];
            })
        }
        bookCard.appendChild(bookInfo);
    }
    deleteBook(bookCard, thisBook);
}

function deleteBook(bookCard, whichBook) {
    const del = document.createElement('button');
    del.id = 'delete';
    del.textContent = 'Delete'
    bookCard.appendChild(del);
    del.addEventListener('click', function(e) {
        myLibrary.splice(myLibrary.indexOf(whichBook), 1);
        this.parentElement.remove();
        //   const bookCards = document.querySelectorAll('.bookCard');
    });
}