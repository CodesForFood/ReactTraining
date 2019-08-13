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
        AuthorStore.addChangeListener(this._onAuthorChange.bind(this));     
        AuthorStore.addErrorListener(this._onAuthorError.bind(this));
    }

    removeAuthorListeners(){
        AuthorStore.removeChangeListener(this._onAuthorChange.bind(this));     
        AuthorStore.removeErrorListener(this._onAuthorError.bind(this));
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
        this.setState({authorState: {authErr: AuthorStore.getError()}});
    }

    _onAuthorChange(){
        this.setState({authorState: {authorList: AuthorStore.getAllAuthors()}});
    }
}