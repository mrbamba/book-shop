'use strict'

var gTrans = {
    pageTitle: {
        en: 'Welcome to Dan\'s Bookshop!',
        he: 'ברוכים הבאים לחנות הספרים של דן!'
    },
    'new-book-book-name': {
        en: 'Book Name?',
        he: 'שם הספר?',
    },
    'new-book-price': {
        en: 'Book Price?',
        he: 'מחיר הספר?',
    },
    'new-book-button': {
        en: 'Add new book',
        he: 'הוסף ספר'
    },
    'read': {
        en: 'Read',
        he: 'פרטים',
    },
    'update': {
        en: 'Update',
        he: 'עדכן',
    },
    'delete': {
        en: 'Delete',
        he: 'מחק',
    },
    'book-title': {
        en: 'Title',
        he: 'שם הספר',
    },
    'book-price': {
        en: 'Price ',
        he: 'מחיר',
    },
    'actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    'id': {
        en: 'ID',
        he: 'מזהה',
    },
    'rate': {
        en: 'Rate ',
        he: 'דרג את ',
    },
    add: {
        en: 'Add',
        es: 'Aggregar',
        he: 'הוסף',
    },
    sure: {
        en: 'Are you sure?',
        es: 'Estas Seguru?',
        he: 'בטוח נשמה?',
    },
    'copyright': {
        en: ' Dan Haski',
        he: ' דן חזקי'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    // if key is unknown return 'UNKNOWN'
    if (!gTrans[transKey]) return 'UNKNOWN'
    var transMap = gTrans[transKey];
    var trans = transMap[gCurrLang];
    // If translation not found - use english
    if (!trans) trans = transMap['en']
    return trans;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    for (var i=0; i < els.length; i++){
        var el = els[i]
        var transKey = el.dataset.trans;
        var trans = getTrans(transKey);

        if (el.nodeName === 'INPUT') el.placeholder = trans
        else el.innerText = trans;
    }
}

function setLang(lang) {
    gCurrLang = lang;
    if (gCurrLang==='he')setCurrency('&#8362;')
    else setCurrency('$')
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang,options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}


function relativeTime(ts) {
    return moment(ts).fromNow();
}