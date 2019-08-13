"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { AuthorList } from './AuthorList';

export class Authors extends React.Component{

    render() {
        return(
            <div>
                <AuthorList authorState={this.props.authorState} />
            </div>
        );
    }
}

Authors.propTypes = {
    authorState: PropTypes.object.isRequired
};
