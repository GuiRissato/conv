import React from "react";

import { ProfileIcon, SearchUser } from "../index.js";

export default function Header(){

  return(
    <div style={{ display:"flex", width:"100%", height:"100%", position:"relative", top:0, justifyContent:'space-between', alignItems:"center", backgroundColor:"white", zIndex:2, padding:"1rem" }}>
      <div style={{ display:"flex", height:"100%" }}>
        <img src="/logo.png" style={{ marginRight: 30 }}/>
        <ProfileIcon header={true} thought={"its been a long drive, but we can always change the route if we decide to"}/>
      </div>
      <SearchUser placeholder={" procurar usuário.."}/>
    </div>
  )

}
