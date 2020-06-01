'use strict'

function onInit() {
    createBooks();
    renderBooks()
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
         <td><button onclick="onReadBook('${book.id}')">Read</button></td>
         <td><button onclick="onUpdateBook('${book.id}')">Update</button></td>
         <td><button onclick="onRemoveBook('${book.id}')">Delete</button></td>
     </tr>`
    })
    strHtml.unshift(`<tr>
        <th>Id</th>
        <th onclick="onSortby('name')" style="cursor:pointer;">Title &#9660;</th>
        <th onclick="onSortby('price')" style="cursor:pointer;">Price &#9660;</th>
        <th colspan="3">Actions</th>
    </tr>`)
    document.querySelector('.books-list').innerHTML = strHtml.join('');
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
    <p>Price:${getCurrency()}${getBookPrice(bookId)}</p>
    <h3>Rate ${bookName}</h3>
    <p><button onclick="onChangeRate('${bookId}',-1)">-</button>${getBookRate(bookId)}<button onclick="onChangeRate('${bookId}',1)">+</button>

    </p>`
    document.querySelector('.book-details').innerHTML=strHtml;
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
