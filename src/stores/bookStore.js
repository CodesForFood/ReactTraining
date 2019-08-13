import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

//actually just reads books
const CHANGE_EVENT = 'change';

const ERROR = 'error';

let _bookStore = {
  books: [],
  bookErr: {
    show: false,
    msg: ""
  },
  popUp: {
    method: "",
    togglePopup: false,
    book: {}
  }
};

class BookStoreClass extends EventEmitter{

    addBookListeners(changeCB, errCB, popupCB){
        this.on(CHANGE_EVENT, changeCB);
        this.on(ERROR, errCB);
        this.on("togglePopup", popupCB);
    }

    removeBookListeners(changeCB, errCB, popupCB){
        this.removeListener(CHANGE_EVENT, changeCB);
        this.removeListener(ERROR, errCB);
        this.removeListener("togglePopup", popupCB);
    }    

    emitTogglePopup(){ this.emit("togglePopup"); }
    emitError(){ this.emit(ERROR); }
    emitChange(){ this.emit(CHANGE_EVENT); }

    getAllBooks(){
        return _bookStore.books;
    }

    getError(){
        return _bookStore.bookErr;
    }

    getPopup(){
        return _bookStore.popUp;
    }

    updateBook(book){
        const index = _bookStore.books.findIndex((elem) => { return elem.book_id === book.book_id});
        _bookStore.books[index] = book;        
    }

    deleteBook(book){
        const newBooks = _bookStore.books.filter(elem => {return elem.book_id !== book.book_id});
        _bookStore.books = newBooks;
    }

}

const BookStore = new BookStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_books':
            _bookStore.books = action.data;
            _bookStore.bookErr.show = false;
            BookStore.emitError();
            BookStore.emitChange();
            break;
        case 'update_book_success':
            BookStore.updateBook(action.data);   
            _bookStore.bookErr.show = false; 
            BookStore.emitTogglePopup();
            BookStore.emitError();
            BookStore.emitChange();
            break;
        case 'added_book_success':
            _bookStore.books.push(action.data);      
            _bookStore.bookErr.show = false;
            BookStore.emitTogglePopup();
            BookStore.emitError();
            BookStore.emitChange();
            break;
        case 'delete_book_success':
            BookStore.deleteBook(action.data);
            BookStore.emitError();
            BookStore.emitChange();
            break; 
        case 'show_error':
            _bookStore.bookErr.msg = action.data;
            _bookStore.bookErr.show = true;
            BookStore.emitTogglePopup();
            BookStore.emitError();
            break;
        case 'close_popup':   
            BookStore.emitTogglePopup();   
            break;
        case 'show_popup':     
            _bookStore.popUp.method = action.method;
            _bookStore.popUp.book = action.data;          
            BookStore.emitTogglePopup();         
            break;
        default:
            return;
    }
} );

export default BookStore;