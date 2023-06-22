import React, { useEffect, useState } from "react";
import { Container, Line, Pack, ProfileIcon, RoundButton, Input, Message } from "../index.js";

export default function Chat({ message, setMessage, sendMessage, messages, user }){


  return(

    <Container style={{ justifyContent:"bottom", height:"60vh", width:"60vh", marginTop:"5vh" }}>

    <Line>

    <Pack fill={5} style={{ justifyContent:"space-between" }}>
      <ProfileIcon thought={user.thought} stt={user.status} src={"https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/pt_BR/games/switch/t/the-legend-of-zelda-breath-of-the-wild-switch/description-image"}/>
      <RoundButton/>
      </Pack>

    </Line>

    <div style={{ display:"flex", flexDirection:"column-reverse", height:"100%",width:"100%", overflowY:"auto", paddingTop:10, marginBottom:40 }}>
    {messages?.map((m,id)=>(
      <div style={{ display:"flex", flexDirection: m.fromMe?"row-reverse":"row" }} key={id}>
        <Message fromMe={m.fromMe} theLast={(id === 0)} >{m.message}</Message>
      </div>
    ))
    }
    </div>


    <Line>
      <Pack pos={1} fill={5}>
        <Input
        placeholder={" Digite..."}
        style={{ width:"100%" }}
        value={message}
        onKeyPress={(e)=>{
          if(e.key === 'Enter' && message !== "") sendMessage()
        }}
        onChange={(e)=> setMessage(e.target.value)}
        />
        <RoundButton/>
        <RoundButton/>
      </Pack>
    </Line>

    </Container>
  )
}
