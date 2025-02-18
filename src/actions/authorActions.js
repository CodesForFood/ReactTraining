import Dispatcher from '../dispatcher/appDispatcher';
import Axios from 'axios';

const PATH = "http://3.16.154.176:3000";


const AuthorActions = {
    getAllAuthors: function(){
        Axios.get(PATH + "/authors")
            .then((resp) => {
                const bookList = resp.data;
                Dispatcher.dispatch({
                    actionType: 'got_authors_success',
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
    addAuthor: function(author){
        Axios.post(PATH + "/author", author)
            .then((resp) =>{
                 //Work around since nodejs cant return the book object
                 author.author_id = resp.data.insertId;
                 const respAuthor = author;

                 Dispatcher.dispatch({
                     actionType: "add_author_success",
                     data: respAuthor
                 });
            })
            .catch((err) => {
                Dispatcher.dispatch({
                    actionType: 'show_error',
                    data: err.message
                });   
            });
    },
    updateAuthor: function (author){
        Axios.put(PATH + "/author", author)
            .then(() =>{
                Dispatcher.dispatch({
                    actionType: "update_author_success",
                    data: author
                });
            })
            .catch(err =>{
                Dispatcher.dispatch({
                    actionType: 'show_error',
                    data: err.message
                });   
            })
    },
    deleteAuthor: function(author){
        const isOk = confirm("Are you sure you want to delete this author?");

        if(isOk){
            Axios.delete(PATH + "/author/" + author.author_id)
                .then(() => {                  
                    Dispatcher.dispatch({
                        actionType: "delete_author_success",
                        data: author
                    });
                })
                .catch(err => {
                    Dispatcher.dispatch({
                        actionType: 'show_error',
                        data: err.message
                    });   
                })
        }
    },
    closePopup: function(){
        Dispatcher.dispatch({
            actionType: 'close_popup',             
        });
    },
    showPopup: function(method, author){
        Dispatcher.dispatch({
            actionType: 'show_popup',
            method: method,
            data: author
        });
    }
}


module.exports = AuthorActions;