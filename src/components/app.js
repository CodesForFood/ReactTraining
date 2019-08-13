"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './header.js';
import {Home} from './home.js';

import {Books} from './books.js';
import {Authors} from "./authors.js";

import BookStore from '../stores/bookStore';
import AuthorStore from '../stores/authorStore';


export class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bookState: {
                bookList:[],
                bookErr: {
                    show: false,
                    msg: ""
                },
                popUp: {
                    togglePopup: false,
                    method: "",
                    book: {}
                }
                
            },
            authorState: {
                authorList:[],
                authErr: {
                    show: false,
                    msg: ""
                },
                popUp: {
                    togglePopup: false,
                    method: "",
                    author: {}
                }
            }           
        };
    }

    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/books' render={(props) => (<Books {...props} bookState={this.state.bookState}/>)}/>
                    <Route path='/authors' render={ (props) => (<Authors {...props} authorState={this.state.authorState} />)}/>
                </Switch>
            </div>
        );
    }

    addBookListeners(){
        BookStore.addBookListeners(
            this._onBookChange.bind(this),
            this._onBookError.bind(this), 
            this._onToggleBookPopup.bind(this) 
        );              
    }

    removeBookListeners(){
        BookStore.removeBookListeners(
            this._onBookChange.bind(this),
            this._onBookError.bind(this), 
            this._onToggleBookPopup.bind(this) 
        );    
    }

    

    addAuthorListeners(){
        AuthorStore.addAuthorListeners(
            this._onAuthorChange.bind(this),
            this._onAuthorError.bind(this),
            this._onToggleAuthorPopup.bind(this)
        )

    }
    removeAuthorListeners(){
        AuthorStore.removeAuthorListeners(
            this._onAuthorChange.bind(this),
            this._onAuthorError.bind(this),
            this._onToggleAuthorPopup.bind(this)
        )      
    }

    componentDidMount(){
       this.addBookListeners();
       this.addAuthorListeners();
     
    }

    componentWillUnmount(){
       this.removeBookListeners(); 
       this.removeAuthorListeners();        
    }

    _onToggleBookPopup(){
        const newState = this.state.bookState;
        newState.popUp = BookStore.getPopup();
        newState.popUp.togglePopup = !newState.popUp.togglePopup;
        this.setState({ newState });
    }

    _onBookError(){
        const newState = this.state.bookState;
        newState.bookErr = BookStore.getError();
        this.setState({ newState });
    }  

    _onBookChange(){
        const newState = this.state.bookState;
        newState.bookList = BookStore.getAllBooks();
        this.setState({ newState });     
    }


    _onAuthorError(){
        const newState = this.state.authorState;
        newState.authErr = AuthorStore.getError();
        this.setState({ newState });
    }

    _onAuthorChange(){
        const newState = this.state.authorState;
        newState.authorList = AuthorStore.getAllAuthors();
        this.setState({ newState });  
    }

    _onToggleAuthorPopup(){
        const newState = this.state.authorState;
        newState.popUp = AuthorStore.getPopup();
        newState.popUp.togglePopup = !newState.popUp.togglePopup;
        this.setState({ newState });
    }
}