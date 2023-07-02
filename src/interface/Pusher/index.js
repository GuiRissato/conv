import Pusher from "pusher-js";
import Cookies from "js-cookie";

import { store } from "../Redux";
import { setConversations } from "../Redux/Modules/mainData";

var channel;

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
              endpoint: "http://127.0.0.1:3333/pusher/auth",
              params: {
                ...data
              },
            }
      });

      channel = pusher.subscribe('presence-messages-channel');

      channel.bind("pusher:member_added", (member)=>{
        handleAddedMember(member);
      })

      channel.bind("pusher:member_removed", (member) => {
        handleRemovedMember(member);
      });

      // channel.bind("pusher:subscription_succeeded", function () {
      //   var me = presenceChannel.members.me;
      //   var userId = me.id;
      //   var userInfo = me.info;
      // });

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

  const { conversations } = store.getState().mainData;

  let aux = [...conversations];
  console.log(member)
  aux.map((conversation)=>{
    if(parseInt(member.id) === parseInt(conversation.cod)){
    
      conversation.status = "online";
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

  aux.map((conversation, id)=>{
    if(parseInt(data.from.cod) === parseInt(conversation.cod)){
      conversationID = id;
      conversation.messages.unshift({ message:data.message, fromMe:false });

      if(parseInt(currentConvID) !== parseInt(conversation.cod)){
        conversation.newMessages += 1;
      }

    }
  })

  const [element] = aux.splice(conversationID, 1);
  aux.unshift(element);
  
  store.dispatch(setConversations(aux));
}

function verifyIsOnline(userId){
  var user = channel.members.get(`${userId}`);
  // const { members } = channel;
  console.log(channel)
  return user?"online":"offline";
}

export default PUSHER;
