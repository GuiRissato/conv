import React, { useEffect, useState } from "react";
import {
  Container,
  Line,
  Pack,
  ProfileIcon,
  RoundButton,
  Input,
  Message,
  Chat,
  MiniConv
} from "../../Pattern";

import api from "../../interface/API";
import PUSHER from "../../interface/Pusher";


export default function Main(){

  const [conversations, setConversations] = useState([
    { cod:1, name:"be", status:"online", thought:"the eras tour", messages:[{ message:"oii", fromMe:false }], newMessages:1 },
    { cod:2, name:"thi", status:"online", thought:"ill be the archer", messages:[{ message:"lucass", fromMe:false }, { message:"ta aí?", fromMe:false }], newMessages:2 },
    // { cod:3, name:"kass", status:"online", thought:"can i go where you goo", messages:[{ message:"dia!!", fromMe:true }], newMessages:0 },
    // { cod:4, name:"gui", status:"online", thought:"se tiver que ser será", messages:[{ message:"até depois entao", fromMe:true }], newMessages:0 },
    // { cod:5, name:"andreia", status:"online", thought:"se tiver que ser será", messages:[], newMessages:0 }
  ]);
  const [currentConv, setCurrentConv] = useState({id:0, ...conversations[0]});

  const [message, setMessage] = useState("");

  function sendMessage(paramMessage = message){

    let currentConvAux = {...currentConv};
    let conversationsAux = conversations.map((a)=>({...a}));

    currentConvAux.messages.unshift({ message:paramMessage, fromMe:true })
    conversationsAux[currentConvAux.id] = currentConvAux;
    let today = new Date()
    PUSHER.post({ id:1, username:"kass", message:paramMessage, fromMe:false, time: today.getHours() + ":" + today.getMinutes() });

    setConversations(conversationsAux)
    setCurrentConv(currentConvAux);
    setMessage("");
  }

  function sendMessageFromMiniConv(message, id){

    let conversationsAux = conversations.map((a)=>({...a}));

    conversationsAux[id].messages.unshift({ message, fromMe:true });
    setConversations(conversationsAux);
  }


  return(

    <Container>

      <Chat messages={currentConv.messages} message={message} setMessage={setMessage} sendMessage={sendMessage} user={currentConv}/>

      <div style={{ display:"flex", overflow:"auto", whiteSpace:"nowrap", flexDirection:"row", width:"80%", backgroundColor:"#F1F6F9", padding:7, borderRadius:18 }}>
        {conversations.map((conv, id)=>(
            <MiniConv
            isTheCurrent={id === currentConv.id}
            userData={{ id,...conv }}
            sendMessage={sendMessageFromMiniConv}
            selectConv={()=> setCurrentConv({ id ,...conv }) }
            />
        ))}
      </div>

    </Container>
  )
}
