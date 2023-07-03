import Pusher from "pusher-js";
import Cookies from "js-cookie";

import { store } from "../Redux";
import { setConversations } from "../Redux/Modules/mainData";
import api from "../API";

var channel = null;

const PUSHER = {
 start: async (data)=> await start(data),
 post: (data)=> post(data),
 verifyIsOnline: (cod)=> verifyIsOnline(cod)
}

async function start(data){

 const { cod, name, username } = data;

  try{

    if(!channel){
      var pusher = new Pusher('0fb0d6b89d9dcdaeb894', {
            cluster: 'sa1',
            channelAuthorization: {
              endpoint: "http://18.229.160.116:3000/pusher/auth",
              params: {
                ...data
              },
            }
      });

      channel = pusher.subscribe('presence-messages-channel');


      channel.bind("pusher:subscription_succeeded", function () {

        console.log("Online on Pusher");

        const { conversations } = store.getState().mainData;

        let aux = [...conversations];

        aux.map((c)=>{
          let isOnline = channel.members.get(c.cod);
          console.log(isOnline)
          c.status = isOnline?"online":"offline";
        })
        console.log(aux)
        store.dispatch(setConversations(aux))

        channel.bind("pusher:member_added", (member)=>{
          if(member){
            handleAddedMember(member);
          }
        })
  
        channel.bind("pusher:member_removed", (member) => {
          if(member){
            handleRemovedMember(member);
          }
        });

        channel.bind("client-send-message", (data) => {
          
          if(data.to.cod){
            console.log(data.to.cod);
    
            if(parseInt(data.to.cod) === parseInt(Cookies.get("conv-id"))){
              handleMessage(data);
            }
          }

        });

      });

    }

    return "success";

  }catch(err){
    console.log(err);
  }

}

async function post(data){  

try{
  channel.trigger("client-send-message", data);
}catch(err){
  console.log("pusher error: ", err);
}

}

function handleAddedMember({ id }){

  const { conversations } = store.getState().mainData;

  let aux = [...conversations];

  aux.map((conv)=>{
    if(parseInt(id) === parseInt(conv.cod)){
    
      conv.status = "online";
    }
  })
  store.dispatch(setConversations(aux));
}

function handleRemovedMember(member){

  const { conversations } = store.getState().mainData;

  let aux = [...conversations];

  aux.map((conversation)=>{
    if(parseInt(member.id) === parseInt(conversation.cod)){
      conversation.status = "offline";
    }
  })

  store.dispatch(setConversations(aux));

}

function handleMessage(data){

  const { conversations, currentConvID } = store.getState().mainData;
  let aux = [...conversations];
  let conversationID = null;

  aux.map((conv, id)=>{

    if(parseInt(data.from.cod) === parseInt(conv.cod)){
      conversationID = id;
      conv.messages.unshift({ message:data.message, fromMe:false });

      if(parseInt(currentConvID) != parseInt(conv.cod)){
        console.log(currentConvID)
        conv.newMessage += 1;
      }

    }
  })
  
  if(conversationID === null){
    
    aux.push({
        ...data.from,
        'messages':[{ message:data.message, fromMe:false }], // {'message':string,'fromMe':bool}
        'newMessage':1
    })
  }else{
    // const [element] = aux.splice(conversationID, 1);
    // aux = aux.slice((conversationID, 1));
    // aux.unshift(element);
  }
  
  store.dispatch(setConversations(aux));
}

function verifyIsOnline(userId){
  let user = channel.members.get(userId);
  return user?"online":"offline";
}

export default PUSHER;
