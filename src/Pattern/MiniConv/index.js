import React, { useEffect, useState } from "react";
import { Container, Line, Pack, ProfileIcon, GreatProfileIcon, MessageIndicator, Input, Message } from "../index.js";

export default function MiniConv({ userData, sendMessage, selectConv, isTheCurrent }){

  const [message,setMessage] = useState("");
  const { id, cod, name, status, messages, thought, newMessages } = userData;
  const lastMessage = messages[0];

  return(
    <Container style={{ padding:10, height:"22vh", width:"25vh",  padding:7, backgroundColor:"#ffffff95", borderRadius: 11 }}>

      {!isTheCurrent?
        <>
      <Line onClick={()=> selectConv()}>
        <Pack fill={5} style={{ justifyContent:"space-between" }}>
        <ProfileIcon name={name}/>
        {newMessages > 0?<MessageIndicator>{newMessages}</MessageIndicator>:<></>}
        </Pack>
      </Line>

      <Line  onClick={()=> selectConv()} style={{ display: "flex", flexDirection:`${lastMessage?.fromMe?"row-reverse":"row"}`, alignItems:"center" }}>
          {lastMessage?<Message style={{ maxWidth:"100%", }} fromMe={lastMessage.fromMe} theLast>{lastMessage.message.replace(/(.{55})..+/, "$1…")}</Message>:<></>}
      </Line>

      <Line style={{ position:"absolute", bottom:0, justifyContent:"center", alignItems:"center"}}>
        <Pack fill={5}>
        <Input
        placeholder={"Digite..."}
        style={{ width:"22vh" }}
        value={message}
        onKeyPress={(e)=>{
          if(e.key === 'Enter' && message !== ""){
            sendMessage(message, id);
            setMessage("");
          }
        }}
        onChange={(e)=> setMessage(e.target.value)}
        />
        </Pack>
      </Line>
      </>
      :
      <GreatProfileIcon status={status} name={name} thought={thought}/>
      }

    </Container>
  )
}
