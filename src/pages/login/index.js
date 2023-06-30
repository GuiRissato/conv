import React, { useEffect, useState } from "react";
import { Container, Line, Pack, RoundButton, Input } from "../../Pattern";
import { useNavigate } from 'react-router-dom';
import { useModal } from "../../Pattern/Modal";
import CreateUser from "./createUser";

import api from "../../interface/API";
import PUSHER from "../../interface/Pusher";

import Cookies from "js-cookie";

export default function Login(){

    const navigate = useNavigate();
    const { addModal, closeModal } = useModal();
    const [userData, setUserData] = useState({ username:"", password:"" });
    const [newUser, setNewUser] = useState({});


    useEffect(()=>{

        if(Cookies.get('conv-id')){
        const cod = parseInt(Cookies.get('conv-id'));
        const name = Cookies.get('conv-name');
        const username = Cookies.get('conv-username');

        PUSHER.start({ cod, name, username })

        navigate("/chat");
        }

    },[])


    async function handleCredentials(){

      if(userData.username !== "" && userData.password !== ""){

        await api.post('/login', userData)
        .then(async (res)=>{
            const { id, name } = res.data;
            const { username, password } = userData;

           let initPusher = await PUSHER.start({ cod: id, name, username, password });
           if(initPusher){ 
                Cookies.set('conv-id', id, { expires: 7 });
                Cookies.set('conv-name', name, { expires: 7 });
                Cookies.set('conv-username', username, { expires: 7 });
                navigate("chat");
            }
        })
      }


    }

    async function createUser(){
        const { name, user_name, password, confirmPassword } = newUser;

        if(
        (name !== "" && user_name !== "" && password !== "") 
        && 
        (password === confirmPassword)
        ){

        delete newUser.confirmPassword
        console.log(newUser);    
         await api.post("/createUser", newUser)
         .then((res)=> console.log(res.data) )
         .catch((err)=> console.log(err))
        }
      
    }

    return(
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height: '97vh' }}>

           <form onSubmit={(e)=> e.preventDefault()}>
            <Line style={{ margin:"0.5rem" }}>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <img src="/logo.png" alt="image" style={{ height: '5vh' }}/>
                </Pack>
            </Line>

            <Line style={{ margin:"0.5rem" }}>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input
                    onChange={(e)=> setUserData({...userData, username: e.target.value})}
                    placeholder={" usuário"}
                    />
                </Pack>
            </Line>

            <Line style={{ margin:"0.5rem" }}>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input
                    type="password"
                    onChange={(e)=> setUserData({...userData, password: e.target.value})}
                    placeholder={" senha"}
                    />
                </Pack>
            </Line>

            <Line style={{ margin:"0.5rem" }}>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <RoundButton type="submit" onClick={()=> handleCredentials() }/>
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
                buttonPrimary: { label: "e pronto!", function: ()=> createUser() }
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
