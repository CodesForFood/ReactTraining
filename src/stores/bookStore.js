import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';


const CHANGE_EVENT = 'change';

let _bookStore = {
  books: []
};

class BookStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllBooks(){
        return _bookStore.books;
    }

    updateBook(book){
        let index = _bookStore.books.findIndex((elem) => { return elem.book_id === book.book_id});
        _bookStore.books[index] = book;        
    }

}

const BookStore = new BookStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_books':
            _bookStore.books = action.data;
            BookStore.emitChange();
            break;
        case 'update_book_success':
            BookStore.updateBook(action.data);
            BookStore.emitChange();
            break;
        case 'added_book_success':
            _bookStore.books.push(action.data);
            BookStore.emitChange();
            break;
        default:
            return;
    }
} );

export default BookStore;