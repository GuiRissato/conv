import Pusher from "pusher-js";

let channel;

const PUSHER = {
 start: async (data)=> await start(data),
 post: (data)=> post(data)
}

async function start(data){

 const { id, name, username } = data;
  try{

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
      console.log("Novo membro", member);
    })

    channel.bind("pusher:subscription_succeeded", ()=>{

    })

    channel.bind("pusher:member_removed", (member) => {
      console.log("Membro que saiu", member);
    });

    channel.bind("client-send-message", (data) => {
      console.log(data);
    });

    return "success";

  }catch(err){
    console.log(err);
  }

}

async function post(data){
console.log(data)
try{
  channel.trigger("client-send-message", data);
  console.log("FOI")
}catch(err){
  console.log("pusher error: ", err);
}

}

export default PUSHER;
