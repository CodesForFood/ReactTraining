"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import {BookList} from '../components/BookList';

export class Books extends React.Component{

    render() {
        return(
            <div>
                <BookList bookState={this.props.bookState}/>
            </div>
        );
    }
}

Books.propTypes = {
    bookState: PropTypes.object.isRequired    
};
