import React, { useEffect, useState } from "react";
import { Container, Line, Pack, RoundButton, Input } from "../../Pattern";
import { useNavigate } from 'react-router-dom';
import { useModal } from "../../Pattern/Modal";
import CreateUser from "./createUser";

import api from "../../interface/API";
import PUSHER from "../../interface/Pusher";

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../../interface/Redux/Modules/mainData";

export default function Login(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { addModal, closeModal, modalInfo } = useModal();
    const [userData, setUserData] = useState({ username:"", password:"" });
    const [newUser, setNewUser] = useState({});


    async function handleCredentials(){

      if(userData.username !== "" && userData.password !== ""){

        await api.post('/login', userData)
        .then(async (res)=>{
            const { id, name, color, thought } = res.data;
            const { username, password } = userData;

           let initPusher = await PUSHER.start({ cod: id, name, username, password });
           if(initPusher){ 
                Cookies.set('conv-id', id, { expires: 7 });
                Cookies.set('conv-name', name, { expires: 7 });
                Cookies.set('conv-username', username, { expires: 7 });

                let userData = {
                    cod:id,
                    name,
                    username,
                    color,
                    thought
                }

                dispatch(setUser(userData));
                navigate("chat");
            }
        })
      }


    }

    useEffect(()=>{
    if(modalInfo.visible == false){
        createUser();
        }
    },[modalInfo])

    async function createUser(){
        const { name, user_name, password, confirmPassword , color, active } = newUser;
        // console.log('newUser',name, user_name, password, confirmPassword , color, active)
        console.log("CRIANDO", newUser);
        if(
        (name !== "" && user_name !== "" && password !== "") 
        && 
        (password === confirmPassword)
        ){

        const userCreation = {
            'name': name,
            "user_name": user_name,
            "password": password,
            "color": color,
            "thought": "",
            "active":active
        }
        console.log(userCreation);
         await api.post("/createUser", userCreation)
         .then((res)=> console.log(res.data) )
         .catch((err)=> console.log(err))
        }
      
    }

    return(
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height: '97vh' }}>

           <form onSubmit={(e)=> e.preventDefault()}>

            <Line style={{ marginBottom:"0.5rem" }}>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <img src="/logo.png" alt="image" style={{ height: '5vh' }}/>
                </Pack>
            </Line>

            <Line style={{ marginBottom:"0.5rem" }}>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input
                    onChange={(e)=> setUserData({...userData, username: e.target.value})}
                    placeholder={" usuário"}
                    />
                </Pack>
            </Line>

            <Line style={{ marginBottom:"0.5rem" }}>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input
                    type="password"
                    onChange={(e)=> setUserData({...userData, password: e.target.value})}
                    placeholder={" senha"}
                    />
                </Pack>
            </Line>

            <Line style={{ marginBottom:"0.5rem" }}>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <RoundButton style={{ color:"#ffffff" }} type="submit" onClick={()=> handleCredentials() }>
                        Entrar
                    </RoundButton>
                </Pack>
            </Line>
            </form>     

            <Line
            style={{
                justifyContent:"center",
                fontSize:'1.7vh',
                marginTop:'5vh'
            }}
            onClick={()=> addModal({
                body:<CreateUser setNewUserAux={setNewUser} />,
                buttonPrimary: { label: "e pronto!", function:createUser }
            })}>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                <div style={{ textAlign:"center" }}>
                Ainda não tá no conv.??<br/>
                <u style={{ cursor:"pointer" }}>Criar novo usuário</u>
                </div>
                </Pack>
            </Line>

        </div>
    )
}
