import React, { useEffect, useState } from "react";
import { Container, Input, Line, RoundButton, Pack} from "../../../Pattern";
import api from "../../../interface/API";

export default function CreateUser({ setNewUserAux }){

    const [newUser, setNewUser] = useState({
        name:"",
        user_name:"",
        password:"",
        confirmPassword:"",
        thought:"",
        active:true
    });

    function changeValue(e, field){
      let aux = {...newUser};
      aux[field] = e.target.value;
      setNewUser(aux);
      setNewUserAux(aux);
    }

    return(
        <Container>

            <Line>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input onChange={(e)=> changeValue(e,"name")} placeholder={" seu nome"} autoFocus/>
                </Pack>
            </Line>
            <Line>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input onChange={(e)=> changeValue(e,"user_name")} placeholder={" nome de usuário"}/>
                </Pack>
            </Line>
            <Line>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input type="password" onChange={(e)=> changeValue(e,"password")} placeholder={" sua senha"}/>
                </Pack>
            </Line>
            <Line>
            <Pack pos={3} style={{ justifyContent:"center", width:"100%" }}>
                    <Input type="password" onChange={(e)=> changeValue(e,"confirmPassword")} placeholder={" sua senha de novo"}/>
                </Pack>
            </Line>
        </Container>
    )

}
