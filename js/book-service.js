'use strict'

var gBooks = createBooks();
var gSort = 'name'
var gCurrency = '$'

function createBooks(bookName, price) {
    var books = loadFromStorage('books');
    var bookNames = ['Annabel', 'Annihilation', 'Atonement']
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < bookNames.length; i++) {
            books.push(createBook(bookNames[i]))
        }
    } else if (bookName) {
        books.push(createBook(bookName, price))
    }
    gBooks = books;
    // books = getBooksForDisplay()
    saveToStorage('books', books);
    return gBooks;
}

function createBook(bookName, price = getRandomIntInclusive(2, 20)) {
    return {
        id: makeId(),
        name: bookName,
        price: price,
        rate: 0,
        imgUrl: bookName + '.jpg',
        rate: 0
    }
}

function getBookRate(bookId) {
    var bookIndex = _getBookIndex(bookId);
    return gBooks[bookIndex].rate;

}
function changeBookRate(bookId, dif) {
    var bookIndex = _getBookIndex(bookId);
    if (gBooks[bookIndex].rate >= 0 && gBooks[bookIndex].rate <= 10) {
        gBooks[bookIndex].rate += dif;
    }
    if (gBooks[bookIndex].rate === -1) gBooks[bookIndex].rate = 0;
    if (gBooks[bookIndex].rate === 11) gBooks[bookIndex].rate = 10;

    saveToStorage('books', gBooks);
}

function setSort(sortBy) {
    gSort = sortBy;
    if (sortBy === 'price') {
        _sortByPrice()
    } else {
        _sortByName()
    }
}

function _sortByName() {
    gBooks.sort(function (bookA, bookB) {
        var nameA = bookA.name.toUpperCase(); // ignore upper and lowercase
        var nameB = bookB.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    saveToStorage('books', gBooks);

}
function _sortByPrice() {
    gBooks.sort((bookA, bookB)=> bookA.price - bookB.price);
    saveToStorage('books', gBooks);

}


function removeBook(bookId) {
    console.log(bookId)

    if (confirm('Are you sure you want to delete this item?')) {
        var bookIndex = _getBookIndex(bookId);
        gBooks.splice(bookIndex, 1);
        saveToStorage('books', gBooks);
    }
}

function updateBook(bookId, bookPrice) {
    console.log(bookId, bookPrice)

    var bookIndex = _getBookIndex(bookId);
    gBooks[bookIndex].price = bookPrice;
    saveToStorage('books', gBooks);


}

function getBookName(bookId) {
    var bookIndex = _getBookIndex(bookId);
    return gBooks[bookIndex].name;

}

// Helper functions
function getBooks() {
    return gBooks;
}

function _getBookIndex(bookId) {
    var index = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    return index;

}

function getCurrency() {
    return gCurrency;
}
function setCurrency(symbol){
    gCurrency=symbol;
}

function getBookPrice(bookId) {
    var bookIndex = _getBookIndex(bookId);
    return gBooks[bookIndex].price;
}