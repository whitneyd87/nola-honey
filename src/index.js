import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var domContainer = document.querySelector('#content-container');

var logo = document.getElementById('logo');

logo.addEventListener('click', function(){
	localStorage.clear();
});

ReactDOM.render(<App />, domContainer);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
