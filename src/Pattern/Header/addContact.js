import React, { useEffect, useState } from "react";
import { Input } from "../styles";
import GreatProfileIcon from "../GreatProfileIcon";
import api from "../../interface/API";

export default function AddContact(){

    const [user, setUser] = useState(null);

    async function searchContact(input){

        if(input.indexOf("#") >= 0){

            let cod = parseInt((input.split("#"))[1]);

            await api.get(`/userInfo/${cod}`)
            .then((res)=>{

                const { id, name, user_name, thought } = res.data[0];

                setUser({ cod:id, name, username:user_name, thought });
            })
            .catch((err)=> console.log(err) )
        }
    }

    return(
        <div style={{ display:"flex", height:"100%", flexDirection:"column", alignItems:"center", justifyContent:"space-between" }}>
            {user?<GreatProfileIcon cod={user.cod} name={user.name} username={user.username} thought={user.thought} />:<></>}
            <Input autoFocus onChange={(e)=> searchContact(e.target.value)} placeholder={" #cod"}/>
        </div>
    )

}