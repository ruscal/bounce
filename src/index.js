import React from 'react';
import ReactDOM from 'react-dom';
import './styles/bounce.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store.js';
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={configureStore(true)}>
            <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
