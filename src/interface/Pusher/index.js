import Pusher from "pusher-js";
import Cookies from "js-cookie";

import { store } from "../Redux";
import { setConversations } from "../Redux/Modules/mainData";

let channel = null;

const PUSHER = {
 start: async (data)=> await start(data),
 post: (data)=> post(data),
 status: (data)=> handleStatus(data)
}

async function start(data){

 const { cod, name, username } = data;
  try{

    if(!channel){
      var pusher = new Pusher('0fb0d6b89d9dcdaeb894', {
            cluster: 'sa1',
            channelAuthorization: {
              endpoint: "http://192.168.0.19:3333/pusher/auth",
              params: {
                ...data
              },
            }
      });

      channel = pusher.subscribe('presence-messages-channel');

      channel.bind("pusher:member_added", (member)=>{
        handleAddedMember(member)
      })

      channel.bind("pusher:member_removed", (member) => {
        handleRemovedMember(member)
      });

      channel.bind("client-send-message", (data) => {

        if(parseInt(data.to.cod) === parseInt(Cookies.get("conv-id"))){
          console.log(data)
          handleMessage(data);
        }
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

function handleAddedMember(member){

  console.log(member)

  const { conversations } = store.getState().mainData;

  let aux = [...conversations];

  aux.map((conversation)=>{
    if(parseInt(member.user_id) === parseInt(conversation.cod)){
      conversation.status = "online";
    }
  })

  store.dispatch(setConversations(aux));
}

function handleRemovedMember(member){

  console.log(member)

  const { conversations } = store.getState().mainData;

  let aux = [...conversations];

  aux.map((conversation)=>{
    if(parseInt(member.user_id) === parseInt(conversation.cod)){
      conversation.status = "offline";
    }
  })

  store.dispatch(setConversations(aux));

}

function handleMessage(data){

  const { conversations, currentConvID } = store.getState().mainData;
  let aux = [...conversations];
  let conversationID = null;

  aux.map((conversation, id)=>{
    if(parseInt(data.from.cod) === parseInt(conversation.cod)){
      conversationID = id;
      conversation.messages.unshift({ message:data.message, fromMe:false });

      if(parseInt(currentConvID) !== parseInt(conversation.cod)){
        conversation.newMessages += 1;
      }

    }
  })
  console.log(aux);
  const [element] = aux.splice(conversationID, 1);
  aux.unshift(element);
  
  store.dispatch(setConversations(aux));
}

function handleStatus(data){

}

export default PUSHER;
