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
        active:true,
        color:"",
    });

    function changeValue(e, field){
      let aux = {...newUser};
      if(field == "color") aux[field] = e;
      else aux[field] = e.target.value;
      setNewUser(aux);
      setNewUserAux(aux);
    }


    return(
        <>

            <Line style={{ marginBottom:'1rem', marginTop:"1rem" }}>
                <Pack pos={3} style={{ justifyContent:"center"}}>
                    <Input onChange={(e)=> changeValue(e,"name")} placeholder={" seu nome"} autoFocus/>
                </Pack>
            </Line>
            <Line style={{ marginBottom:'1rem' }}>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input onChange={(e)=> changeValue(e,"user_name")} placeholder={" nome de usuário"}/>
                </Pack>
            </Line>
            <Line style={{ marginBottom:'1rem' }}>
                <Pack pos={3} style={{ justifyContent:"center" }}>
                    <Input type="password" onChange={(e)=> changeValue(e,"password")} placeholder={" sua senha"}/>
                </Pack>
            </Line>
            <Line style={{ marginBottom:'1rem' }}>
            <Pack pos={3} style={{ justifyContent:"center", width:"100%" }}>
                    <Input type="password" onChange={(e)=> changeValue(e,"confirmPassword")} placeholder={" sua senha de novo"}/>
                </Pack>
            </Line>

            <Line style={{ fontSize:"0.8rem", justifyContent:"center"  }}>
                <Pack pos={3}>
                <p>Escolha uma cor</p>
                </Pack>
            </Line>

            <Line style={{ justifyContent:"center", marginBottom:"1rem" }}>
            {["#D3756B", "#FF8989","#635985","#8294C4", "#A0C49D",].map((color,id)=>(
                <Pack key={`color${color}`}>
                    <div onClick={()=> changeValue(color,"color")} style={{ height:color == newUser.color?"1.5rem":"1.2rem", aspectRatio:"1/1", backgroundColor:color, borderWidth:1, borderRadius:"50%" }}>
                    </div>
                </Pack>
            ))}
            </Line>
        </>
    )

}
