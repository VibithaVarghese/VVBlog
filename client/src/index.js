import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes,Route, } from "react-router-dom";
import App from './App';
import Header from './components/Header';
import Login from './components/Login';
import GlobalStyles from './GlobalStyles';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <GlobalStyles></GlobalStyles>
        <Header></Header>
        <Routes>            
            <Route path="/" element={<App />} />
            <Route path="/Login" element={<Login />} />
        </Routes>
    </BrowserRouter>
);


