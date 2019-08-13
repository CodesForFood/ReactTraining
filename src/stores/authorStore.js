import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';
const ERROR = 'error';

let _authorStore = {
  authors: [],
  
};

let _authErr = {
    show: "none",
    msg: ""
};

class AuthorStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    addErrorListener(callback){
        this.on(ERROR, callback);
    }

    removeErrorListener(callback){
        this.removeListener(ERROR, callback);
    }

    emitError(){
        this.emit(ERROR);
    }

    getError(){
        return _authErr;
    }

    getAllAuthors(){
        return _authorStore.authors;
    }

    updateAuthorList(author){
        const index = _authorStore.authors.findIndex(elem => { return elem.author_id === author.author_id });
        _authorStore.authors[index] = author;
    }

    deleteAuthor(author){
        const newAuthorList = _authorStore.authors.filter(elem => { return elem.author_id !== author.author_id});
        _authorStore.authors = newAuthorList;
    }

}

const AuthorStore = new AuthorStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType) {
        case "got_authors_success":
            _authorStore.authors = action.data;
            AuthorStore.emitChange();
            break;
        case "add_author_success":
            _authorStore.authors.push(action.data);
            AuthorStore.emitChange();
            break;
        case "update_author_success":
            AuthorStore.updateAuthorList(action.data);
            AuthorStore.emitChange();
            break;
        case "delete_author_success":
            AuthorStore.deleteAuthor(action.data);
            AuthorStore.emitChange();
            break
        case 'show_error':
            _authErr.msg = action.data;
            _authErr.show = "block";
            AuthorStore.emitError();
            AuthorStore.emitChange(); 
            break;
        default:
            return;

    }
});

export default AuthorStore;