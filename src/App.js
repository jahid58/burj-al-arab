import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Header from './components/Header/Header';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
export const MyContext = createContext([])
function App() {
 
  const [loggedUser,setLoggedUser] = useState({})
  return (
    <MyContext.Provider value={[loggedUser,setLoggedUser]}>
      <Router>
          <Header/>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRouter path="/book/:bedType">
              <Book />
            </PrivateRouter>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
      </MyContext.Provider>
  );
}

export default App;
