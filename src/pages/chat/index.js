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
import { setConversations, setCurrentConvID } from "../../interface/Redux/Modules/mainData";
import { ContactsList, ItemContainer } from "./styles";
import { DefaultWarn } from "../../Pattern/styles";

import { useModal } from "../../Pattern/Modal";

export default function Main(){

  const { conversations: convFromRedux, newContactAdded } = useSelector((state) => state.mainData);

  const dispatch = useDispatch();
  const { addModal } = useModal();

  const [convs, setConvs] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [message, setMessage] = useState("");

  let cod = Cookies.get("conv-id");

  useEffect(() => {
    //Busca no banco as conversas
    (async function getConversations() {

      var conv = [];

      await api.get(`groups/${cod}`)
      .then(async (res)=>{

        const userInfo = res.data.group;

        for(let user of userInfo){

          await api.get(`/conversations/${user.group_id}`)
          .then(async(res)=>{

            let messageUserAux = res.data

            let auxConv = {
               'cod':null,
               'username':null,
               'name': null,
               'color':null,
               'status':null,
               'thought':null,
               'messages':[], // {'message':string,'fromMe':bool}
               'newMessage':0
             }

               auxConv.cod = user.id
               auxConv.name = user.name
               auxConv.username = user.user_name
               auxConv.color = user.color
               auxConv.status = "offline"
               auxConv.thought = user.thought

               let messages = []
               let newMessage = 0

               messageUserAux.map((item)=>{

                 let fromMe = false
                 newMessage = 0

                 if(item.sender == cod){
                   fromMe = true
                   newMessage = 0
                 }

                let auxMsg = {
                 'message':item.text,
                 'fromMe': fromMe
                }

                messages.unshift(auxMsg)
               })
               auxConv.messages = messages
               auxConv.newMessage = newMessage
               conv.push(auxConv);
           })
        }
      })
    if(conv.length > 0){
      setCurrentConv({id:0, ...conv[0] })
    }
    setConvs(conv);
    dispatch(setConversations(conv));

    })();

  },[newContactAdded])

  useEffect(()=>{
    //Resgatar conversas
    if(convFromRedux.lenght !== 0){

      setConvs(convFromRedux);

      if(convs.length > 0){
      convFromRedux.map((c,id)=>{

        if(c.cod === currentConv.cod){
          setCurrentConv({id, ...c})
        }

      })
      }
    
    }

  },[convFromRedux, convs])


  async function sendMessage(paramMessage = message){

    if(currentConv){

      let currentConvAux = {...currentConv};
      let conversationsAux = convs.map((a)=>({...a}));

      currentConvAux.messages.unshift({ message:paramMessage, fromMe:true })
      conversationsAux[currentConvAux.id] = currentConvAux;

      setConvs(conversationsAux)
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
      let saveMessage = {
        "id_user": cod,
        "text": paramMessage
      }

       let data = {
        "id_user_sender": parseInt(cod),
        "id_user_receiver": parseInt(currentConv.cod),
        "group_id": null,
        "id_message": null
      }
      await saveConversationBD(data,saveMessage)

    }

    async function saveConversationBD(data, saveMessage){
      // recuperar o grupo do usuario
      const group_id = await api.get(`/groupID/${cod}/${currentConv.cod}`)
      const id = group_id.data.group[0].group_id
      // salvar a mensagem do usuario e depois salva a conversa
      await api.post('/createMessege',saveMessage).then(async (res)=>{
        data.group_id = id
        data.id_message = res.data.mensagem.id
        await api.post("/createConversation",data)
      })
    }

  }

  async function sendMessageFromMiniConv(message, id){

    let conversationsAux = convs.map((a)=>({...a}));

    conversationsAux[id].messages.unshift({ message, fromMe:true });
    setConvs(conversationsAux);

    let username = Cookies.get("conv-username");
      let cod = Cookies.get("conv-id");

      let today = new Date()
      PUSHER.post({
        from:{ cod, username },
        to: { 
          cod:conversationsAux[id].cod, 
          username: conversationsAux[id].username },
        message:message,
        time: today.getHours() + ":" + today.getMinutes()
      });

      //SALVAR NO BANCO
      let saveMessage = {
        "id_user": cod,
        "text": message
      }

       let data = {
        "id_user_sender": parseInt(cod),
        "id_user_receiver": parseInt(conversationsAux[id].cod),
        "group_id": null,
        "id_message": null
      }

      // recuperar o grupo do usuario
      const group_id = await api.get(`/groupID/${cod}/${conversationsAux[id].cod}`)
      const idOfGroup = group_id.data.group[0].group_id
      // salvar a mensagem do usuario e depois salva a conversa
      await api.post('/createMessege',saveMessage).then(async (res)=>{
        data.group_id = idOfGroup
        data.id_message = res.data.mensagem.id
        await api.post("/createConversation",data)
      })
    }

  function handleCurrentConv(conv,id){

    let aux = [...convs];
    aux[currentConv.id].newMessage = 0; 

    setCurrentConv({ id, newMessage:0, ...conv });
    setConvs(aux);
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
            {convs.length > 0?
            convs.map((conv, id)=>(
                <MiniConv
                key={id}
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
