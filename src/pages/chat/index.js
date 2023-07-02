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
import { ContactsList, ItemContainer } from "./styles";
import { DefaultWarn } from "../../Pattern/styles";
import AddContact from "../../Pattern/Header/addContact";
import { useModal } from "../../Pattern/Modal";

export default function Main(){

  const { conversations: convFromRedux } = useSelector((state) => state.mainData);
  const dispatch = useDispatch();
  const { addModal } = useModal();

  const [conversations, setConversations] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [message, setMessage] = useState("");
  
  let cod = Cookies.get("conv-id");

  useEffect(() => {
    //Busca no banco as conversas
    (async function getConversations() {
      await api.get(`groups/${cod}`)
      .then(async (res)=>{

        const userInfo = res.data.group;

        for(let user in userInfo){

          await api.get(`/conversations/${user.group_id}`).then((res)=>{

            let messageUserAux = res.data
            let conv = []
            let auxConv = {
               'cod':null,
               'username':null,
               'color':null,
               'status':null,
               'thought':null,
               'messages':[{'message':null,'fromMe':null}],
               'newMessage':null       
             }

              for(let item in userInfo){

               auxConv.cod = item.id
               auxConv.username = item.user_name
               auxConv.color = item.color
               auxConv.status = PUSHER.verifyIsOnline(item.id)
               auxConv.thought = item.thought

               let messages = []
               let newMessage

               messageUserAux.map((item)=>{

                 let fromMe = false
                 newMessage = true

                 if(item.sender === cod){
                   fromMe = true
                   newMessage = false
                 } 

                let auxMsg = {
                 'message':item.text,
                 'fromMe': fromMe
                }
                
                messages.unshift(auxMsg)
               })
               auxConv.messages = messages
               auxConv.newMessage = newMessage
               conv.push(auxConv)
              }
             
             console.log(conv)
           })
        }
      })
    })();
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
      
      <ItemContainer>
        <Chat 
         messages={currentConv?.messages} 
         message={message} 
         setMessage={setMessage} 
         sendMessage={sendMessage} 
         user={currentConv??null}
         />
        </ItemContainer>

        <ItemContainer>
          <ContactsList>
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
            <DefaultWarn color={"#526D82"}>
              Adicione novos contatos!
            </DefaultWarn>

            }
          </ContactsList>
        </ItemContainer>

      </Grid>
  )
}
