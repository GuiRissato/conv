import React, { useEffect, useState } from "react";
import { Input, RoundButton } from "../styles";
import GreatProfileIcon from "../GreatProfileIcon";
import api from "../../interface/API";
import Cookies from "js-cookie";

export default function AddContact(){

    const [user, setUser] = useState(null);

    async function searchContact(input){

        if(input.indexOf("#") >= 0){

            let cod = parseInt((input.split("#"))[1]);

            await api.get(`/userInfo/${cod}`)
            .then((res)=>{

                const { id, name, user_name, thought, color } = res.data[0];

                setUser({ cod:id, name, username:user_name, thought, color });
            })
            .catch((err)=> console.log(err) )
        }
    }

    return(
        <div style={{ display:"flex", height:"100%", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding:20 }}>

            {user?
            <div style={{ display:"flex", flexDirection:"column", width:"100%", height:"100%", justifyContent:"center", alignItems:"center", marginBottom:30 }}>
                <GreatProfileIcon color={user.color} cod={user.cod} name={user.name} username={user.username} thought={user.thought} />
                {user.cod != Cookies.get("conv-id")?<RoundButton style={{ color:"white", marginTop:15 }} color={"#609966"}>+ Adicionar</RoundButton>:<></>}
            </div>
            :
            <></>}
            
            <Input autoFocus onChange={(e)=> searchContact(e.target.value)} placeholder={" #cod"}/>
        </div>
    )

}