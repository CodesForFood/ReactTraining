import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';




class BookInputComp extends React.Component {

    constructor(props){
        super(props);    

        this.state = {
            title: this.props.popup.book.title ? this.props.popup.book.title : "",
            authId: this.props.popup.book.author ? this.props.popup.book.author : ""
        }     

        this.handleChange = this.handleChange.bind(this);        
    }

    handleSubmit(){        
        switch(this.props.popup.method){
            case "Update":
                var updatedBook = {
                    book_id: this.props.popup.book.book_id,
                    title: this.state.title,
                    author: this.state.authId
                }
                BookActions.updateBook(updatedBook);
                break;
            case "Add":
                var newBook ={
                    title: this.state.title,
                    author: this.state.authId
                }
                BookActions.addBook(newBook);
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
                        <h1>{this.props.popup.method} a Book</h1>    
                    </div>                     
                    <div>
                        <label> Title:  
                            <input type="text" name="title" defaultValue={this.props.popup.book.title} onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div>
                        <label> Author Id: 
                            <input type="text" name="authId" defaultValue={this.props.popup.book.author} onChange={this.handleChange} pattern='^[0-9]$'/>
                        </label>
                    </div>                    
                    <button onClick={ () => this.handleSubmit() }>Submit</button>
                    <button onClick={ () => BookActions.closePopup()}>Cancle</button>
                </div>
            </div>
        );
    }
}

export default BookInputComp;

BookInputComp.propTypes = {
    popup: PropTypes.object.isRequired
};