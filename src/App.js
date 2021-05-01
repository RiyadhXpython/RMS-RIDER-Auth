import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Blog from "./components/Blog/Blog";
import Contact from "./components/Conatact/Contact";
import Destination from "./components/Destination/Destination";
import Header from "./components/Header/Header";
import Home from './components/Home/Home';
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SelectDest from "./components/SelectDest/SelectDest";

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
         <Router> 
          <Header/>
          <Switch>
              <Route path="/home">
                <Home/>  
              </Route>
              <PrivateRoute exact path="/destination/:id">
                  <SelectDest/> 
              </PrivateRoute>
              <PrivateRoute exact path="/destination/:id/:placeFrom/:placeTo">
              <Destination />
              </PrivateRoute>
              <Route path="/blog">
                  <Blog/>
              </Route>
              <Route path="/contact">
                  <Contact/>
              </Route>
              <Route path="/login">
                    <Login/>
              </Route>
              <Route exact path="/">
                <Home/>
              </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
  );
}

export default App;
