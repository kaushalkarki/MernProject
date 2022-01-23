import React, { createContext, useReducer } from 'react';

import './App.css';
import "bootstrap/dist/css/bootstrap.css";

import Navbar from './components/Navbar';
import Home from './components/Home';
import {Route,Routes} from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login"
import Signup from './components/Signup';
import ErrorPage from './components/ErrorPage';
import Logout from "./components/Logout";
import {initialState,reducer} from "../src/reducer/UseReducer";



export const UserContext =createContext();

const Routing=()=>{
  return(
    <>
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/about" element={<About/>}/>
    <Route exact path="/contact" element={<Contact/>}/>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path="/signup" element={<Signup/>}/>
    <Route exact path="/logout" element={<Logout/>}/>
    <Route path="*" element={<ErrorPage/>} />
    </Routes>

    </>
  )
};

function App() {
  const[state,dispatch]=useReducer(reducer,initialState);

  return (
<>
    <UserContext.Provider value={{state,dispatch}}>
    <Navbar/>
    <Routing/>
    </UserContext.Provider>
    </>
  );
}

export default App;
