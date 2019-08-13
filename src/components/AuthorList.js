"use strict"

import React from 'react';
import PropTypes from 'prop-types';

import AuthorActions from '../actions/authorActions';
import AuthorInputComp from './authorInputComp';


export class AuthorList extends React.Component {

    componentDidMount(){
        AuthorActions.getAllAuthors();
    }    

    createAuthorRow(author){
        return (
            <tr key={author.author_id}>
                <td> {author.first_name} </td>
                <td> {author.last_name} </td>
                <td><button type="button" onClick={ () => AuthorActions.showPopup("Update",author) } >Update</button></td>
                <td><button type="button" onClick={ () => AuthorActions.deleteAuthor(author) } >Delete</button></td>
            </tr>
        );
    }   

    ErrorComp(authErr){  
        return (
            <h3>{authErr.msg}</h3>
        )
    }

    getNewAuthor(){
        const author = {
            first_name:"",
            last_name: ""
        }
        return author;
    }

    render() {
        return(
            <div>     
                <h1>Authors</h1>      
                {this.props.authorState.authErr.show ? this.ErrorComp(this.props.authorState.authErr) : null}
                {this.props.authorState.popUp.togglePopup ? <AuthorInputComp popup={this.props.authorState.popUp} /> : null}          
                <table className="table">                   
                    <thead>
                        <tr>                            
                            <th>First Name <button type="button" onClick={ () => AuthorActions.showPopup("Add", this.getNewAuthor) } >Add Author</button></th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.authorState.authorList.map(this.createAuthorRow, this) }
                    </tbody>    
                </table>
            </div>
        );
    }

}

AuthorList.propTypes = {
    authorState: PropTypes.object.isRequired,
};