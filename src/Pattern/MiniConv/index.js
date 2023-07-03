import React, { useEffect, useState } from "react";
import { Container, Line, Pack, ProfileIcon, GreatProfileIcon, MessageIndicator, Input, Message } from "../index.js";

export default function MiniConv({ userData, sendMessage, selectConv, isTheCurrent }){

  const [message,setMessage] = useState("");
  const { id, cod, color, name, status, messages, thought, newMessage  } = userData;
  const lastMessage = messages[0];

  return(
    <Container style={{ height:"22vh", width:"25vh",  padding:7, backgroundColor:"#ffffff95", borderRadius: 11, margin:5 }}>

      {!isTheCurrent?
        <>
      <Line onClick={()=> selectConv()}>
        <Pack fill={5} style={{ justifyContent:"space-between" }}>
        <ProfileIcon user={userData} miniConv={true}/>
        {newMessage > 0?<MessageIndicator>{newMessage}</MessageIndicator>:<></>}
        </Pack>
      </Line>

      <Line  onClick={()=> selectConv()} style={{ display: "flex", flexDirection:`${lastMessage?.fromMe?"row-reverse":"row"}`, alignItems:"center", height:"calc(80% - 20%)"}}>
          {lastMessage?<Message style={{ maxWidth:"100%", }} fromMe={lastMessage.fromMe} theLast>{lastMessage.message.replace(/(.{55})..+/, "$1…")}</Message>:<></>}
      </Line>

      <Line style={{ position:"absolute", bottom:7, justifyContent:"center", alignItems:"center"}}>
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
      <div style={{ display:"flex", height: "100%", width: "100%", padding:10, justifyContent:"center", alignItems:"center" }}>
        <GreatProfileIcon color={color} cod={cod} stt={status} name={name} thought={thought}/>
      </div>
      }

    </Container>
  )
}
