"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import BookInputComp from './bookInputComp'


export class BookList extends React.Component{

    componentDidMount(){
        BookActions.readBooks();
    }  

    createBookRow(book){
        const authFirstName = book.first_name == null ? "" : book.first_name;
        const authLastName = book.last_name == null ? "" : book.last_name;

        return (
            <tr key={book.book_id}>
                <td> {book.title} </td>
                <td> {authFirstName + " " + authLastName} </td>
                <td><button type="button" onClick={ () => BookActions.showPopup("Update", book) }>Update</button></td>
                <td><button type="button" onClick={ () => BookActions.deleteBook(book) }>Delete</button></td>
            </tr>
        );
    }  

    ErrorComp(bookErr){  
        return (
            <h3>{bookErr.msg}</h3>
        )
    }
    emptyBook(){
        const book = {
            title:'',
            author: ''
        }
        return book;
    }

    render() {
        return(
            <div>     
                <h1>Books</h1>                
                {this.props.bookState.bookErr.show ? this.ErrorComp(this.props.bookState.bookErr) : null}
                {this.props.bookState.popUp.togglePopup ? <BookInputComp popup={this.props.bookState.popUp}/> : null}
                <table className="table">                   
                    <thead>
                        <tr>                            
                            <th>Title <button type="button" onClick={ () => BookActions.showPopup("Add", this.emptyBook) }>Add Book</button></th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.bookState.bookList.map(this.createBookRow, this)}
                    </tbody>    
                </table>
            </div>
        );
    }
}



BookList.propTypes = {
   bookState: PropTypes.object.isRequired
};



