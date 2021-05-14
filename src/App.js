import React from 'react'
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './stores/store';
import Home from './components/Home';
import BoardView from './components/BoardView';

export default function App() {
  return (
    <Provider store = {store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact><Home /></Route>
          <Route path="/boardView"><BoardView /></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}