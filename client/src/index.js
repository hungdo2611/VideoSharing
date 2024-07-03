import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ChakraProvider } from "@chakra-ui/react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Socket from './socket'

import { Home, Login, Register, PageNotFound, ShareVideo } from "./pages";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/share" element={<ShareVideo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/product/*" element={<PageNotFound />} />
        </Routes>
      </Provider>
    </ChakraProvider>
    <ToastContainer />
    <Socket />
  </BrowserRouter>
);
export default root;