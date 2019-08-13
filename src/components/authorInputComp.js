import React from 'react';
import PropTypes from 'prop-types';
import AuthorActions from '../actions/authorActions';




class AuthorInputComp extends React.Component {

    constructor(props){
        super(props);    

        this.state = {
            first_name: this.props.popup.author.first_name ? this.props.popup.author.first_name : "",
            last_name: this.props.popup.author.last_name ? this.props.popup.author.last_name : ""
        }     

        this.handleChange = this.handleChange.bind(this);        
    }

    handleSubmit(){        
        switch(this.props.popup.method){
            case "Update":
                var updatedAuthor = {
                    author_id: this.props.popup.author.author_id,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name
                }
                AuthorActions.updateAuthor(updatedAuthor);
                break;
            case "Add":
                var newAuthor ={
                    first_name: this.state.first_name,
                    last_name: this.state.last_name
                }
                AuthorActions.addAuthor(newAuthor);
                break;
            default:
                return;
        }
        
    }    

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

  

    render() {
        return (
            <div className='popup'>  
                <div className='popupInner'> 
                    <div>
                        <h1>{this.props.popup.method} an Author</h1>    
                    </div>                     
                    <div>
                        <label> First Name:  
                            <input type="text" name="first_name" defaultValue={this.props.popup.author.first_name} onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div>
                        <label> Last Name:  
                            <input type="text" name="last_name" defaultValue={this.props.popup.author.last_name} onChange={this.handleChange}/>
                        </label>
                    </div>                    
                    <button onClick={ () => this.handleSubmit() }>Submit</button>
                    <button onClick={ () => AuthorActions.closePopup()}>Cancle</button>
                </div>
            </div>
        );
    }
}

export default AuthorInputComp;

AuthorInputComp.propTypes = {
    popup: PropTypes.object.isRequired
};