'use strict'

function onInit() {
    createBooks();
    renderBooks()
    doTrans();

}

function renderBooks() {
    var books = getBooks();
    console.log(books)
    var strHtml = books.map(function (book) {
        return `
     <tr>
         <td>${book.id}</td>
         <td>${book.name}</td>
         <td>${getCurrency()}${book.price}</td>
         <td><button class="btn btn-primary" onclick="onReadBook('${book.id}')" data-trans="read">Read</button></td>
         <td><button class="btn btn-warning" onclick="onUpdateBook('${book.id}')" data-trans="update">Update</button></td>
         <td><button class="btn btn-danger" onclick="onRemoveBook('${book.id}')" data-trans="delete">Delete</button></td>
     </tr>`
    })
    document.querySelector('.books-list').innerHTML = strHtml.join('');
    doTrans();

}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddNewBook() {
    var newBookName = document.querySelector('.new-book-book-name').value;
    var newBookPrice = document.querySelector('.new-book-price').value;

    createBooks(newBookName, newBookPrice)
    renderBooks()
    document.querySelector('.new-book-book-name').value='';
    document.querySelector('.new-book-price').value='';
}
function onUpdateBook(bookId){
    var bookPrice=+prompt('Please enter the new price:');
    updateBook(bookId, bookPrice);
    renderBooks()
}

function onReadBook(bookId){
    document.querySelector('.bg-modal').classList.toggle("hide");
    var bookName=getBookName(bookId)
    var strHtml=`<div class="close" onclick="onCloseModal()">+</div>
    <h1>${bookName}</h1>
    <p><img src="img/${bookName}.jpg" alt="${bookName}">
    </p>
    <p><span data-trans="book-price">Price</span>:${getCurrency()}${getBookPrice(bookId)}</p>
    <h3><span data-trans="rate">Rate</span> ${bookName}</h3>
    <p><button onclick="onChangeRate('${bookId}',-1)">-</button> ${getBookRate(bookId)} <button onclick="onChangeRate('${bookId}',1)">+</button>

    </p>`
    document.querySelector('.book-details').innerHTML=strHtml;
    doTrans();

}
function onCloseModal(){
    document.querySelector('.bg-modal').classList.toggle("hide");

}
function onChangeRate(bookId,dif){
    changeBookRate(bookId,dif);
    onCloseModal();
    onReadBook(bookId);
}

function onSortby(sortBy){
    console.log(sortBy);
    setSort(sortBy);
    
    // createBooks()
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang);
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
    renderBooks();
}
