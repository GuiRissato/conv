import React, { useEffect, useState } from "react";
import { Container, Line, Pack, RoundButton, Input } from "../../Pattern";
import { useNavigate } from 'react-router-dom';
import { useModal } from "../../Pattern/Modal";
import CreateUser from "./createUser";

import api from "../../interface/API";
import PUSHER from "../../interface/Pusher";

export default function Login(){

    const navigate = useNavigate();
    const { addModal } = useModal();
    const [userData, setUserData] = useState({ username:"", password:"" });

    async function handleCredentials(){

      if(userData.username !== "" && userData.password !== ""){

        await api.post('/login', userData)
        .then(async (res)=>{
            const { id, name } = res.data;
            const { username, password } = userData;

           let initPusher = await PUSHER.start({ cod: id, name, username, password });
           if(initPusher) navigate("chat")
        })
      }


    }

    return(
        <Container style={{ justifyContent:"center", alignItems:"center" }}>

            <Line>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <img src="/logo.png" alt="image" style={{ height: '5vh' }}/>
                </Pack>
            </Line>

            <Line>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input
                    onChange={(e)=> setUserData({...userData, username: e.target.value})}
                    placeholder={" usuário"}
                    />
                </Pack>
            </Line>

            <Line>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input
                    type="password"
                    onChange={(e)=> setUserData({...userData, password: e.target.value})}
                    placeholder={" senha"}
                    />
                </Pack>
            </Line>

            <Line>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <RoundButton onClick={()=> handleCredentials() }/>
                </Pack>
            </Line>

            <Line
            style={{
                justifyContent:"center",
                fontSize:'1.7vh',
                marginTop:'5vh'
            }}
            onClick={()=> addModal({
                body:<CreateUser/>,
                buttonPrimary: { label: "e pronto!" }
            })}>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                <div style={{ textAlign:"center" }}>
                Ainda não tá no conv.??<br/>
                <u>Criar novo usuário</u>
                </div>
                </Pack>
            </Line>

        </Container>
    )
}
