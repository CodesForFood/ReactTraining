"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { AuthorList } from './AuthorList';

export class Authors extends React.Component{

    render() {
        return(
            <div>
                <AuthorList authorList = {this.props.authorList} authErr={this.props.authErr} />
            </div>
        );
    }
}

Authors.propTypes = {
    authorList: PropTypes.array.isRequired,
    authErr: PropTypes.object.isRequired
};
