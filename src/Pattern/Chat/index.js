import React, { useEffect, useState } from "react";
import { Container, Line, Pack, ProfileIcon, RoundButton, Input, Message } from "../index.js";
import { MessageLine, Messages } from "./styles.js";
import { DefaultWarn } from "../styles.js";

export default function Chat({ message, setMessage, sendMessage, messages, user }){


  return(

    <Container style={{ justifyContent:"bottom", height:"100%", width:"70vh", backgroundColor:"white", borderRadius:"21px", border:"solid", borderColor:"#F2F2F2", borderWidth:2 }}>
    
    {user?
    <>
    <Line style={{ padding:10, borderRadius:"21px 21px 0px 0px" }}>

      <Pack fill={5} style={{ justifyContent:"space-between" }}>
        <ProfileIcon 
        user={user}
        src={""}
        />
      </Pack>

    </Line>

    <Messages>
    {messages?.map((m,id)=>(
      <MessageLine fromMe={m.fromMe} key={id}>
        <Message fromMe={m.fromMe} theLast={(id === 0)}>{m.message}</Message>
      </MessageLine>
    ))
    }
    </Messages>


    <Line style={{ padding:10, backgroundColor:"#ffffff80" }}>
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

        <RoundButton style={{ color:"#ffffff" }}>Enviar</RoundButton>

      </Pack>
    </Line>
    </>
    :
    <div style={{ display:"flex", width:"100%", height:"100%", alignItems:"center", justifyContent:"center" }}>
      <DefaultWarn color={"#9AA4B5"}>Selecione uma conversa na lista de contatos</DefaultWarn>
    </div>
    }

    </Container>
  )
}
