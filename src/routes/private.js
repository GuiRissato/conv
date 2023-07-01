import React, { useEffect } from "react";

import { Outlet } from 'react-router-dom';

import MainLayout from '../Pattern/MainLayout';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';
import PUSHER from "../interface/Pusher";
import { store } from "../interface/Redux";
import { setUser } from "../interface/Redux/Modules/mainData";
import api from "../interface/API";

const Private = ({ children }) => {

    let navigate = useNavigate();

    useEffect(()=>{
     (async()=>{ 
    if(!Cookies.get("conv-id")) {
        navigate("/login");
    }else{

    const cod = parseInt(Cookies.get('conv-id'));

    await api.get(`/userInfo/${parseInt(cod)}`)
    .then((res)=>{

      const { id, user_name, name, color, thought } = res.data[0];

      let userData = {
        cod:id,
        name,
        username: user_name,
        color,
        thought
      }

        store.dispatch(setUser(userData));
        PUSHER.start({ cod, name, username: user_name })
        navigate("/chat");
    })
    }
  })()

    },[])

    return (
      <MainLayout>
        {children?children:<Outlet/>}
      </MainLayout>
    )
 }

 export default Private;