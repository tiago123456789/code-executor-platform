import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import NewCodeSnippet from './pages/NewCodeSnippet';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"
import Login from './pages/Login';
import Gists from './pages/Gists';
import UpdateCodeSnippet from "./pages/UpdateCodeSnippet"
import CodeShareSnippet from "./pages/CodeShareSnippet"
import PrivateRoute from './components/auth/PrivateRoute';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

ReactDOM.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <>
          <Header />
          <PrivateRoute exact path="/gists" component={Gists} />
          <PrivateRoute exact path="/snippet-code/:id/edit" component={UpdateCodeSnippet} />
          <PrivateRoute exact path="/code-share/:id/:token" component={CodeShareSnippet} />
          <PrivateRoute exact path="/snippet-code/new" component={NewCodeSnippet} />
        </>
      </Switch>
      <Redirect to="/login" />
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);