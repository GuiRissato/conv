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
  MiniConv,
  Grid
} from "../../Pattern";

import api from "../../interface/API";
import PUSHER from "../../interface/Pusher";

import Cookies from "js-cookie";


export default function Main(){

  const [conversations, setConversations] = useState([
    // {
    // cod:1,
    // name:"be",
    // status:"online",
    // thought:"the eras tour",
    // messages:[{ message:"oii", fromMe:false }],
    // newMessages:1
    // },
  ]);
  const [currentConv, setCurrentConv] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(()=>{

  },[])

  function sendMessage(paramMessage = message){

    if(currentConv){

      let currentConvAux = {...currentConv};
      let conversationsAux = conversations.map((a)=>({...a}));

      currentConvAux.messages.unshift({ message:paramMessage, fromMe:true })
      conversationsAux[currentConvAux.id] = currentConvAux;

      setConversations(conversationsAux)
      setCurrentConv(currentConvAux);
      setMessage("");

      let username = Cookies.get("conv-username");
      let cod = Cookies.get("conv-id");

      let today = new Date()
      PUSHER.post({ cod, username, message:paramMessage, fromMe:false, time: today.getHours() + ":" + today.getMinutes() });
    }

  }

  function sendMessageFromMiniConv(message, id){

    let conversationsAux = conversations.map((a)=>({...a}));

    conversationsAux[id].messages.unshift({ message, fromMe:true });
    setConversations(conversationsAux);
  }


  return(

    <Grid>

      <Chat messages={currentConv?.messages} message={message} setMessage={setMessage} sendMessage={sendMessage} user={currentConv??null}/>

      <div style={{ display:"flex", overflow:"auto", whiteSpace:"nowrap", flexDirection:"row", width:"80%", height:"100%", backgroundColor:"#F1F6F9", padding:7, borderRadius:18, justifyContent:"center", alignItems:"center" }}>
        {conversations.length > 0?
        conversations.map((conv, id)=>(
            <MiniConv
            isTheCurrent={id === currentConv?.id}
            userData={{ id,...conv }}
            sendMessage={sendMessageFromMiniConv}
            selectConv={()=> setCurrentConv({ id ,...conv }) }
            />
        ))
        :
        <p style={{ color:"#526D82" }}>Adicione novos contatos</p>
        }
      </div>

    </Grid>
  )
}
