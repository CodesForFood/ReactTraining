import Dispatcher from '../dispatcher/appDispatcher';
import Axios from 'axios';


const AuthorActions = {
    getAllAuthors: function(){
        Axios.get("http://localhost:3000/authors")
            .then((resp) => {
                const bookList = resp.data;
                Dispatcher.dispatch({
                    actionType: 'got_authors_success',
                    data: bookList
                });
            })
            .catch( (err) =>{
                console.log(err);
            });               
    },
    getNewAuthorDetails : function() {
        const firstName = prompt("What is the Authors first name?");
        const lastName = prompt("What is the Authors last name?");

        if(firstName && lastName){
            const newAuthor = {
                first_name : firstName,
                last_name: lastName
            }

            this.addAuthor(newAuthor);
        }
    },
    addAuthor: function(author){
        Axios.post("http://localhost:3000/author", author)
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
                console.log(err);
            });
    },
    updateAuthorDetails: function(author) {
        const firstName = prompt("What is the Authors first name?", author.first_name);
        const lastName = prompt("What is the authors last name?", author.last_name);

        const newAuthor = {
            author_id : author.author_id,
            first_name: firstName,
            last_name: lastName
        }

        this.updateAuthor(newAuthor);
    },
    updateAuthor: function (author){
        Axios.put("http://localhost:3000/author", author)
            .then(() =>{
                Dispatcher.dispatch({
                    actionType: "update_author_success",
                    data: author
                });
            })
            .catch(err =>{
                console.log(err);
            })
    },
    deleteAuthor: function(author){
        const isOk = confirm("Are you sure you want to delete this author?");

        if(isOk){
            Axios.delete("http://localhost:3000/author/" + author.author_id)
                .then(() => {                  
                    Dispatcher.dispatch({
                        actionType: "delete_author_success",
                        data: author
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}


module.exports = AuthorActions;