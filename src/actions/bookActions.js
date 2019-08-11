
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
                console.log(err);
            });               
    },
    updateBook : function(book){
        Axios.put("http://localhost:3000/book", book)
            .then((resp) => {
                    Dispatcher.dispatch({
                    actionType: "update_book_success",
                    data: book
                });
            })
            .catch((err) => {
                //do update_book_error action
                console.log(err);
            });
    },
    getUpdateBookDetails : function(book){
        const name = prompt("Whats the new name of the book?", book.title);
        const author = prompt("What is the new Author id?", book.author);

        const newBook = {
            book_id: book.book_id,
            title: name,
            author: author
        }

        this.updateBook(newBook);
    },
    createBook : function (){
        const name = prompt("What is the title of the new book?");
        const authorId = prompt("What is the Authors of this book id?");

        const newBook = {
            title: name,
            author: authorId
        }

        if(newBook.title){
            this.addBook(newBook);
        }
       
    },
    addBook: function (book) {
        Axios.post("http://localhost:3000/book", book)
            .then(resp => {
                //Work around since nodejs cant return the book object
                book.book_id = resp.data.insertId;
                const resBook = book;
                console.log(resp);
                Dispatcher.dispatch({
                    actionType: "added_book_success",
                    data: resBook
                })
            })
            .catch((err) => {
                console.log(err);
            });                
    }


}

module.exports = BooksActions;