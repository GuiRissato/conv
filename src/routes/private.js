import React, { useEffect } from "react";

import { Outlet } from 'react-router-dom';

import MainLayout from '../Pattern/MainLayout';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';
import PUSHER from "../interface/Pusher";

const Private = ({ children }) => {

    let navigate = useNavigate();

    useEffect(()=>{
    if(!Cookies.get("conv-id")) {
        navigate("/login");
    }else{

        const cod = parseInt(Cookies.get('conv-id'));
        const name = Cookies.get('conv-name');
        const username = Cookies.get('conv-username');

        PUSHER.start({ cod, name, username })

        navigate("/chat");
    }

    },[])

    return (
      <MainLayout>
        {children?children:<Outlet/>}
      </MainLayout>
    )
 }

 export default Private;