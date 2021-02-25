import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Charts from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import realtimedemo from './reducer'



const store = createStore(realtimedemo)

render(
  <Provider store={store}>
    <Charts />
  </Provider>,
  document.getElementById('root')
)


