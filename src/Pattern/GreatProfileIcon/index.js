import React, { useEffect, useState } from "react";
import { Status, Thought } from "./styles.js";

export default function GreatProfileIcon({ stt, src, name, username, thought, cod }){

  const [status, setStatus] = useState(stt);

  function getInitials(){

    let names = name.split(" ");
    let initials = ""

    names.map((n)=> initials += n[0] );

    return initials;

  }

  return(
    <div style={{ display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center" }}>

    <Status color={"#6ABC68"}>
      {src?<img src={src}/>:getInitials()}
    </Status>

    <div style={{ marginTop:5 }}>{name}</div>
    <div style={{ marginTop:3, color:"#9AA4B5" }}>{username}#{cod}</div>

    <Thought>
      {thought}
    </Thought>
  </div>
  )

}
