import React, { useEffect, useState } from "react";
import { Container, Input, Line, RoundButton, Pack} from "../../../Pattern";

export default function CreateUser(){
    const [newUser, setNewUser] = useState({
        name:"",
        username:"",
        password:"",
        confirmPassword:""
    });

    return(
        <Container>

            <Line>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input placeholder={" seu nome"} autoFocus/>
                </Pack>
            </Line>
            <Line>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input placeholder={" nome de usuário"}/>
                </Pack>
            </Line>
            <Line>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input placeholder={" sua senha"}/>
                </Pack>
            </Line>
            <Line>
            <Pack pos={3} style={{ justifyContent:"center", width:"100%" }}>
                    <Input placeholder={" sua senha de novo"}/>
                </Pack>
            </Line>
        </Container>
    )

}