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
import { useSelector, useDispatch } from "react-redux";
import { setCurrentConvID } from "../../interface/Redux/Modules/mainData";

export default function Main(){

  const { conversations: convFromRedux } = useSelector((state) => state.mainData);
  const dispatch = useDispatch();

  const [conversations, setConversations] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(()=>{
    //Busca no banco as conversas
    // Verifica quais usuários estão online
    // Configura o Redux
    // Configura a const conversations e currentConv (ex. { id:0, ...conversations[0] })
  },[])

  useEffect(()=>{
    //Resgatar conversas 
    if(convFromRedux.lenght !== 0){
      setConversations(convFromRedux);
    }
  },[convFromRedux])

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
      PUSHER.post({ 
        from:{ cod, username },
        to: { cod:currentConv.cod, username: currentConv.username }, 
        message:paramMessage, 
        time: today.getHours() + ":" + today.getMinutes() 
      });
      //SALVAR NO BANCO
    }

  }

  function sendMessageFromMiniConv(message, id){

    let conversationsAux = conversations.map((a)=>({...a}));

    conversationsAux[id].messages.unshift({ message, fromMe:true });
    setConversations(conversationsAux);
  }

  function handleCurrentConv(conv,id){ 

    setCurrentConv({ id, ...conv });
    dispatch(setCurrentConvID(conv.cod));

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
            selectConv={()=> handleCurrentConv(conv, id) }
            />
        ))
        :
        <p style={{ color:"#526D82" }}>Adicione novos contatos</p>
        }
      </div>

    </Grid>
  )
}
