
import Dispatcher from '../dispatcher/appDispatcher';
import Axios from 'axios';

//Here add all crud actions for Books

const BooksActions = {
    readBooks: function(){
        Axios.get("http://localhost:3000/books")
            .then((resp) => {
                const bookList = resp.data;
                Dispatcher.dispatch({
                    actionType: 'read_books',
                    data: bookList
                });
            })
            .catch( (err) =>{
                Dispatcher.dispatch({
                    actionType: 'show_error',
                    data: err.message
                });
            });               
    },
    updateBook : function(book){
        Axios.put("http://localhost:3000/book", book)
            .then(() => {                
                if(book.author != 0 && book.author !== null){
                    this.getAuthorOfBook(book, (newBook) => {
                        Dispatcher.dispatch({
                            actionType: "update_book_success",
                            data: newBook
                        });
                    });  
                }
                else{
                    Dispatcher.dispatch({
                        actionType: "update_book_success",
                        data: book
                    });
                }                                         
            })
            .catch((err) => {               
                Dispatcher.dispatch({
                    actionType: 'show_error',
                    data: err.message
                });                
            });
    },
    getAuthorOfBook : function(book, callback) {
        Axios.get('http://localhost:3000/author/' + book.author)
            .then((resp) => {            
                book.first_name = resp.data[0].first_name;
                book.last_name = resp.data[0].last_name;
                callback(book);
            })
            .catch((err) => {              
                Dispatcher.dispatch({
                    actionType: 'show_error',
                    data: err.message
                });   
            });
    },    
    addBook: function (book) {
        Axios.post("http://localhost:3000/book", book)
            .then(resp => {
                //Work around since nodejs cant return the book object
                book.book_id = resp.data.insertId;
                const resBook = book;
                if(book.author != 0 && book.author !== null){
                    this.getAuthorOfBook(resBook, (newBook) =>{
                        Dispatcher.dispatch({
                            actionType: "added_book_success",
                            data: newBook
                        });
                    }); 
                }
                else{
                    Dispatcher.dispatch({
                        actionType: "added_book_success",
                        data: resBook
                    });
                }
                              
            })
            .catch((err) => {
                Dispatcher.dispatch({
                    actionType: 'show_error',
                    data: err.message
                });   
            });                
    },
    deleteBook: function(book){
        var isOK = confirm("You will delete this book.");
        if(isOK){
            Axios.delete("http://localhost:3000/book/"+ book.book_id)
                .then(() => {
                    Dispatcher.dispatch({
                        actionType: "delete_book_success",
                        data: book
                    });
                })
                .catch( err => {
                    Dispatcher.dispatch({
                        actionType: 'show_error',
                        data: err.message
                    });   
                });
        }
    },
    closePopup: function(){
        Dispatcher.dispatch({
            actionType: 'close_popup',             
        });
    },
    showPopup: function(method, book) {
        Dispatcher.dispatch({
            actionType: 'show_popup',
            method: method,
            data: book
        });
    }
}

module.exports = BooksActions;