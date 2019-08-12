"use strict"

import React from 'react';
import PropTypes from 'prop-types';

import AuthorActions from '../actions/authorActions';


export class AuthorList extends React.Component {

    componentDidMount(){
        AuthorActions.getAllAuthors();
    }    

    createAuthorRow(author){
        return (
            <tr key={author.author_id}>
                <td> {author.first_name} </td>
                <td> {author.last_name} </td>
                <td><button type="button" onClick={ () => AuthorActions.updateAuthorDetails(author) } >Update</button></td>
                <td><button type="button" onClick={ () => AuthorActions.deleteAuthor(author) } >Delete</button></td>
            </tr>
        );
    }   

    render() {
        return(
            <div>     
                <h1>Authors</h1>      
                <button type="button" onClick={ () => AuthorActions.getNewAuthorDetails() } >Add Author</button>                      
                <table className="table">                   
                    <thead>
                        <tr>                            
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.authorList.map(this.createAuthorRow, this) }
                    </tbody>    
                </table>
            </div>
        );
    }

}

AuthorList.propTypes = {
    authorList: PropTypes.array.isRequired
};