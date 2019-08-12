"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';


export class BookList extends React.Component{

    componentDidMount(){
        BookActions.readBooks();
    }

    updateBook(book){
        BookActions.getUpdateBookDetails(book);
    }

    deleteBook(book){
        BookActions.deleteBook(book);
    }

    addBook(){
        BookActions.createBook();
    }

    createBookRow(book){
        const authFirstName = book.first_name == null ? "" : book.first_name;
        const authLastName = book.last_name == null ? "" : book.last_name;

        return (
            <tr key={book.book_id}>
                <td> {book.title} </td>
                <td> {authFirstName + " " + authLastName} </td>
                <td><button type="button" onClick={ () => this.updateBook(book) }>Update</button></td>
                <td><button type="button" onClick={ () => this.deleteBook(book) }>Delete</button></td>
            </tr>
        );
    }   

    render() {
        return(
            <div>     
                <h1>Books</h1>                            
                <table className="table">                   
                    <thead>
                        <tr>                            
                            <th>Title <button type="button" onClick={ this.addBook }>Add Book</button></th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.bookList.map(this.createBookRow, this)}
                    </tbody>    
                </table>
            </div>
        );
    }
}

BookList.propTypes = {
    bookList: PropTypes.array.isRequired
};



