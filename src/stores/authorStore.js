import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';
const ERROR = 'error';

let _authorStore = {
  authors: [],
  authErr: {
    show: "none",
    msg: ""
  },
  popUp:{

  }
  
};

class AuthorStoreClass extends EventEmitter{

    addAuthorListeners(changeCB, errorCB, popupCB){
        this.on(CHANGE_EVENT, changeCB);
        this.on(ERROR, errorCB);
        this.on('toggle_popup', popupCB);
    }

    removeAuthorListeners(changeCB, errorCB, popupCB){
        this.removeListener(CHANGE_EVENT, changeCB);
        this.removeListener(ERROR, errorCB);
        this.removeListener("toggle_popup", popupCB);
    }

    emitChange(){ this.emit(CHANGE_EVENT); }
    emitError() { this.emit(ERROR); }
    emitTogglePopup() { this.emit("toggle_popup"); }

    getError(){ return _authorStore.authErr; }
    getAllAuthors() { return _authorStore.authors; }
    getPopup(){ return _authorStore.popUp; }


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
            _authorStore.authErr.show = false;
            AuthorStore.emitError();
            AuthorStore.emitChange();
            break;
        case "add_author_success":
            _authorStore.authors.push(action.data);
            _authorStore.authErr.show = false;
            AuthorStore.emitTogglePopup();  
            AuthorStore.emitError();
            AuthorStore.emitChange();
            break;
        case "update_author_success":
            AuthorStore.updateAuthorList(action.data);
            _authorStore.authErr.show = false;
            AuthorStore.emitTogglePopup();  
            AuthorStore.emitError();
            AuthorStore.emitChange();
            break;
        case "delete_author_success":
            AuthorStore.deleteAuthor(action.data);
            _authorStore.authErr.show = false;
            AuthorStore.emitError();
            AuthorStore.emitChange();
            break
        case 'show_error':
            _authorStore.authErr.msg = action.data;
            _authorStore.authErr.show = true;
            AuthorStore.emitError();
            AuthorStore.emitChange(); 
            break;
        case 'close_popup':   
            AuthorStore.emitTogglePopup();   
            break;
        case 'show_popup':     
            _authorStore.popUp.method = action.method;
            _authorStore.popUp.author = action.data;          
            AuthorStore.emitTogglePopup();         
            break;
        default:
            return;

    }
});

export default AuthorStore;